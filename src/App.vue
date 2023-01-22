<template>
    <div>
        <router-view />
    </div>
</template>

<script setup>
import { setToken } from '@/utils/auth'

onMounted(() => {
    window.addEventListener('offline', () => {
        console.log('offline')
    })

    window.addEventListener('online', () => {
        console.log('online')
    })
})
</script>
