<template>
    <div class="user">
        <p>{{user.email}}</p>
        <button v-on:click="deleteUser" clas="delete">Delete</button>
    </div>
</template>
<script>
export default {
      name: 'user',
      props: {
          user: {
              type: Object,
              default: null
          }
      },
  data () {
    return {
    }
  },
  methods: {
      deleteUser(){
          var data = {
              id: this.user.id
          };
          this.$emit('dltUser',data);
          }
      }
}
</script>
<style>
   p, .delete {
       display: inline;
   }
</style>