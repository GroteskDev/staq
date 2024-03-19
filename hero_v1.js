// Hero Parallax JS

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false,
});

window.addEventListener("DOMContentLoaded", (event) => {
  // Animate on scroll function

  function newScrollAnimation(
    trigger,
    target,
    axis,
    value,
    scrub,
    startValue,
    endValue,
  ) {
    let triggerElement = trigger;
    let targetElement = target;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: startValue,
        end: endValue,
        scrub: scrub,
      },
    });

    // Use the "axis" argument to specify the property to animate
    let animationProperties = {};
    animationProperties[axis] = value;

    tl.to(targetElement, {
      ...animationProperties, // Use spread operator to set the property dynamically
      duration: 1,
    });
  }

  // Hero Animation
  let heroImg03 = document.querySelector(".hero-img-03");

  function heroScroll() {
    if (".hero-img-01") {
      newScrollAnimation(
        ".is-hero",
        ".hero-img-01",
        "y",
        "-50%",
        1,
        "top top",
        "bottom top",
      );
    }
    if (".hero-img-02") {
      newScrollAnimation(
        ".is-hero",
        ".hero-img-02",
        "y",
        "-25%",
        1,
        "top top",
        "bottom top",
      );
    }
    if (heroImg03) {
      newScrollAnimation(
        ".is-hero",
        ".hero-img-03",
        "y",
        "-10%",
        1,
        "top top",
        "bottom top",
      );
    }
  }

  heroScroll();
});
