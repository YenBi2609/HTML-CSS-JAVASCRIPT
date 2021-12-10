<template>
  <header>
    <h1>
      {{ titleHeader }} <br />
      <button v-on:click="changeTitle">
        Thay đổi title từ component header.vue
      </button>
    </h1>
  </header>
</template>
<script>
export default {
  name: "compHeader",
  props: {
    titleHeader: String,
  },
  data() {
    return {}
  },
  methods: {
    changeTitle() {
       // this.titleHeader = 'abc'; // ko đc phép thay đổi trực tiếp props từ comp cha --> truyền sự kiện thông báo ra ngoài
      //   Kích thoạt sự kiện changeTitleEvent trong compHeader.vue -> kích hoạt func bên ngoài App.vue -> change data
      var data = {
          title : 'test data'
      }
       this.$emit('changeTitleEvent', data);

    },
  },
};
</script>
<style>
</style>