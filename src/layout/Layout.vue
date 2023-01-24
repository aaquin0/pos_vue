<template>
  <div>
    <div v-if="form.currentUser">
      <!--<Header />-->
      <SidebarMenu
          :menu="form.menu"
          :collapsed="form.collapsed"
          :show-one-child="true"
          @toggle-collapse="onToggleCollapse"
          @item-click="onItemClick"
          disable-hover
      />
      <div
          v-if="form.isOnMobile && !form.collapsed"
          class="sidebar-overlay"
          @click="form.collapsed = true"
      />
    </div>

    <div class="wrapper">
      <Modal ref="modal" />
      <router-view />
    </div>

    <!-- begin footer -->
    <div class="footer home-screen">
      <div class="left-head">
        <div class="header-username">
          <div class="usericon mr-2">
            <i class="fa-solid fa-circle-small"></i>
          </div>
          <div class="usernameloc">
            <h5>username</h5>
            <p>Mosaic POS Ver. 1.5</p>
          </div>
        </div>
      </div>
      <div class="spacer-head"></div>
      <div class="middle-head">
      </div>
      <div class="right-head d-flex justify-content-between align-items-center">
        <div class="time-head">
          <span class="mr-4">Terminal: 1</span>
          <!--
          <a href="#" class="date-notif" >
            <i class="fa fa-check-circle"></i>
          </a>
          <a href="#" class="day-end-date-notif" ></a> -->
        </div>
        <div class="signout-header">
          <a href="javascript:" @click="destroySession">
            <fa icon="lock" />
          </a>
        </div>
      </div>
    </div>
    <!-- end footer -->

  </div>
</template>

<script setup>
import bus from '@/utils/bus';
import Modal from "@/components/Modal.vue";
import Header from '@/layout/Header.vue';
import SidebarMenu from "@/layout/sidebar/SidebarMenu.vue";
import {usePermissionStore} from "@/stores/permission";
import {useModalStore} from "@/stores/modal";
import {removeToken} from "@/utils/auth";

const router = useRouter()
const modalStore = useModalStore();

const permissionStore = usePermissionStore();
const routes = computed(() => {
    return permissionStore.routes.filter(route => !route?.hidden)
})

routes.value.map(route => {
    updateObjectArr(route)
});

function updateObjectArr(obj, parentPath = '') {
    obj.href = parentPath.replace('//','/')

    if (obj.children) {
        let path = ''

        if (obj.href==='') {
            path += obj.path
        } else {
            path += obj.href
        }

        obj.children.forEach(child => updateObjectArr(child, `${path}/${child.path}`))

        obj.href = ''
    }

    delete obj.component
    delete obj.redirect
    delete obj.meta
    delete obj.path

    return obj
}

const form = reactive({
    menu: JSON.parse(JSON.stringify(routes.value)),
    collapsed: true,
    isOnMobile: false,
    currentUser: true
});

const onToggleCollapse = (collapsed) => {
    form.collapsed = collapsed;
}

const onItemClick = () => {}

const onResize = () => {
    if (window.innerWidth <= 767) {
        form.isOnMobile = true;
        form.collapsed = true;
    } else {
        form.isOnMobile = false;
        form.collapsed = true;
    }
}

const modal = ref(null)

onMounted(() => {
    onResize();
    document.body.addEventListener("resize", onResize);

    bus.on('openModal', () => {
        modal.value.show()
    })
})

const destroySession = () => {
    // for testing only
    removeToken()
    router.push(`/login?redirect=/`)
}
</script>

<style scoped>
.sidebar-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /*background-color: #000;*/
    opacity: 0.5;
    z-index: 900;
}
.wrapper {
    padding: 5px 20px 5px 90px;
    background-color: #edf0f3;
}
</style>
