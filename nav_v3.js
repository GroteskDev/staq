// --- Navigation --- //

// - stop scroll on mobile

let burger = document.querySelector(".mobile-hamburger-v2");
let docBody = document.querySelector("body");

function togglePageScroll() {
  docBody.classList.toggle("mob-nav-open");
}

burger.addEventListener("click", togglePageScroll);

// --- mobile menu

function mobileMenuNav() {
    $('.mob-sub-menu-list').css('display', 'none');
    $('.mob-menu-item-list').off('click').on('click', function() {
        let menuContent = $(this).find('.mob-sub-menu-list');
        let menuIcon = $(this).find('.mob-menu-icon-chevron');

        if (menuContent.css('display') == 'block') {
            menuContent.slideUp();
            menuIcon.removeClass('rotate');
        } else {
            menuContent.slideDown();
            menuIcon.addClass('rotate');
        }
    });
}

mobileMenuNav()

// --- Get elements

let menuLink = $(".menu_dp-link-v2");
let content = $(".menu_dropdown_content-v2");
let menuBG = $(".menu_bg-v2");
let dropdownWrap = $(".menu_content-v2");
let menuArrow = $(".menu_arrow-wrap-v2");

gsap.defaults({
  duration: 0.3,
  ease: "powerOut2"
});

function revealDropdown(currentLink, currentContent) {
  dropdownWrap.css("display", "flex");
  gsap.set(menuArrow, {
    width: "100%",
    x: currentLink.offset().left
  });
  gsap.set(menuBG, {
    width: "100%",
    height: currentContent.outerHeight() + 64 + "px"
  });
  gsap.set(content, {
    opacity: 0
  });
  gsap.set(currentContent, {
    opacity: 1,
    x: "0em"
  });
}

function switchDropdown(currentLink, previousContent, currentContent) {
  try {
    console.log('switchDropdown called');
    console.log('currentLink:', currentLink);
    console.log('previousContent:', previousContent);
    console.log('currentContent:', currentContent);

    gsap.to(menuArrow, {
      width: currentLink.outerWidth(),
      x: currentLink.offset().left
    });
    gsap.to(menuBG, {
      width: currentContent.outerWidth(),
      height: currentContent.outerHeight() + 64 + "px"
    });
    
    // invert moveDistance if needed
    let moveDistance = 10;
    if (currentContent.index() < previousContent.index()) {
      moveDistance = moveDistance * -1;
    }
    
    gsap.fromTo(
      previousContent,
      { opacity: 1, x: "0em" },
      {
        opacity: 0,
        x: moveDistance * -1 + "em"
        // duration: 0.2
      }
    );
    gsap.fromTo(
      currentContent,
      { opacity: 0, x: moveDistance + "em" },
      {
        opacity: 1,
        x: "0em"
        // duration: 0.2
      }
    );
  } catch (e) {
    console.error('Error in switchDropdown:', e);
  }
}

// Open dropdown animation
let showDropdown = gsap.timeline({
  paused: true,
  onReverseComplete: () => {
    dropdownWrap.css("display", "none");
    menuLink.removeClass("active");
  }
});
showDropdown
  .from(dropdownWrap, { opacity: 0, rotateX: -10, duration: 0.2 })
  .to(menuArrow, { opacity: 1, rotateX: 0, duration: 0.1 }, "<");

// Link Hover In
menuLink.on("mouseenter", function () {
  console.log('menuLink mouseenter');
  
  // get elements
  let previousLink = menuLink.filter(".active").removeClass("active");
  let currentLink = $(this).addClass("active");
  let previousContent = content.filter(".active").removeClass("active");
  let currentContent = content.eq($(this).index()).addClass("active");
  
  console.log('previousLink:', previousLink);
  console.log('currentLink:', currentLink);
  console.log('previousContent:', previousContent);
  console.log('currentContent:', currentContent);
  
  // play animations
  showDropdown.play();
  if (previousLink.length === 0) {
    revealDropdown(currentLink, currentContent);
  } else if (previousLink.index() !== currentLink.index()) {
    setTimeout(function () {
      switchDropdown(currentLink, previousContent, currentContent);
    }, 100);
  }
});

// Menu Hover Out
$(".menu-v2").on("mouseleave", function (event) {
  const target = event.relatedTarget;
  if (!$(target).is(".menu_dp-wrap-v2, .menu_content-v2")) {
    // The cursor left both elements, perform the animation
    setTimeout(function () {
      showDropdown.reverse();
    }, 100); // Delay in milliseconds
  }
});
