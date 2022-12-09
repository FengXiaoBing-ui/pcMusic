<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "/src/index.scss";
export default {
  name: "App",
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

#app {}
</style>
