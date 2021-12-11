<template>
  <header>
    <hr>
    <slot></slot>
    <hr>
    <button class="change" v-on:click="handleClickInputFile">Thay đổi data</button>
    <input type="file" style="display: none;" ref="fileInputData">
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
    handleClickInputFile(){
       this.$refs.fileInputData.click();
    }
  },
};
</script>
<style>
.change {
  color: white;
  background-color: #333;
  transition: all 3s ease;
  padding: 12px 15px;
  border: 1px solid #333;
}
</style>