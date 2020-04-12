$(document).ready(function(){
    
    // Call the lightbox pluglin 
    $('.gallery a').simpleLightbox();

    //Hide the default banner image before executing the slider
    $('div.default').hide();
    
    // Call the autoslider method for banner images
    autoSlides();
});

