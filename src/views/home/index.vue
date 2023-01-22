<template>
  <div>
    <BRow>
      <BCol cols="6" class="pt-3" style="background-color: #2ecc71">
        <span class="component-title">Category</span>
      </BCol>
      <BCol cols="6" style="background-color: #4dc0b5">
        <BButton class="btn btn-add" @click="handleClick">Add Category</BButton>
      </BCol>
    </BRow>
  </div>
</template>

<script>
import TestModal from "@/views/home/modal/TestModal.vue";
import {useModalStore} from "@/stores/modal";

const modalStore = useModalStore();

export default {
  name: "index",
  methods: {
    handleClick() {
      modalStore
        .callModal({
          title: 'Test Modal',
          childComponent: TestModal
        })
        .catch(error => {
          console.log('error', error)
        })

    }
  }
}
</script>
