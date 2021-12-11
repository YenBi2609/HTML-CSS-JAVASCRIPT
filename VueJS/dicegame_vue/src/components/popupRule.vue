<template>
  <div class="wrapper-popup" v-bind:class="{ 'open-popup' : isOpenPopup == true}">
      <div class="rule">
        <h3>Luật chơi</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, accusantium nisi debitis perspiciatis cumque unde quo quidem nobis, totam non libero eaque impedit delectus explicabo quia minus consequuntur saepe exercitationem.</p>
        <button class="confirm" v-on:click="confirm">Đã hiểu</button>
  </div>
  </div>
</template>
<script>
export default {
  name: "popupRule",
  props: {
      isOpenPopup : Boolean
  },
  data() {
    return {};
  },
  methods: {
      confirm(){
          this.$emit('handleConfirm');
      }
  },
};
</script>
<style>
   .wrapper-popup {
       position: fixed;
       top: 0;
       left: 0;
       bottom: 0;
       right: 0;
       background-color: rgba(0,0,0,0.4);
       opacity: 0;
       visibility: hidden;
       transition: all .3s ease;
   }
   .rule {
       width: 300px;
       padding: 20px;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%) scale(1.2);
       position: absolute;
       background-color: white;
       font-family: Arial, Helvetica, sans-serif;
       transition: all 0.3 ease;
   }
   .wrapper-popup.open-popup {
       opacity: 1;
       visibility: visible;
   }
   .open-popup .rule {
       transform: translate(-50%, -50%) scale(1);
   }
   .rule h3 {
       margin-bottom: 10px;
   }
   .rule .confirm {
       border: 2px solid #333;
       background-color: white;
       padding: 8px 15px;
       margin-top: 20px;
       cursor: pointer;
       transition: all .3s ease;
   }
      .rule .confirm:hover {
       background-color: #333;
       color: white;

   }


</style>