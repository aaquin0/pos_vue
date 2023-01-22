<template>
  <component
      is="fa"
      class="vsm--icon"
      :icon="icon"
  />
</template>

<script>
export default {
  name: 'SidebarMenuIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.v-sidebar-menu .vsm--link_level-1 .vsm--icon {
    background-color: transparent !important;
}
</style>
