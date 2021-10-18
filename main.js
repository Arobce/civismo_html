/**
 * Animation Logic
 *
 * 1. We show the loader and the logo is centered when the page is loading
 * 2. Let the page load
 * 3. The loader is hidden
 * 3. We delay the animation by a second
 * 4. The logo is sent to top left
 * 5. The rest of the items are animated by the css
 */

let loadingWrapper = ".loading-wrapper";
let loaderClassName = ".loading-spinner";
let loadingLogoClassname = ".site-logo-loading";
let originalHeaderLogoClassName = ".site-logo-header";

$(window).on("load", function () {
  fadeOutLoader();
  logoToTopLeftAnimation();
});

/**
 * Fades out the loader gif
 */
function fadeOutLoader() {
  $(loaderClassName).fadeOut("slow");
}

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