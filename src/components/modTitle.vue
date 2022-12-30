<template>
    <div class="title">
        <div class="flex align-center">
            <div v-if="titleInLeft" :class="titleInRightClass">{{ titleInLeft }}</div>
            <div class="text-lg text-white">{{ title }}</div>
            <div v-if="titleInRight" :class="titleInLeftClass">{{ titleInRight }}</div>
        </div>
        <slot name="right"></slot>
    </div>
</template>
<script>
export default {
    name: "modTitle",
    props: {
        title: {
            type: String,
            default: ""
        },
        titleInRight: {
            type: String,
            default: ""
        },
        titleInRightClass: {
            type: String,
            default: ""
        },
        titleInLeft: {
            type: String,
            default: ""
        },
        titleInLeftClass: {
            type: String,
            default: ""
        }
    }
}
</script>
<style lang="scss" scoped>

</style>