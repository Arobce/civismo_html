$(window).on("load", function () {
  toggleNavbarOnButtonClick();
  setMobileNavigationDropdowns();
});


/**
 * Adds functionality to open side nav with animation
 */
function toggleNavbarOnButtonClick() {
  let width = $(window).width();

  let navbarClass = ".sidenav-menu--mobile";

  if (width > 768) {
    navbarClass = ".sidenav-menu--desktop";
  }

  console.log(navbarClass);

  $(".toggle-navbar").click(function (e) {
    // Removes a wierd issue where the page jumps to top
    e.preventDefault();
    $(navbarClass).toggle("slide", { direction: "right" }, 1000);
    $('body').toggleClass('hide-scrollbar');
  });
}

/**
 * Adds mobile navbar drop down functionality
 */
function setMobileNavigationDropdowns() {
  // When Button is pressed
  $(".sidenav-menu-row__title").click(function () {
    // Hide all other links except this one
    hideAllOtherLinks($(this).next());

    // Set the links of the associated title visible
    $(this).next().toggleClass("flex");

    // Toggle the caret between up and down
    $(this).children().children().toggleClass("fa-caret-down fa-caret-up");
  });
}

/**
 * Hides all other links except the one provided
 * @param {element} currentElement
 */
function hideAllOtherLinks(currentElement) {
  $(".sidenav-menu-row__links").each(function () {
    if ($(this).is(currentElement)) {
      return;
    }
    $(this).removeClass("flex");
  });
}
