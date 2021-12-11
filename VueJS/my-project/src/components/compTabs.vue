<template>
    <div class="comp-tabs">
        {{title}}
        <slot></slot>
        </div>
</template>
<script>
export default {
      name: 'comp-tabs',
      props: {
          title: String
      },
  data () {
    return {
    }
  },
  methods: {}

}
</script>
<style>
.tabHeader {
  list-style-type: none;
  display: flex;
  justify-content: center; 
}
.tabHeader li {
  border: 1px solid #333;
  margin-right: 50px;
  padding: 10px 25px;
  cursor: pointer;
}
.tabHeader li:hover {
  background-color: #333;
  color: white;
}
</style>