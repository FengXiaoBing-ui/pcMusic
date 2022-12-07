<template>
  <div id="app">
    <systemTitleVue />
  </div>
</template>

<script>
import systemTitleVue from './components/systemTitle.vue';
export default {
  name: 'App',
  components: {
    systemTitleVue
  },
  methods: {
  }
}
</script>

<style>
html,
body,
div {
  margin: 0;
  padding: 0;
}

#app {}
</style>
