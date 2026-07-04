/*!
 * Nepal Darshan Church - core theme JS
 * Handles: navbar shrink on scroll, smooth scrolling for in-page links,
 * closing the mobile nav after a link is clicked, and active nav highlighting.
 */
(function () {
    "use strict";

    var mainNav = document.getElementById("mainNav");

    // Shrink the navbar once the user scrolls down a bit
    function navbarShrink() {
        if (!mainNav) {
            return;
        }
        if (window.scrollY === 0) {
            mainNav.classList.remove("navbar-shrink");
        } else {
            mainNav.classList.add("navbar-shrink");
        }
    }

    navbarShrink();
    document.addEventListener("scroll", navbarShrink);

    // Smooth scroll for same-page anchor links
    var scrollTriggerLinks = document.querySelectorAll(
        'a.js-scroll-trigger[href^="#"]'
    );
    scrollTriggerLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            var targetId = link.getAttribute("href");
            var target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Collapse the responsive navbar when a nav link is clicked (mobile)
    var navbarResponsive = document.getElementById("navbarResponsive");
    if (navbarResponsive) {
        var navLinks = navbarResponsive.querySelectorAll(
            ".nav-link:not(.dropdown-toggle), .dropdown-item"
        );
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (navbarResponsive.classList.contains("show")) {
                    var bsCollapse =
                        window.bootstrap &&
                        window.bootstrap.Collapse.getInstance(
                            navbarResponsive
                        );
                    if (bsCollapse) {
                        bsCollapse.hide();
                    } else if (window.bootstrap) {
                        new window.bootstrap.Collapse(navbarResponsive, {
                            toggle: true,
                        });
                    }
                }
            });
        });
    }

    // Back-to-top smooth scroll
    var backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        backToTop.addEventListener("click", function (event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
})();
