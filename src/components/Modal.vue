<template>
  <div>
    <BModal
        v-if="childComponent"
        v-model="showModal"
        :title="title"
        :size="size"
        ref="modal"
        cancelTitle="Close"
        @cancel="handleCancel"
        :noCloseOnBackdrop="true"
        :noCloseOnEsc="true"
        :hideFooter="true"
        :okDisabled="true"
    >
      <component v-bind:is="{...childComponent}"></component>
    </BModal>
  </div>
</template>

<script>
import {useModalStore} from "@/stores/modal";

export default {
  name: "Modal",
  data() {
    return {
      size: '',
      title: null,
      childComponent: null,
      showModal: false
    }
  },
  methods: {
    show() {
      const {modalData} = useModalStore();
      console.log('modalData',modalData)
      this.showModal = true
      this.title = modalData.title
      this.size = modalData.size || 'lg'
      this.childComponent = modalData.childComponent
    },

    handleCancel() {
      const modalStore = useModalStore();
      this.showModal = false
      this.childComponent = {}
      modalStore.close()
    }
  }
}
</script>

<style lang="scss">
.modal-dialog {
    .modal-header {
        button {
            position: absolute;
            right: 17px;
            top: 14px;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #ccc;
            opacity: 0.3;

            &:hover {
                border: none;
                opacity: 1;
            }

            &:before, &:after {
                border: none;
                position: absolute;
                margin-top: 11px;
                margin-left: 6px;
                top: 0;
                left: 10px;
                content: ' ';
                height: 12px;
                width: 2px;
                background-color: #343a40;
            }

            &:before {
                transform: rotate(45deg);
            }

            &:after {
                transform: rotate(-45deg);
            }
        }
    }
}
</style>
