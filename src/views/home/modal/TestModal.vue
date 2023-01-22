<template>
  <div>
    <p>Test Modal</p>
  </div>
</template>

<script>
import {useModalStore} from "@/stores/modal";
const modalStore = useModalStore();

export default {
  name: "TestModal",
}
</script>
