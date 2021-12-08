var vueInstance = new Vue({
    el: '#app',
    data: {
        title: 'Samsung'
    },
    methods: {
        say: function(text){
            return 'Hello ' + text;
        }
    } 
  })
console.log(vueInstance);

setTimeout(()=>{
    vueInstance.title = 'ABC';
}, 3000);