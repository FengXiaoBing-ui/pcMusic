<template>
    <div class="mainContent">
        <!-- <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view> -->
        <router-view/>
    </div>
</template>
  
<script>
export default {
    name: "mainContent",
}
</script>
  
<style lang="scss" scoped>
.mainContent {
    width: 100%;
    min-height: 90vh;
    padding: 20px;
}
</style>