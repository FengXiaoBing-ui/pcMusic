<template>
  <div id="app" class="indexA">
    <router-view />
  </div>
</template>

<script>
// import "/src/assets/css/index.scss";
if (true) {
import("/src/assets/css/themeA.scss")
  
}
export default {
  name: "App",
  data() {
    return {
      backgroundA:'red'
    }
  },
  methods: {},
};
</script>
<style lang="scss">
@import "~/src/assets/css/index.scss";

html,
body,
div {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.backgroundA{
  background: v-bind(backgroundA);
}
#app {}
</style>
