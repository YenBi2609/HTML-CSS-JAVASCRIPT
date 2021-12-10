<template>
  <div id="app">
    <div class="container">
      <button v-on:click="title = 'Học lập trình'">
        Thay đổi title từ component app.vue
      </button>
      <compHeader
        v-bind:titleHeader="title"
        v-on:changeTitleEvent="handleChangeTitle"
      />
      <list-user
        v-bind:listUser="listUser"
        v-on:dltUserOnCompParent="deleteUser"
      />
      <h1>{{ title }}</h1>
      <compFooter v-bind:title="title" />
    </div>
  </div>
</template>

<script>
import compHeader from "./components/compHeader.vue";
// App
//    Headers
//    List Product
//      Product
//      Product
//   Footer
import compFooter from "./components/compFooter.vue";
import ListUser from "./components/listUsers.vue";
export default {
  name: "app",
  data() {
    return {
      title: "Welcomerrrr to Your Vue.js App",
      listUser: [
        { id: 1, email: "abc1@gmai.com", active: true },
        { id: 2, email: "abc2@gmai.com", active: false },
        { id: 3, email: "abc3@gmai.com", active: true },
        { id: 4, email: "abc4@gmai.com", active: false },
        { id: 5, email: "abc5@gmai.com", active: true },
      ],
    };
  },
  components: {
    compHeader,
    compFooter,
    ListUser,
  },
  methods: {
    handleChangeTitle(data) {
      this.title = data.title;
      console.log(data);
    },
    deleteUser(data) {
      var index = -1;
      this.listUser.forEach((user, idx) => {
        if (user.id === data.id) {
          index = idx;
        }
      });
      if (index != -1) {
        this.listUser.splice(index, 1);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
