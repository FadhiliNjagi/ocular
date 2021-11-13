<template>
  <ion-header class="about-modal">
    <ion-toolbar class="modal-header">
      <ion-title class="about-modal-header">About Ocular App</ion-title>
      <ion-button class="close-icon" @click="$emit('close')">&#10006;</ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
      <p>Ocular is an app that enables anyone to make use of their camera, regardless of the device or platform they are using.</p>
      <p>Ocular takes the form of a website, app (iOS and Android) as well as a Progressive Web App (PWA).</p>
      <p>Find out more at: </p><a href="fadhilinjagi.netlify.app/ocular">fadhilinjagi.netlify.app/ocular</a>
    <h5>Made with &#9829; by FadhiliTech</h5>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  setup() {
    return {
      content: 'Content',
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar }
});
</script>

<style scoped>
.modal-header {
    display: grid;
    padding: 10px 20px;
}
.about-modal-header {
    
}
.close-icon {
    float: right;
    align-self: center;
    justify-content: center;
    top: 5px;
}
</style>