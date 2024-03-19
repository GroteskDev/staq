// Homepage JS

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

  // function heroScroll() {
  //   newScrollAnimation(
  //     ".is-hero",
  //     ".hero-img-01",
  //     "y",
  //     "-10%",
  //     1,
  //     "top top",
  //     "bottom top"
  //   );
  //   newScrollAnimation(
  //     ".is-hero",
  //     ".hero-img-02",
  //     "y",
  //     "-25%",
  //     1.25,
  //     "top top",
  //     "bottom top"
  //   );
  // }

  // heroScroll();

  // EFS Animation

  function efsScroll() {
    newScrollAnimation(
      ".efs-img-wrapper",
      ".efs1",
      "x",
      "100px",
      2,
      "top bottom",
      "bottom top",
    );
    newScrollAnimation(
      ".efs-img-wrapper",
      ".efs2",
      "x",
      "50px",
      1.5,
      "top bottom",
      "bottom top",
    );
    newScrollAnimation(
      ".efs-img-wrapper",
      ".efs4",
      "x",
      "-50px",
      1.5,
      "top bottom",
      "bottom top",
    );
    newScrollAnimation(
      ".efs-img-wrapper",
      ".efs5",
      "x",
      "-100px",
      2,
      "top bottom",
      "bottom top",
    );
  }

  efsScroll();

  // BAAS Screen Rotate

  gsap.set(".baas-image", { perspective: 5000 });

  // const baasSection = (document.querySelector(".is-baas").style.perspective =
  //   "500px");

  gsap.fromTo(
    ".baas-image",
    {
      rotationX: -70,
      rotationZ: -1,
    },
    {
      scrollTrigger: {
        trigger: ".is-baas",
        scrub: 2,
        start: "top bottom",
        end: "bottom top",
      },
      rotationX: 0,
      rotationZ: 0,
      duration: 1,
    },
  );

  // EFS Animation

  function launchScroll() {
    newScrollAnimation(
      ".is-launch",
      ".launch-img-grid",
      "x",
      "-40vw",
      2,
      "top bottom",
      "bottom top",
    );
  }

  launchScroll();

  // --- CTA Animation --- //

  const cta = document.querySelector(".cta-wrapper");
  const ctaGraphics = document.querySelector(".graphics");

  // Define a GSAP timeline for the animation
  const ctaTl = gsap.timeline({
    paused: true, // Start paused, so it only plays on hover
    defaults: { duration: 2 }, // Set animation duration
  });

  // Define the animation sequence
  ctaTl.to(ctaGraphics, {
    scaleX: 1.2,
    scaleY: 1.2,
  });

  // Add hover event listeners
  cta.addEventListener("mouseenter", () => {
    ctaTl.play(); // Play the animation on hover
    console.log("Mouse over");
  });

  cta.addEventListener("mouseleave", () => {
    ctaTl.reverse(); // Reverse the animation on mouse leave
    console.log("Mouse leave");
  });
});
