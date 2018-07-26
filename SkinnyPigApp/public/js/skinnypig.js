$(function () {
    $(".productThumbnailCategory").slice(0, 30).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".productThumbnailCategory:hidden").slice(0, 30).slideDown();
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

function required() {
    var empt = document.forms["searchBar"]["search"].value;
    if (empt == "") {
        return false;
    }
    return true;
}



