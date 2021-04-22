import Vue from 'vue';
import Recording from "../vue/Recording.vue";
import Sketch from "../vue/Sketch.vue";
import Vuelidate from "vuelidate";

require('bootstrap')
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Vuelidate from "vuelidate/src";
Vue.use(Vuelidate)


if (document.getElementById('vue-rec')) {
   new Vue({
      render: h => h(Recording),
   }).$mount('#vue-rec')
}
if (document.getElementById('vue-sketch')) {
   new Vue({
      render: h => h(Sketch),
   }).$mount('#vue-sketch')
}

//page index block services
let block = document.querySelectorAll('.block-decor');
block.forEach(function (i){
   i.addEventListener('mouseover', function (e) {
      let current = i.closest('div').querySelector('.bg-hover');
      current.style.display = "block"
   });
   i.addEventListener('mouseout', function (e) {
      let current = i.closest('div').querySelector('.bg-hover');
      current.style.display = "none"
   });
});

//page index block masters
let but = document.querySelectorAll('.master');
but.forEach(function (elem){
   elem.addEventListener('mouseover', function (e) {
      let cur = elem.closest('div').querySelector('.master__button');
      cur.style.display = "block"
   });
   elem.addEventListener('mouseout', function (e) {
      let cur = elem.closest('div').querySelector('.master__button');
      cur.style.display = "none"
   });
});

// page faq
$(".questions-item__button").on("click", function(){
   $(this).next().slideToggle("200");
});












