<template>
    <ion-app>
        <ion-header>
            <ion-toolbar>
                <ion-title>Ocular</ion-title>
                <ion-icon name="settings" @click="setOpen(true)"></ion-icon>
                <ion-modal
                    :is-open="isOpenRef"
                    css-class="my-custom-class"
                    @didDismiss="setOpen(false)"
                >
                    <Modal @close="setOpen(false)"></Modal>
                </ion-modal>
            </ion-toolbar>
        </ion-header>
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, menuController, IonModal, IonIcon  } from '@ionic/vue';
import Modal from '@/components/Modal.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  components: { IonApp, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, Modal, IonModal, IonIcon },
  methods: {
    openFirst() {
      menuController.enable(true, 'menu');
      menuController.open('menu');
    }
  },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    const data = { content: 'New Content' };
    return { isOpenRef, setOpen, data }
  }
});
</script>