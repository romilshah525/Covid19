(function ($) {
  $(function () {
    $(".sidenav").sidenav();
  });
})(jQuery);

$(document).ready(function () {
  M.toast({
    html: "View in Desktop for better visualisation",
    inDuration: 1000,
    outDuration: 1000,
    displayLength: 5000,
    classes: "hide-on-med-and-up",
    activationPercent: 0.25,
  });
});

$(".dropdown-trigger").dropdown();
$(".sidenav")
  .sidenav()
  .on("click tap", "li a", () => {
    $(".sidenav").sidenav("close");
  });

$(document).ready(function () {
  $(".tabs").tabs();
});
