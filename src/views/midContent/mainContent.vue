<template>
    <div class="mainContent">
        <!-- <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view> -->
        <router-view :key="route.fullPath"></router-view>
    </div>
</template>
  
<script>
import { useRoute } from 'vue-router'
export default {
    name: "mainContent",
    setup() {
    const route = useRoute()
    return {
      route
    };
  }
}
</script>
  
<style lang="scss" scoped>
.mainContent {
    width: 100%;
    min-height: 90vh;
    padding: 20px;
}
</style>