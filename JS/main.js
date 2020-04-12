$(document).ready(function(){
    
    // Call the lightbox pluglin 
    $('.gallery a').simpleLightbox();

    //Hide the default banner image before executing the slider
    $('div.default').hide();
    
    // Call the autoslider method for banner images
    autoSlides();

    // Display success message on form submission
    $("#my-form").submit(function(e) {
        e.preventDefault();
      
        var $form = $(this);
        $.post($form.attr("action"), $form.serialize()).then(function() {
          alert("Thank you!");
        });
        return false;
      });
});

