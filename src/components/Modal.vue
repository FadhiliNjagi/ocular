<template>
    <ion-header class="about-modal">
        <ion-toolbar class="modal-header">
            <ion-title class="about-modal-header">About Ocular App</ion-title>
            <ion-buttons slot="end">
                <ion-icon slot="icon-only" class="close-btn" :icon="close" @click="$emit('close')"></ion-icon>
            </ion-buttons>
        <!-- <ion-button class="close-icon" >&#10006;</ion-button> -->
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div class="modal-body">
            <!-- About Ocular app -->
            <ion-icon slot="icon-only" :icon="logoIonic"></ion-icon>
            <h4>Ocular App</h4>
            <p>Ocular is an app that enables anyone to make use of their camera, regardless of the device or platform they are using.</p>
            <p>Ocular is available on web, iOS, Android, Desktop and PWA.</p>
            <ion-buttons class="platforms">
                <ion-icon size="large" :icon="globe"></ion-icon>
                <ion-icon size="large" :icon="logoPwa"></ion-icon>
                <ion-icon size="large" :icon="logoAndroid"></ion-icon>
                <ion-icon size="large" :icon="logoApple"></ion-icon>
                <ion-icon size="large" :icon="logoWindows"></ion-icon>
            </ion-buttons>
            <ion-item-divider></ion-item-divider>

            <!-- How to use -->
            <ion-icon slot="icon-only" :icon="pawOutline"></ion-icon>
            <h4>How to use Ocular</h4>
            <ol>
                <li>Tap the floating camera icon.</li>
                <li>Take a photo using your camera or upload an image.</li>
                <li>See if it's right. You can save the photo or cancel.</li>
            </ol>
            <p>Ocular automatically saves your photos in your file system or browser, so you can find them there when you come back.</p>
            <p>To delete a photo, click on the photo and select the delete action.</p>
            <p>Find out more at: </p><a href="fadhilinjagi.netlify.app/ocular">fadhilinjagi.netlify.app/ocular</a>

            <!-- Licences -->
            <ion-item-divider></ion-item-divider>
            <ion-icon slot="icon-only" :icon="bookOutline"></ion-icon>
            <h4>Licences</h4>
            <p>This software is completely free and open-source, under the MIT license.</p>

            <!-- Project Repo -->
            <ion-item-divider></ion-item-divider>
            <ion-icon slot="icon-only" :icon="libraryOutline"></ion-icon>
            <h4>Project Repository</h4><br>
            <a href="https://gitlab.com/fadhili_njagi/ocular">gitlab.com/fadhili_njagi/ocular</a>
        </div>
</ion-content>
<ion-footer>
    <p>Version 1.0.1 beta</p>
    <h5>Made with &#9829; by FadhiliTech</h5>
</ion-footer>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons } from '@ionic/vue';
import { defineComponent } from 'vue';
import { logoIonic, logoWindows, logoPwa, logoAndroid, logoApple, globe, bookOutline, libraryOutline, pawOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  setup() {
    return {
      content: 'Content', logoIonic, logoWindows, logoPwa, logoAndroid, logoApple, globe, bookOutline, libraryOutline, pawOutline
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons }
});
</script>

<style scoped>
.modal-header {
    display: grid;
    padding: 5px 10px;
}
.modal-body {
    padding: 0px 8px;
}
.modal-body ion-icon {
    font-size: 24px;
    vertical-align: text-bottom;
    margin-right: 8px;
}
.close-btn {
    cursor: pointer;
}
p, a {
    margin-left: 15px;
}
h4 {
    display: inline-block;
}
.platforms {
    max-width: 250px;
    margin: auto;
}
.platforms ion-icon {
    margin-right: 15px;
}
ion-footer {
    text-align: center;
}
</style>