
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















//mouseover