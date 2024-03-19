gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
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
    opacityValue
  ) {
    let triggerElement = trigger;
    let targetElement = target;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: startValue,
        end: endValue,
        scrub: scrub
      }
    });

    // Use the "axis" argument to specify the property to animate
    let animationProperties = {
      [axis]: value,
      opacity: opacityValue
    };

    tl.from(targetElement, {
      ...animationProperties,
      duration: 1
    });
  }

  // Logo Animation

  function footerScroll() {
    newScrollAnimation(
      ".is-footer",
      ".footer-logo",
      "y",
      "50%",
      1.5,
      "top bottom",
      "bottom bottom",
      0.5 // Pass the opacity value as an argument
    );
  }

  footerScroll();

  // Mobile nav animation

  function mobileNav() {
    
    if (window.innerWidth < 992) {
        $('.wrapper-footer-links').css('display', 'none');
        $('.wrapper-footer-content').off('click').on('click', function() {
            let menuContent = $(this).find('.wrapper-footer-links');
            let menuIcon = $(this).find('.chevron-icon');

            if (menuContent.css('display') == 'block') {
                menuContent.slideUp();
                menuIcon.removeClass('rotate');
                console.log('mobile')
            } else {
                menuContent.slideDown();
                menuIcon.addClass('rotate');
                console.log('dt')
            }
        });
    } else {
        $('.wrapper-footer-links').css('display', 'block');
        $('.wrapper-footer-content').off('click');
    }
}

window.addEventListener("load", mobileNav);
window.addEventListener("resize", mobileNav);

})
