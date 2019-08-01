function popupContact() {
  if (document.querySelector(".popup-btn")){

    document.querySelector(".popup-btn").addEventListener("click", openPopup);

    function openPopup() {
      document.querySelector(".popup-contact").parentElement.hidden = false;

      document.querySelector(".popup__close").addEventListener("click", closePopup);

      function closePopup() {
        document.querySelector(".popup-contact").parentElement.hidden = true;
      }
    }
  }
}