<template>
    <div class="mainContent">
        <router-view />
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
    height: 10000px;
    padding: 20px;
}
</style>