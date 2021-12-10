<template>
  <footer>
    <h1>{{ title }}</h1>
  </footer>
</template>
<script>
export default {
  name: "compFooter",
  props: {
    title: {
        type: String,
        default: 'Default'
    }
  },
  data() {
    return {};
  },
};
</script>
<style>
</style>