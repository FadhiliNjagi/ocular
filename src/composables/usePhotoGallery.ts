import { ref, onMounted, watch } from 'vue'
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Storage } from '@capacitor/storage'
import { isPlatform, actionSheetController } from '@ionic/vue'
import { Capacitor } from '@capacitor/core'
import { trash, close } from 'ionicons/icons'

// UserPhoto object
export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}

export function usePhotoGallery() {
    /**
     * Array of photos
     */
    const photos = ref<UserPhoto[]>([]);

    /**
     * Store key
     */
    const PHOTO_STORAGE = "photos";

    /**
     * File system only accepst images as base64 data
     */
     const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    /**
     * Saves photos array as JSON in storage
     */
    const cachePhotos = () => {
        Storage.set({
            key: PHOTO_STORAGE,
            value: JSON.stringify(photos.value)
        })
    }

    /**
     * Delete photos
     */
    const deletePhoto = async (photo: UserPhoto) => {
        // Remove photo from photos array
        photos.value = photos.value.filter(p => p.filepath !== photo.filepath);
        // Remove photo from file system
        const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
        await Filesystem.deleteFile({
            path: filename,
            directory: Directory.Data
        })
    }

    const showActionSheet = async (photo: UserPhoto) => {
        const actionSheet = await actionSheetController.create({
            header: 'Photos',
            buttons: [{
                text: 'Delete',
                role: 'destructive',
                icon: trash,
                handler: () => {
                    deletePhoto(photo);
                }
            }, {
                text: 'Cancel',
                icon: close,
                role: 'cancel',
                handler: () => { 
                    // do nothing when cancel is clicked
                }
            }]
        });
        await actionSheet.present();
    }

    /**
     * Asynchronously get photos from storage and update photos array
     */
    const loadSaved = async () => {
        const photoList = await Storage.get({ key: PHOTO_STORAGE });
        const photosInStorage = photoList.value ? JSON.parse(photoList.value) : [];

        if (!isPlatform('hybrid')) {
            for (const photo of photosInStorage) {
                const file = await Filesystem.readFile({
                    path: photo.filepath,
                    directory: Directory.Data
                });

                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
        }

        photos.value = photosInStorage;
    }

    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => { 
        let base64Data: string;     
        
        // Platform specific
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!
            });
            base64Data = file.data;
        } else {
            // Fetch the photo, read as a blob, then convert to base64 format
            const response = await fetch(photo.webPath!);
            const blob = await response.blob();
            base64Data = await convertBlobToBase64(blob) as string;
        }

        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Data
        });
      
        // Use webPath to display the new image instead of base64 since it'salready loaded into memory
        return {
          filepath: isPlatform('hybrid') ? savedFile.uri: fileName,
          webviewPath: isPlatform('hybrid') ? Capacitor.convertFileSrc(savedFile.uri) : photo.webPath
        };
    }

    /**
     * Take a photo using Cordova's camera API and append it to photos array
     */
    const takePhoto = async () => {
        // Asynchronously get photo
        const cameraPhoto = await Camera.getPhoto({
            // Set result as URI, source as Camera, and quality as 100%
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });
        // Generate filename from current timestamp
        const fileName = new Date().getTime() + '.jpeg';
        // Create UserPhoto object
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        // Append object to Photos array
        photos.value = [savedFileImage, ...photos.value];
    };

    // Whenever photos array changes, trigger cachePhotos
    watch(photos, cachePhotos);
    
    onMounted(loadSaved);
    
    return {
        photos,
        takePhoto,
        deletePhoto,
        showActionSheet
    }
}

//     const takePhoto = async () => {
//         const cameraPhoto = await Camera.getPhoto({
//         resultType: CameraResultType.Uri,
//         source: CameraSource.Camera,
//         quality: 100
//         });
//         const fileName = new Date().getTime() + '.jpeg';
//         const savedFileImage = {
//             filepath: fileName,
//             webviewPath: cameraPhoto.webPath
//         };

//         photos.value = [savedFileImage, ...photos.value];
//     };

//     const photos = ref<UserPhoto[]>([]);

//     const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onerror = reject;
//         reader.onload = () => {
//             resolve(reader.result);
//         };
//         reader.readAsDataURL(blob);
//     });

//     return {
//         photos,
//         takePhoto
//     };
// }

// export interface UserPhoto {
//     filepath: string;
//     webviewPath?: string;
// }
