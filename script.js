/* SHIVU WEBSITE - MAIN SCRIPT */


/* PAGE LOADER NAMES */

var loaderNames = {
    "index.html": "360\u00B0 Universe",
    "portfolio.html": "My Portfolio",
    "book.html": "The Last Summer",
    "thoughts.html": "My Thoughts",
    "course.html": "Growth Lab",
    "contact.html": "Let's Connect"
};


/* GET CURRENT PAGE */

function getCurrentPage() {
    var page = window.location.pathname.split("/").pop();

    if (page === "" || page === null) {
        page = "index.html";
    }

    return page;
}


/* MOBILE MENU */

function toggleMenu() {
    var menu = document.getElementById("navMenu");

    if (!menu) {
        return;
    }

    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
    } else {
        menu.classList.add("active");
    }
}

window.toggleMenu = toggleMenu;


function closeMobileMenu() {
    var menu = document.getElementById("navMenu");

    if (!menu) {
        return;
    }

    menu.classList.remove("active");
}


/* LOADER */

function createLoader() {

    if (document.querySelector(".premium-loader")) {
        return;
    }

    var page = getCurrentPage();
    var name = loaderNames[page];

    if (!name) {
        name = "360\u00B0 Universe";
    }

    var loader = document.createElement("div");
    loader.className = "premium-loader";

    var inner = document.createElement("div");
    inner.className = "loader-inner";

    var logo = document.createElement("div");
    logo.className = "loader-logo";
    logo.textContent = name;

    var subtitle = document.createElement("div");
    subtitle.className = "loader-subtitle";
    subtitle.textContent = "ENTERING MY UNIVERSE";

    var line = document.createElement("div");
    line.className = "loader-line";

    inner.appendChild(logo);
    inner.appendChild(subtitle);
    inner.appendChild(line);

    loader.appendChild(inner);
    document.body.appendChild(loader);

    setTimeout(function () {
        loader.classList.add("hide");
    }, 900);

    setTimeout(function () {
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }, 1600);
}


/* REVEAL ANIMATION */

function setupReveal() {

    var items = document.querySelectorAll(".reveal");
    var i;

    if (!items.length) {
        return;
    }

    if (!window.IntersectionObserver) {

        for (i = 0; i < items.length; i++) {
            items[i].classList.add("visible");
        }

        return;
    }

    var observer = new IntersectionObserver(function (entries) {

        var j;

        for (j = 0; j < entries.length; j++) {

            if (entries[j].isIntersecting) {
                entries[j].target.classList.add("visible");
                observer.unobserve(entries[j].target);
            }
        }

    }, {
        threshold: 0.12
    });

    for (i = 0; i < items.length; i++) {
        observer.observe(items[i]);
    }
}


/* SMOOTH LINKS */

function setupSmoothLinks() {

    var links = document.querySelectorAll('a[href^="#"]');
    var i;

    for (i = 0; i < links.length; i++) {

        links[i].addEventListener("click", function (event) {

            var id = this.getAttribute("href");

            if (!id || id === "#") {
                return;
            }

            var target = document.querySelector(id);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });
    }
}


/* MENU LINKS */

function setupMenuLinks() {

    var links = document.querySelectorAll(".nav-menu a");
    var i;

    for (i = 0; i < links.length; i++) {

        links[i].addEventListener("click", function () {
            closeMobileMenu();
        });

    }
}


/* ESCAPE KEY */

function setupEscapeKey() {

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });
}


/* BOOK PAGE SYSTEM */

function setupBookReader() {

    var pages = document.querySelectorAll(".book-page");

    if (!pages.length) {
        return;
    }

    var nextButton = document.getElementById("nextPage");
    var previousButton = document.getElementById("previousPage");
    var pageNumber = document.getElementById("pageNumber");

    var currentPage = 0;

    function showPage(number) {

        var i;

        if (number < 0) {
            number = 0;
        }

        if (number >= pages.length) {
            number = pages.length - 1;
        }

        currentPage = number;

        for (i = 0; i < pages.length; i++) {

            if (i === currentPage) {
                pages[i].classList.add("active");
            } else {
                pages[i].classList.remove("active");
            }
        }

        if (pageNumber) {
            pageNumber.textContent =
                (currentPage + 1) + " / " + pages.length;
        }

        if (previousButton) {

            if (currentPage === 0) {
                previousButton.disabled = true;
            } else {
                previousButton.disabled = false;
            }
        }

        if (nextButton) {

            if (currentPage === pages.length - 1) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }
        }

        window.scrollTo(0, 0);
    }


    if (nextButton) {

        nextButton.addEventListener("click", function () {

            if (currentPage < pages.length - 1) {
                showPage(currentPage + 1);
            }

        });
    }


    if (previousButton) {

        previousButton.addEventListener("click", function () {

            if (currentPage > 0) {
                showPage(currentPage - 1);
            }

        });
    }


    showPage(0);
}


/* KEYBOARD BOOK NAVIGATION */

function setupBookKeyboard() {

    var pages = document.querySelectorAll(".book-page");

    if (!pages.length) {
        return;
    }

    document.addEventListener("keydown", function (event) {

        var nextButton = document.getElementById("nextPage");
        var previousButton = document.getElementById("previousPage");

        if (event.key === "ArrowRight") {

            if (nextButton && !nextButton.disabled) {
                nextButton.click();
            }
        }

        if (event.key === "ArrowLeft") {

            if (previousButton && !previousButton.disabled) {
                previousButton.click();
            }
        }

    });
}


/* PAGE TRANSITION */

function setupPageTransitions() {

    var links = document.querySelectorAll('a[href$=".html"]');
    var i;

    for (i = 0; i < links.length; i++) {

        links[i].addEventListener("click", function (event) {

            var href = this.getAttribute("href");

            if (!href) {
                return;
            }

            if (href.indexOf("http") === 0) {
                return;
            }

            if (href.indexOf("#") === 0) {
                return;
            }

            if (href === getCurrentPage()) {
                return;
            }

            event.preventDefault();

            var transition = document.querySelector(".page-transition");

            if (!transition) {

                transition = document.createElement("div");
                transition.className = "page-transition";

                document.body.appendChild(transition);
            }

            transition.classList.add("active");

            setTimeout(function () {
                window.location.href = href;
            }, 300);

        });
    }
}


/* START EVERYTHING */

document.addEventListener("DOMContentLoaded", function () {

    createLoader();

    setupReveal();

    setupSmoothLinks();

    setupMenuLinks();

    setupEscapeKey();

    setupPageTransitions();

    setupBookReader();

    setupBookKeyboard();

});