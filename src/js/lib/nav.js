$(window).on("load", function () {
  var mobileNav = document.getElementById("mobile-nav");
  var menuIcon = document.getElementById("menu-icon");
  var closeIcon = document.getElementById("close-icon");

  // The click event on the mobile navigation menu
  menuIcon.addEventListener("click", function () {
    mobileNav.classList.remove("visually-hidden");
    menuIcon.classList.add("visually-hidden");
  });

  // The click event on the mobile navigation menu
  closeIcon.addEventListener("click", function () {
    mobileNav.classList.add("visually-hidden");
    menuIcon.classList.remove("visually-hidden");
  });
});
