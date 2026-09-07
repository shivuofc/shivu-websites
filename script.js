/* =====================================================
   SHIVU — 360° UNIVERSE
   CLEAN JAVASCRIPT
   NO LOADING SCREEN
===================================================== */

(function () {

  "use strict";


  /* ==========================================
     MOBILE NAVIGATION
  ========================================== */

  var menuButton = document.getElementById("menuButton");
  var navMenu = document.getElementById("navMenu");


  if (menuButton && navMenu) {

    menuButton.addEventListener("click", function (event) {

      event.preventDefault();
      event.stopPropagation();

      navMenu.classList.toggle("open");

    });


    /* Close menu after clicking a link */

    var navLinks = navMenu.getElementsByTagName("a");

    var i;

    for (i = 0; i < navLinks.length; i++) {

      navLinks[i].addEventListener("click", function () {

        navMenu.classList.remove("open");

      });

    }


    /* Close menu when clicking outside */

    document.addEventListener("click", function (event) {

      if (
        !navMenu.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {

        navMenu.classList.remove("open");

      }

    });

  }


  /* ==========================================
     CLOSE MENU WHEN RESIZING TO DESKTOP
  ========================================== */

  window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

      if (navMenu) {
        navMenu.classList.remove("open");
      }

    }

  });


  /* ==========================================
     REMOVE ANY OLD LOADER
     NO NEW LOADER IS CREATED
  ========================================== */

  function removeOldLoader() {

    var selectors = [
      ".site-loader",
      "#siteLoader",
      "#loader",
      ".loading-screen",
      ".loader-screen",
      ".page-loader"
    ];

    var i;
    var j;
    var elements;

    for (i = 0; i < selectors.length; i++) {

      elements = document.querySelectorAll(selectors[i]);

      for (j = 0; j < elements.length; j++) {

        if (
          elements[j] &&
          elements[j].parentNode
        ) {

          elements[j].parentNode.removeChild(
            elements[j]
          );

        }

      }

    }

  }


  removeOldLoader();


  /* ==========================================
     MAKE SURE PAGE CONTENT IS VISIBLE
  ========================================== */

  function showPageContent() {

    var elements =
      document.querySelectorAll(".reveal");

    var i;

    for (i = 0; i < elements.length; i++) {

      elements[i].classList.add("show");

      elements[i].style.opacity = "1";
      elements[i].style.visibility = "visible";
      elements[i].style.transform = "none";

    }

  }


  showPageContent();


  /* ==========================================
     PAGE LOAD
  ========================================== */

  window.addEventListener("load", function () {

    removeOldLoader();
    showPageContent();

  });


})();