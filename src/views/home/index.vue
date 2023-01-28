<template>
    <div class="container">
        <div class="row initial-page">
            <template v-for="service in state.services">
                <div class="col-md-4">
                  <card :icon="service.icon" :label="service.label" />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
const state = reactive({
    // for testing only
    services: [
        {
            label: 'Dine-in',
            icon: `dine-in`
        },
        {
            label: 'Take-out',
            icon: `take-out`
        },
        {
            label: 'Delivery',
            icon: `delivery`
        }
    ]
})
</script>

<style scoped>
.initial-page {
    margin:20px 10px!important;
}
</style>
