<template>
  <component
    :is="tag"
    v-bind="customAttrs"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'SidebarMenuLink',
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    isRouterLink () {
      return !!this.$router && this.item.href && !this.item.external
    },
    tag () {
      return this.isRouterLink ? 'router-link' : 'a'
    },
    href () {
      let href = this.item.href;
      if (!('name' in this.item)) {
        href = '/#' + this.item.children[0]['href']
      }
      return href || '#';
    },
    customAttrs() {
        return {
            [this.isRouterLink ? 'to' : 'href']: this.href,
            ...(this.$attrs || {}),
        };
    },
  }
}
</script>
