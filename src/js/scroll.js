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
        goScroll(document.querySelector(this.getAttribute("href")));
      })

    });

    function goScroll(to_block) {

      to_block.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });

    }

  }
}