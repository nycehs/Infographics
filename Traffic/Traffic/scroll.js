$(document).on('click', '#arrow', function(event){                        
    event.preventDefault();
    var viewportHeight = $(window).height();

    $('html, body').animate({
        scrollTop: viewportHeight,
        complete: function () {
        }
    }, 1400);
});