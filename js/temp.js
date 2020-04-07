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
