$(window).on("load", function () {
  // Call the autoslider method for banner images
  if ($(".slideshow-container").length > 0) {
    autoSlides();
  }

  // Hide the section displaying the gallery on load.
  $("section.grid").addClass("visually-hidden");
  // Images loaded is zero because we're going to process a new set of images.
  var imagesLoaded = 0;
  // Total images is still the total number of <img> elements on the page.
  var imgs = $("div.gallery img");
  var totalImages = imgs.length;

  // Step through each image in the DOM, clone it, attach an onload event
  // listener, then set its source to the source of the original image. When
  // that new image has loaded, fire the imageLoaded() callback.
  imgs.each(function (idx, img) {
    $("<img>").on("load", imageLoaded).attr("src", $(img).attr("src"));
  });

  // Do exactly as we had before -- increment the loaded count and if all are
  // loaded, call the allImagesLoaded() function.
  function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded == totalImages) {
      allImagesLoaded();
    }
  }

  function allImagesLoaded() {
    console.log("Portfolio Images have been Loaded.");
    $(".loading-images").addClass("visually-hidden");
    $("section.grid").removeClass("visually-hidden");
    $(".gallery a").simpleLightbox();
  }

  // Display success message on form submission
  $('form[name="contact-us"]').submit(function (e) {
    e.preventDefault();

    // Putting the value from Name field to the hidden Subject field to create the subject of the email
    var nameFieldValue = $('input[name="name"]').val();
    $('input[name="subject"]').val(
      "New quote request from : " + nameFieldValue
    );

    // Display alert message on submission of the form
    var $form = $(this);
    $.post($form.attr("action"), $form.serialize()).then(function () {
      showAlert();
    });

    // Clear all the fields or reset the form
    $form[0].reset();
    return false;
  });
});
