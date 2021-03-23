
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














//mouseover