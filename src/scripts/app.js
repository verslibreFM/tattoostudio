import Vue from 'vue';
import Recording from "../vue/Recording.vue";
import Sketch from "../vue/Sketch.vue";
import Vuelidate from "vuelidate";

//require('bootstrap')
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

//main block services
let block = document.querySelectorAll('.block-decor');
block.forEach(function (i){
   i.addEventListener('mouseover', function (e) {
      let current = i.closest('div').querySelector('.fon');
      current.style.display = "block"
   });
   i.addEventListener('mouseout', function (e) {
      let current = i.closest('div').querySelector('.fon');
      current.style.display = "none"
   });
});

//main block masters
let but = document.querySelectorAll('.master');
but.forEach(function (elem){
   elem.addEventListener('mouseover', function (e) {
      let cur = elem.closest('div').querySelector('.butt');
      cur.style.display = "block"
   });
   elem.addEventListener('mouseout', function (e) {
      let cur = elem.closest('div').querySelector('.butt');
      cur.style.display = "none"
   });
});

//main block last works
$(document).ready(function () {
   $('.next').click(function (e) {
      e.preventDefault();
      let currentImage = $('.img.curry');
      let currentImageIndex =  $('.img.curry').index();
      let nextImageIndex = currentImageIndex + 1;
      let nextImage = $('.img').eq(nextImageIndex);
      currentImage.fadeOut(1000);
      currentImage.removeClass('curry');

      if (nextImageIndex == ($('.img:last').index()+1)){
         $('.img').eq(0).fadeIn(1000);
         $('.img').eq(0).addClass('curry');
      }else{
         nextImage.fadeIn(1000);
         nextImage.addClass('curry');
      }
   });

   $('.prev').click(function (e) {
      e.preventDefault();
      let currentImage = $('.img.curry');
      let currentImageIndex = $('.img.curry').index();
      let prevImageIndex = currentImageIndex - 1;
      let prevImage = $('.img').eq(prevImageIndex);

      currentImage.fadeOut(1000);
      currentImage.removeClass('curry');
      prevImage.fadeIn(1000);
      prevImage.addClass('curry');
   });
});

// page faq
$(".questions-item__button").on("click", function(){
   $(this).next().slideToggle("200");
});








