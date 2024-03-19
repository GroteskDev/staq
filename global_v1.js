// global JS

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false,
});

function initializeAnimations() {
  // Animate on ------------------------------------

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 120%",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });

    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 90%",
      onEnter: () => timeline.play(),
    });
  }

  $(".animate-on").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this), {
      opacity: 0,
      yPercent: 30,
      duration: 0.5,
      ease: "power2.out",
      stagger: { amount: 0.5 },
    });
    createScrollTrigger($(this), tl);
  });

  // Hover states

  let splitType = new SplitType("[hoverstagger='text'],[text-split]", {
    types: "words,chars",
    tagName: "span",
  });

  $("[hoverstagger='link']").each(function (index) {
    let text1 = $(this).find("[hoverstagger='text']").eq(0);
    let text2 = $(this).find("[hoverstagger='text']").eq(1);

    let tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.2,
        ease: "power2.inOut",
      },
    });

    tl.to(text1.find(".char"), {
      yPercent: -100,
      duration: 0.25,
      stagger: { amount: 0.2 },
    });
    tl.from(
      text2.find(".char"),
      { yPercent: 100, duration: 0.25, stagger: { amount: 0.2 } },
      0,
    );

    $(this).on("mouseenter", function () {
      tl.play();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// Check if the browser is Safari on desktop
var isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

if (isSafari) {
  // Check the width of the browser window
  var windowWidth = window.innerWidth;

  if (windowWidth <= 600) {
    // Code to run for Safari on small screens
    window.addEventListener("DOMContentLoaded", initializeAnimations);
    console.log("This is Safari on desktop with a small screen size.");
  } else {
    // Code to run for Safari on larger screens
    console.log(
      "This is Safari on desktop with a large screen size. No animations for you.",
    );
  }
} else {
  // Code to run for other browsers or non-desktop Safari
  window.addEventListener("DOMContentLoaded", initializeAnimations);
  console.log("This is not Safari. You get animations 🕺");
}
