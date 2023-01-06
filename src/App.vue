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
  created() {
    // this.clearCookie()
    window.document.documentElement.setAttribute("data-theme", 'blue');
    document.cookie = "uin=1583446461;";
    document.cookie = "qm_keyst=Q_H_L_5nV_XlgRc93ouNr88HwEK8olNtcgInTZf56xQLrKiux-wYfEfraWdGw;";
    document.cookie = "qqmusic_key=Q_H_L_5nV_XlgRc93ouNr88HwEK8olNtcgInTZf56xQLrKiux-wYfEfraWdGw;";
  },
  methods: {
    clearCookie() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {

        var cookie = cookies[i];

        var eqPos = cookie.indexOf("=");

        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

        document.cookie =

          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

      }

      if (cookies.length > 0) {

        for (var i = 0; i < cookies.length; i++) {

          var cookie = cookies[i];

          var eqPos = cookie.indexOf("=");

          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

          var domain = location.host.substr(location.host.indexOf("."));

          document.cookie =

            name +

            "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" +

            domain;

        }

      }
    }
  },
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
.icon{
  &:hover{
    cursor: pointer;
    transition: all 0.3s;
    @include font_color("systemTitleBackground");
  }
}

#app {}
</style>
