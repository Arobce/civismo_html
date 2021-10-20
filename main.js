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
let originalHeaderLogoClassName = ".site-logo-header";
let buildingPathSelector = "#building-svg";

$(window).on("load", function () {
  // After the animation ends we stop logo animation and push it to the top
  afterAnimationEnds(() => {
    console.log("Animation Starts");
    stopLogoAnimation();
    logoToTopLeftAnimation();
  });
});

/**
 * Responsible for pushing the logo to top left
 */
function logoToTopLeftAnimation() {
  let originalLogoPositon = getOffset(originalHeaderLogoClassName);
  let delayTime = 1000;

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
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
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
