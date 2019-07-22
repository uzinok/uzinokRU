function scroll() {
  if (document.querySelector(".top-menu")) {
    // получаем ссылки
    var links = document.querySelectorAll(".top-menu a");

    // в цикле отслеживаем клик по каждой ссылке
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        // отменяем действие по умолчанию
        e.preventDefault();
        // вызываю функцию скролла
        // передаем блок к которому будем скролить
        to_go_scroll(document.querySelector(this.getAttribute("href")));
      })
    });

    function to_go_scroll(to_block) {
      // получаем расстояние до блока в документе
      var to_top_scroll = to_block.getBoundingClientRect().top + pageYOffset;

      var fps = 40;
      // расчитаем время анимации
      // из расчета 1000рх за 0.3сек
      var speed = 1000 / 0.4;
      // для этого узнаем расстояние на которое нужно скролить
      var distance = to_top_scroll - pageYOffset;
      // время за которое нужно пройти расстояние
      // v=s/t => t=s/v
      var to_time = Math.abs(distance / speed);
      // получаем расстояние на которое сдвигаем
      var speed_kadr = (distance/to_time)/fps;
      // получаем начало времени
      var start = Date.now();
      var to_distance = distance;

      // запускаем анимацию
      var timer = setInterval(function () {
        // получаем время анимации, сколько уже длиться анимация
        var timePassed = Date.now() - start;
        // если время вышло
        // if (to_distance <= 0) {
        if ((timePassed / 1000) >= to_time) {
          // останавливаем анимацию
          clearInterval(timer);
        } else {
          // либо анимируем дальше
          window.scrollBy(0, speed_kadr);
          to_distance -= speed_kadr;

          // для начала нужно посмотреть как будет меняться расстояние в течении анимации
        }
        console.log("to_distance: " + Math.abs(to_distance));
      }, 1000 / fps)

      // console.log(to_block);
      console.log("дистанция: " + distance);
      console.log("время: " + to_time);
      console.log("скорость: " + speed);

    }

  }
}