function popupContact() {
  if (document.querySelector(".popup-btn")) {

    document.querySelector(".popup-btn").addEventListener("click", openPopup);

    function openPopup(e) {
      e.preventDefault();
      document.querySelector(".popup-contact").parentElement.hidden = false;

      document.querySelector(".popup__close").addEventListener("click", closePopup);

      return false;

      function closePopup() {
        document.querySelector(".popup-contact").parentElement.hidden = true;
      }
    }
  }

}