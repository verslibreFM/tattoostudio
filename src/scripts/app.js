
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
