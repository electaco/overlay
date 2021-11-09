log("Config opened");

var app = new Vue({
    el: '#app',
    data: {
      config: {},
    },
    methods: {
        close: function() {
            ipcRenderer.send("show-config", false);
        }
    }
  })