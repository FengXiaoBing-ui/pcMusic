<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    }
  },
  created(){
    window.document.documentElement.setAttribute( "data-theme", 'red');
  },
  methods: {},
};
</script>
<style lang="scss">
html,
body,
div {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
}
</style>
