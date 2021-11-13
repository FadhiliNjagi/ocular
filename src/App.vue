<template>
    <ion-app>
        <ion-header>
            <ion-toolbar>
                <ion-title>Ocular</ion-title>
                <ion-buttons slot="end">
                    <ion-icon slot="icon-only" class="info-btn" :icon="informationCircleOutline" @click="setOpen(true)"></ion-icon>
                </ion-buttons>
                <ion-modal
                    :is-open="isOpenRef"
                    css-class="my-custom-class"
                    @didDismiss="setOpen(false)"
                >
                    <Modal @close="setOpen(false)" class="modal"></Modal>
                </ion-modal>
            </ion-toolbar>
        </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, menuController, IonModal, IonIcon, IonButtons  } from '@ionic/vue';
import { informationCircleOutline } from 'ionicons/icons';
import Modal from '@/components/Modal.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  components: { IonApp, IonRouterOutlet, IonToolbar, IonHeader, IonTitle, Modal, IonModal, IonIcon, IonButtons },
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
    return { isOpenRef, setOpen, data, informationCircleOutline }
  }
});
</script>

<style scoped>
ion-toolbar {
    padding-right: 10px;
}
.info-btn {
    cursor: pointer;
}
.modal {
    border-radius: 10px;
}
</style>