<template>
  <div id="app">
    <systemTitleVue />
  </div>
</template>

<script>
import "/src/index.scss";
import systemTitleVue from "./components/systemTitle.vue";
export default {
  name: "App",
  components: {
    systemTitleVue,
  },
  methods: {},
};
</script>

<style>
@import "~/src/index.scss";
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
