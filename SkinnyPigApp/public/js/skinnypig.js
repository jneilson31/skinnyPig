$(function () {
    $(".productThumbnailCategory").slice(0, 40).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".productThumbnailCategory:hidden").slice(0, 40).slideDown();
        if ($(".productThumbnailCategory:hidden").length == 0) {
            $("#loadMore").hide();
        }
    });
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop a').fadeIn();
    } else {
        $('.totop a').fadeOut();
    }
});



