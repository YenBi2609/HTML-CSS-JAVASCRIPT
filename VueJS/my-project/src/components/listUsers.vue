<template>
  <div class="list-user">
    <user
      v-for="user in listUser"
      v-bind:key="user.id"
      v-bind:user="user"
      v-on:dltUser="dltUser"
    />
  </div>
</template>
<script>
import User from "./compUser.vue";
export default {
  name: "list-user",
  props: {
    listUser: {
      type: Array,
      default: {},
    },
  },
  data() {
    return {
      text: "Footer",
    };
  },
  components: {
    User,
  },
  methods: {
    dltUser(data) {
       this.$emit('dltUserOnCompParent',data);
    }
  },
};
</script>
<style>
</style>