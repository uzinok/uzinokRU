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
      console.log("scroll");
    }

  }
}