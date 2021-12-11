<template>
  <div id="app">
    <comp-tabs title="Tiêu đề của tab">
      <ul class="tabHeader">
        <li v-for="(tab, index) in tabHeader" v-bind:key="index" v-on:click="setActiveTab(index)" v-bind:class="{ active : tabActive == index}">{{tab.text}}</li>
      </ul>
      <div class="tab-content" v-if="tabActive === 0">
        <p>1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis magnam magni quidem dolor in ab vel sint dolorem aliquam, quos sit autem nemo dolore vitae tenetur id fugiat quam doloremque!</p>
      </div>
      <div class="tab-content"  v-if="tabActive === 1">
        <p>2Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis magnam magni quidem dolor in ab vel sint dolorem aliquam, quos sit autem nemo dolore vitae tenetur id fugiat quam doloremque!</p>
      </div>
      <div class="tab-content" v-if="tabActive === 2">
        <p>3Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis magnam magni quidem dolor in ab vel sint dolorem aliquam, quos sit autem nemo dolore vitae tenetur id fugiat quam doloremque!</p>
      </div>
    </comp-tabs>
    <div class="container" >
      <button v-on:click="title = 'Học lập trình'">
        Thay đổi title từ component app.vue
      </button>
      <compHeader
        v-bind:titleHeader="title"
        v-on:changeTitleEvent="handleChangeTitle"
      >
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis tenetur in molestiae. Obcaecati modi illo exercitationem adipisci eligendi nostrum ut! Porro maiores corporis tempora provident ex illo sed, minima nam.</p>
      </compHeader>
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
import CompTabs from "./components/compTabs.vue";
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
      tabHeader: [
        { text: 'Tab1'},
        { text: 'Tab2'},
        { text: 'Tab3'}
      ],
       tabActive: 0
    };
  },
  components: {
    compHeader,
    compFooter,
    ListUser,
    CompTabs
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
    },
    setActiveTab(index){
      this.tabActive = index;
    }
  },
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
