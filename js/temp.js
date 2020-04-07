(function ($) {
  $(function () {
    $(".sidenav").sidenav();
  });
})(jQuery);

$(".dropdown-trigger").dropdown();
$(".sidenav")
  .sidenav()
  .on("click tap", "li a", () => {
    $(".sidenav").sidenav("close");
  });

if ($(window).width() <= 768) {
  let a = document.getElementsByClassName("add-class");
  for (i of a) {
    i.classList.remove("container");
  }
}
