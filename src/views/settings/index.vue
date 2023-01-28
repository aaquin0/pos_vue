<template>
    <div class="w-100 pb-5">
        <div class="row p-1">
            <!-- Side Navigations -->
            <div class="col-xl-8">
                <router-view />
            </div>
            <div class="col-xl-4">
                <div class="row">
                    <ul class="nav nav-tabs settings-tab" role="tablist">
                        <li class="nav-item col-md-6" v-for="nav in state.navs">
                            <router-link :to="nav.to">
                                <card :icon="nav.icon" :label="nav.label" />
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- End Side Navigations -->

        </div>
    </div>
</template>

<script setup>
import RouterView from '@/components/RouterView.vue';
import Card from "@/components/Card.vue";

const route = useRoute();
const state = reactive({
    navs: [
        {label: 'Day End', icon: 'day-end', to: '/settings/day-end'},
        {label: 'Shift Change', icon: 'shift-change', to: '/settings/shift-change'},
        {label: 'Printer Settings', icon: 'list', to: '/settings/printer'},
        {label: 'Items', icon: 'items', to: '/settings/items'},
        {label: 'Tables', icon: 'dine-in', to: '/settings/tables'},
        {label: 'Reports', icon: 'reports', to: '/settings/reports'},
        {label: 'Bill', icon: 'list', to: '/settings/bill'},
        {label: 'IMIN Settings', icon: 'list', to: '/settings/imin'},
    ]
});

</script>

<style scoped lang="scss">
.settings-tab {
    a:hover {
        text-decoration: none;
    }
}

.service-box {
    height: 160px !important;
    padding: 15px !important;
}
</style>
