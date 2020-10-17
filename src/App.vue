<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <img src="./img/AM.jpg" />
    <input type="text" v-model="msg" />
  </div>
</template>

<script>
import getData from "./util";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your vue.js app",
    };
  },
  created() {
    this.fetchData();
    console.log("12345");
  },
  methods: {
    async fetchData() {
      const data = await getData();
      this.msg = data;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetic, Arial, sans-serif;

  h1 {
    color: green;
  }
}
</style>