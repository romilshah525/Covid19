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
  // M.toast({
  //   html: "View in Desktop for visualizing graphs",
  //   inDuration: 1000,
  //   outDuration: 1000,
  //   displayLength: 50000,
  //   classes: "hide-on-med-and-up",
  //   activationPercent: 0.25,
  // });
  $(".tap-target").tapTarget();
  if ($(window).width() < 600) {
    $(".tap-target").tapTarget("open");
  }
});
