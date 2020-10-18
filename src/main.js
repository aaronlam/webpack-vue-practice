// var say = require("./util");
// import say from "./util";
//import "babel-polyfill"; // 该库也可以在webpack的entry中配置使用，用于填充ES6 api
import Vue from "vue";
import App from "./App.vue";
// import getData from "./util";
import "./style/common.scss";

// Vue.component("my-component", {
//   template: '<img :src="url" />',
//   data() {
//     return {
//       url: require("./img/AM.jpg"),
//     };
//   },
// });

// // say();
// var app = new Vue({
//   el: "#app",
//   created() {
//     this.fetchData();
//   },
//   data: {
//     message: "Hello World!",
//   },
//   methods: {
//     async fetchData() {
//       const data = await getData();
//       this.message = data;
//     },
//   },
// });

// compiler（模板）模式
// new Vue({
//   el: "#app",
//   template: "<App/>",
//   components: { App },
// });

//runtime（运行时）模式
new Vue({
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
