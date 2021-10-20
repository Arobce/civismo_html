$(window).on("load", function () {
  toggleNavbarOnButtonClick();
});

function toggleNavbarOnButtonClick() {
  $(".toggle-navbar").click(function () {
    $("section#sidenav-menu").toggle("slide", {direction: 'right'}, 1000);
  });
}

 