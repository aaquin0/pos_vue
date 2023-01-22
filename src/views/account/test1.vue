<template>
  <div>
    <BButton class="btn btn-add" @click="handleClick">Modal1</BButton>
  </div>
</template>

<script>
import TestModal1 from "@/views/account/modal/TestModal1.vue";
import {useModalStore} from "@/stores/modal";

const modalStore = useModalStore();

export default {
  name: "test1",
  methods: {
    handleClick() {
      modalStore
          .callModal({
            title: 'Title',
            childComponent: TestModal1
          })
          .catch(error => {
            console.log('error', error)
          })
    }
  }
}
</script>

<style scoped>

</style>
