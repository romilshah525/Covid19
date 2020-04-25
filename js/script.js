(function ($) {})(jQuery);

$(".dropdown-trigger").dropdown();
$(".sidenav")
  .sidenav()
  .on("click tap", "li a", () => {
    $(".sidenav").sidenav("close");
  });

$(document).ready(function () {
  $(".tabs").tabs();
  $(".collapsible").collapsible();
});
