function underlineTopMenu() {

  if (document.querySelectorAll(".top_menu--js")) {

    var blocksTopMenu = document.querySelectorAll(".top_menu--js");

    blocksTopMenu.forEach(block => {

      var options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
      }
      
      var callback = function (entries, observer) {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0.3) {
            document.querySelector(".top-menu [href='#" + entry.target.id + "']").parentElement.classList.add("active");
          } else if (entry.intersectionRatio < 0.3) {
            document.querySelector(".top-menu [href='#" + entry.target.id + "']").parentElement.classList.remove("active");
          }
        });
      };

      var observer = new IntersectionObserver(callback, options);
      observer.observe(block);

    });

  }

}