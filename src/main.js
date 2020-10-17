// var say = require("./util");
// import say from "./util";
//import "babel-polyfill"; // 该库也可以在webpack的entry中配置使用，用于填充ES6 api
import Vue from "vue";
import getData from "./util";
import "./style/common.scss";

// say();
var app = new Vue({
  el: "#app",
  created() {
    this.fetchData();
  },
  data: {
    message: "Hello World!",
  },
  methods: {
    async fetchData() {
      const data = await getData();
      this.message = data;
    },
  },
});
