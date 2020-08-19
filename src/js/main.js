$(window).on("load", function () {
  console.log(window.location.href);
  if (window.location.href.endsWith("index.html")) {
    // Call the autoslider method for banner images
    autoSlides();

    // Call the lightbox pluglin
    $(".gallery a").simpleLightbox();

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
  }
});
