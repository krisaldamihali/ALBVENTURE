// ======================================================================================
//                        AlbVenture Project - script.js
// ======================================================================================

// ======================================================================================
//                  Section 1: Responsive Navbar Link Highlighting for Small Screens
// ======================================================================================

// Only activate this block if the screen width is less than or equal to 1130px
if (window.screen.width <= 1130) {

    // Helper function: removes all borders from navbar links
    function removeall() {
        $(".cir_border").css("border", "none");
    }

    // Each navbar link (#sec, #pri, #tri, etc.) sets itself active on click
    // and removes the active border from the others
    $("#sec").on("click", function () {
        removeall();
        $("#sec").css("border", "2px solid whitesmoke");
        $("#sec").css("border-radius", "20px");
    });
    $("#pri").on("click", function () {
        removeall();
        $("#pri").css("border", "2px solid whitesmoke");
        $("#pri").css("border-radius", "20px");
    });
    $("#tri").on("click", function () {
        removeall();
        $("#tri").css("border", "2px solid whitesmoke");
        $("#tri").css("border-radius", "20px");
    });
    $("#quad").on("click", function () {
        removeall();
        $("#quad").css("border", "2px solid whitesmoke");
        $("#quad").css("border-radius", "20px");
    });
    $("#quint").on("click", function () {
        removeall();
        $("#quint").css("border", "2px solid whitesmoke");
        $("#quint").css("border-radius", "20px");
    });
    $("#hex").on("click", function () {
        removeall();
        $("#hex").css("border", "2px solid whitesmoke");
        $("#hex").css("border-radius", "20px");
    });
    $("#hept").on("click", function () {
        removeall();
        $("#hept").css("border", "2px solid whitesmoke");
        $("#hept").css("border-radius", "20px");
    });
}

// ======================================================================================
//                  Section 1.5: Mobile Menu Toggle for Small Screens
// ======================================================================================

// Select the mobile menu button and the nav links container
const menuBtn = document.querySelector(".menu-btn");
const navlinks = document.querySelector(".nav-links");

// When clicking the mobile menu button, show/hide the nav links
menuBtn.addEventListener("click", () => {
    navlinks.classList.toggle("mobile-menu");
});


// ======================================================================================
//       Section 2: Logo Text Animation on "About" Hover (About = Gallery Section)
// ======================================================================================

// When mouse enters the "about" section, trigger a smooth transition
$("#about").on("mouseover", function () {
    introAboutLogoTransition();
});

// Function to trigger the animation of the Adventure Logo Text appearing
function introAboutLogoTransition() {
    $("#about-quad").css("top", "70%");
    $("#about-quad").css("opacity", "1");
}

// ======================================================================================
//                  Section 3: Light/Dark Mode Toggle
// ======================================================================================

// Select the Dark Mode Toggle Checkbox
const checkbox = document.getElementById("checkbox");

// Light/Dark theme toggle when clicking the checkbox
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    // Save dark mode status to localStorage
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("tourism_website_darkmode", true);
    } else {
        localStorage.setItem("tourism_website_darkmode", false);
    }
});

// Automatically apply Dark Mode if saved in localStorage
function checkDarkMode() {
    if (
        localStorage.getItem("tourism_website_darkmode") !== null &&
        localStorage.getItem("tourism_website_darkmode") === "true"
    ) {
        document.body.classList.add("dark");
        checkbox.checked = true;
    }
}
checkDarkMode();

// ======================================================================================
//                        Section 4: Scroll-to-Top Button
// ======================================================================================

// Select the scroll-up button by ID
let mybutton = document.getElementById("upbtn");

// Show/hide scroll button depending on scroll position
window.onscroll = function () {
    scrollFunction();
};

// Scroll behavior
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";  // Show the button
    } else {
        mybutton.style.display = "none";   // Hide the button
    }
}

// When scroll button is clicked, smoothly scroll back to top
function topFunction() {
    document.body.scrollTop = 0;           // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

// ======================================================================================
//                 Section 5: Dynamic Navbar Active Section Highlighting
// ======================================================================================

// Function to update which navbar link is active based on scroll position
function updateNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links li a");

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();

        // Different scroll thresholds based on screen size
        if (window.screen.width <= 425) {
            if (rect.top <= 1300) {
                navLinks.forEach((navLink) => navLink.classList.remove("active"));
                navLinks[index].classList.add("active");
            }
        } else if (425 <= window.screen.width && window.screen.width <= 768) {
            if (rect.top <= 1250) {
                navLinks.forEach((navLink) => navLink.classList.remove("active"));
                navLinks[index].classList.add("active");
            }
        } else {
            if (rect.top <= 1000) {
                navLinks.forEach((navLink) => navLink.classList.remove("active"));
                navLinks[index].classList.add("active");
            }
        }
    });
}

// Event Listener to track page scroll and highlight the appropriate navbar item
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("header, section");
    const navLinks = document.querySelectorAll(".nav-links li a");
    let currentId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Detect which section is currently being viewed
        if (scrollY >= sectionTop - 80) { // Account for navbar offset
            currentId = section.getAttribute("id");
        }
    });

    // Update nav links: remove active class from all, add to the current
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
        }
    });
});

// ======================================================================================
//                  Section 6: Redirect to Reviews on Form Submit
// ======================================================================================

// Select the Submit button inside the form
const submitButton = document.querySelector(".crow-s");

// When the user clicks the Submit button
submitButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Redirect user to the Reviews section
    window.location.href = "#reviews";
});




