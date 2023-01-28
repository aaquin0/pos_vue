<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" :fill="color" />
    </svg>
</template>

<script>
export default defineComponent({
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: '#1b75bb'
        }
    },
    setup(props) {
        return {
            iconName: computed(() => `#icon-${props.iconClass}`),
            svgClass: computed(() => {
                if (props.className) {
                    return `svg-icon ${props.className}`
                }
                return 'svg-icon'
            })
        }
    }
})
</script>

<style scoped lang="scss">
.svg-icon {
    width: 5em;
    height: 5em;
    position: relative;
    //fill: currentColor;
    vertical-align: -2px;
}
</style>
