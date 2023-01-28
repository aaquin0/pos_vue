<template>
    <div class="service-box my-2">
        <svg-icon :icon-class="icon" />
        <div class="service-box-bottom">
            <h4 v-html="label" />
        </div>
    </div>
</template>

<script>
export default defineComponent({
    props: {
        icon: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        }
    }
})
</script>
