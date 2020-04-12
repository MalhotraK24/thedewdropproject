$(document).ready(function(){
    
    // Call the lightbox pluglin 
    $('.gallery a').simpleLightbox();

    //Hide the default banner image before executing the slider
    $('div.default').hide();
    
    // Call the autoslider method for banner images
    autoSlides();

    // Display success message on form submission
    $('form[name="contact"]').submit(function(e) {
        e.preventDefault();
        
        var $form = $(this);
        $.post($form.attr("action"), $form.serialize()).then(function() {
          showAlert();
        });
        $form[0].reset();
        return false;
      });
});

