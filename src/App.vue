<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <img :src="src" />
    <input type="text" v-model="msg" />
  </div>
</template>

<script>
import getData from "./util";
import src from "./img/AM.jpg";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your vue.js app",
      src,
    };
  },
  created() {
    this.fetchData();
    console.log("aaronlam");
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
    color: black;
  }
}
</style>