import Vue from 'vue';
import Recording from "../vue/Recording.vue";
import Sketch from "../vue/Sketch.vue";
import Review from "../vue/Review.vue";
import Vuelidate from "vuelidate";

require('bootstrap')

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
if (document.getElementById('vue-rev')) {
   new Vue({
      render: h => h(Review),
   }).$mount('#vue-rev')
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










