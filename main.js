/**
 * Animation Logic
 *
 * 1. We show the loader and the animated logo is centered when the page is loading
 * 2. Let the page load
 * 3. Stop the animation after the page is loaded and the building is drawn
 * 4. We delay the "send logo to top" animation by a second
 * 4. The logo is sent to top left
 * 5. The rest of the items are animated by the css
 */

let loadingWrapper = ".loading-wrapper";
let loaderClassName = ".loading-spinner";
let loadingLogoClassname = ".site-logo-loading";
let originalHeaderLogoClassName = ".site-logo-header-main";
let buildingPathSelector = "#building-svg";

$(window).on("load", function () {
  // Initially hide scroll bars
  hideScrollBars();

  // Navbar white background when scrolled
  changeNavbarBgOnScroll();

  // After the animation ends we stop logo animation and push it to the top
  afterAnimationEnds(() => {
    console.log("Animation Starts");
    stopLogoAnimation();
    logoToTopLeftAnimation();
  });

  setUpGoDownFunction();
});

/**
 * Responsible for pushing the logo to top left
 */
function logoToTopLeftAnimation() {
  let originalLogoPositon = getOffset(originalHeaderLogoClassName);
  let delayTime = 1000;

  console.log($(originalHeaderLogoClassName));

  console.log("position");
  console.log(originalLogoPositon.top + originalLogoPositon.height / 2 + "top");
  console.log(
    originalLogoPositon.left + originalLogoPositon.width / 2 + "bottom"
  );

  $(loadingLogoClassname)
    .delay(delayTime)
    .animate(
      {
        //   We add the height/2 and width/2 to compansate the transfrom property used perviously to center the logo
        top: originalLogoPositon.top + originalLogoPositon.height / 2,
        left: originalLogoPositon.left + originalLogoPositon.width / 2,
      },
      "slow",
      "linear",
      function () {
        // Hide the loading wrapper
        $(loadingWrapper).hide();

        // Show scrollbar
        showScrollBars();
      }
    );
}

/**
 * The function returns an element's position relative to the whole doucment (page) with height width
 *
 * @param elementClass - Element from the dom
 * @return object - Object with right, top, height, width of the element
 */
function getOffset(elementClass) {
  const rect = $(elementClass)[0].getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    height: rect.height,
    width: rect.width,
  };
}

/**
 * Stops Animation
 *
 */
function stopLogoAnimation() {
  $(buildingPathSelector).css("animation-play-state", "paused");
}

/**
 * Function passed in runs after the building animation completes
 *
 * @param function
 */
function afterAnimationEnds(afterAnimation) {
  document
    .querySelector(buildingPathSelector)
    .addEventListener("animationiteration", () => afterAnimation(), false);
}

/**
 * Adds Go down functionality for hero button
 */
function setUpGoDownFunction() {
  let goDownButtonIdentifier = ".go-down-button";
  let divToGoTo = "#affiliated-blogs";

  // Go to Down Button
  $(goDownButtonIdentifier).click(function () {
    $("html, body").animate(
      {
        scrollTop: $(divToGoTo).offset().top,
      },
      1500
    );
  });
}

/**
 * Hide scrollbars
 */
function hideScrollBars() {
  $("body").css("overflow", "hidden");
}

/**
 * Show scrollbars
 */
function showScrollBars() {
  $("body").css("overflow", "auto");
}

/**
 * Change navbar background color and logo variant on scroll
 */
function changeNavbarBgOnScroll() {
  let navbarSelector = ".navbar--fixed";

  let elementProperties = getOffset(navbarSelector);

  let topLogoSelector = ".site-logo-header-main";

  // For mobile devices
  // White bg and red logo
  if ($(window).width() < 768) {
    $(navbarSelector).addClass("navbar-fixed-white-bg");
    changeLogoToRed(topLogoSelector);
    return;
  }
  // FOr other devices
  $(window).on("scroll", function () {
    // If the scroll is greater than 100vh and minus the height of the logo
    // We minus the height to ensure that the bg turns white as soon as the logo touches the next div
    if ($(window).scrollTop() > $(window).height() - elementProperties.height) {
      $(navbarSelector).addClass("navbar-fixed-white-bg");
      changeLogoToRed(topLogoSelector);
    } else {
      $(navbarSelector).removeClass("navbar-fixed-white-bg");
      changeLogoToWhite(topLogoSelector);
    }
  });
}

/**
 * Change logo to red variant
 *
 * @param logoSelector
 */
function changeLogoToRed(logoSelector) {
  $(logoSelector).attr("src", "./assets/logo-red.svg");
}

/**
 * Change logo to white variant
 *
 * @param logoSelector
 */

function changeLogoToWhite(logoSelector) {
  $(logoSelector).attr("src", "./assets/logo.svg");
}
