
// вызов всех функций страницы
document.addEventListener("DOMContentLoaded", function () {
  // фон лендинга на canvas
  bgCanvas();
  // скролл по клику в меню
  scroll();
  // подчеркивание ссылок на открытые разделы на лендинге
  underlineTopMenu();
  // открытие и закрытие popup-contact
  popupContact();
});
