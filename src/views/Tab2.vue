<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ocular</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <transition name="noContent">
            <ion-grid v-show="photos.length">
                <transition-group tag="ion-row" name="photos">
                    <ion-col size="6" :key="photo" v-for="photo in photos" class="image-container">
                        <ion-card class="image">
                            <ion-img :src="photo.webviewPath" @click="showActionSheet(photo)"></ion-img>
                        </ion-card>
                    </ion-col>
                </transition-group>
            </ion-grid>
        </transition>
        <transition tag="span" name="noContent" v-show="!photos.length" appear>
            <p class="no-content">No photos yet</p>
        </transition>
        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
            <ion-fab-button @click="takePhoto()">
                <ion-icon :icon="camera"></ion-icon>
            </ion-fab-button>
        </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { camera, trash, close } from 'ionicons/icons';
import { IonPage, IonHeader, IonFab, IonFabButton, IonIcon, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonImg, IonCard } from '@ionic/vue';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';

export default  {
  name: 'Tab2',
  components: { IonPage, IonHeader, IonFab, IonFabButton, IonIcon, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonImg, IonCard },
  setup() {
    const { takePhoto, photos, showActionSheet } = usePhotoGallery()

    return {
      camera, trash, close, takePhoto, photos, showActionSheet
    }
  }
}
</script>

<style scoped>
.image-container {
    position: relative;
}
.image {
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s ease-in-out;
}
.image:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  transform: scale(1.05);
}
.photos-enter-from {
    transform: scale(0.6);
    opacity: 0;
}
.photos-enter-to {
    transform: scale(1);
    opacity: 1;
}
.photos-enter-active {
    transition: all 0.5s ease;
}
.photos-leave-from {
    transform: scale(1);
    opacity: 1;
}
.photos-leave-to {
    transform: scale(0.5);
    opacity: 0;
}
.photos-leave-active {
    transition: all 0.3s ease;
    position: absolute;
}
.photos-move {
    transition: all 0.5s ease;
}
.no-content {
    max-width: 100px;
    padding-top: 35vh;
    margin: auto;
}
.noContent-enter-from {
    transform: translateX(6vw);
    opacity: 0;
}
.noContent-enter-to {
    transform: translateX(0);
    opacity: 1;
}
.noContent-enter-active {
    transition: all 1s ease;
}
</style>