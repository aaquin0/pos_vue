<template>
    <div>
        <router-view />
    </div>
</template>

<script setup>
onMounted(() => {
    window.addEventListener('offline', () => {
        console.log('offline')
    })

    window.addEventListener('online', () => {
        console.log('online')
    })
})
</script>
