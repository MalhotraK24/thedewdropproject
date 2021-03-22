$(window).on("load", function () {
  var deferredPrompt;
  var addHome = document.getElementById("add-to-home");
  var addBtn = document.getElementById("add-btn");
  var snackbar = document.getElementById("snackbar");
  var closeIcon = document.getElementById("close");
  var reloadLink = document.getElementById("reload");

  // listen to the service worker promise in index.html to see if there has been a new update.
  // condition: the serviceworker.js needs to have some kind of change - e.g. increment CACHE_VERSION.
  window["isUpdateAvailable"].then(function (isAvailable) {
    if (isAvailable) {
      // new update available
      if (addHome.classList.contains("visually-hidden")) {
        snackbar.classList.remove("visually-hidden");
      } else {
        addHome.classList.add("visually-hidden");
        snackbar.classList.remove("visually-hidden");
      }
    }
  });

  // The click event on the pop up notification
  reloadLink.addEventListener("click", function () {
    window.location.reload();
  });

  // The click event on the pop up notification
  closeIcon.addEventListener("click", function () {
    snackbar.classList.add("visually-hidden");
  });

  if (localStorage.counter <= 4) {
    // Prompt to give users the option to add the PWA to their hoem screens
    window.addEventListener("beforeinstallprompt", function (e) {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;

      if (localStorage.getItem("popState") != "shown") {
        // Update UI to notify the user they can add to home screen
        addHome.classList.remove("visually-hidden");
        setTimeout(function () {
          addHome.classList.add("visually-hidden");
        }, 8000);

        addBtn.addEventListener("click", function (e) {
          // hide our user interface that shows our A2HS button
          addHome.classList.add("visually-hidden");
          //localStorage.setItem('popState','shown')
          // Show the prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then(function (choiceResult) {
            if (choiceResult.outcome === "accepted") {
              console.log(
                "User " + choiceResult.outcome + " to install the app."
              );
              addHome.classList.add("visually-hidden");
            } else {
              console.log(
                "User " + choiceResult.outcome + " to install the app."
              );
              addHome.classList.add("visually-hidden");
            }
            deferredPrompt = null;
          });
        });
      }
    });
  } else {
    localStorage.setItem("popState", "shown");
  }
});
