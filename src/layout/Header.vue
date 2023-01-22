<template>
  <header>
    <div class="container-fluid">
      <div class="row" style="background-color: white;height: 48px">
        <div class="col-md-12 text-center pb-2">
          <router-link to="/"><img src="@/assets/images/mosaic-logo.png" alt=""/></router-link>
          <div class="float-right d-flex align-items-center">
            <div id="avatar" class="d-flex align-items-center">
              <div id="avatar-left" class="d-flex align-items-center">
                <div class="circle d-flex align-items-center"></div>
              </div>
              <div id="avatar-middle"></div>
              <div id="avatar-right" class="d-flex align-items-center">
                <a href="" @click.prevent="logOut" class="logout-header"> <fa icon="sign-out-alt" /> Log out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import {useUserStore} from "@/stores/user";

const router = useRouter()
const userStore = useUserStore()

const logOut = () => {
  userStore.logout().then(() => {
    router.push(`/login?redirect=/`)
  })
}
</script>
