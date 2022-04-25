let slideInfo = {
    item: 1,
    total: 9,
};

$(document).ready(function() {
    let WindowWidth = $(window).width();
    let SlideCount = $("#slides li").length;
    let SlidesWidth = SlideCount * WindowWidth;

    slideInfo.item = 0;
    slideInfo.total = SlideCount;

    $(".slide").css("width", WindowWidth + "px");
    $("#slides").css("width", SlidesWidth + "px");
    $("#slides li:nth-child(1)").addClass("alive");
    $("#left").click(function() {
        Slide();
    });
    $("#right").click(function() {
        Slide();
    });
    setTimeout(function() {
        Slide();
    }, 10000);
});

function Slide(isBackwards = false) {
    let target = slideInfo.item + (isBackwards ? -1 : 1);

    if (target === -1) {
        DoIt(slideInfo.total - 1);
    } else if (target === slideInfo.total) {
        DoIt(0);
    } else {
        DoIt(target);
    }
}

function DoIt(target) {
    let windowwidth = $(window).width();
    let margin = windowwidth * target;
    let actualtarget = target + 1;

    $("#slides li:nth-child(" + actualtarget + ")").addClass("alive");
    $("#slides").css("transform", "translate3d(-" + margin + "px,0px,0px)");

    slideInfo.item = target;

    $("#count").html(slideInfo.item + 1);

    if (slideInfo.item === 0 || slideInfo.item === 1) {
        setTimeout(function() {
            Slide();
        }, 10000);
    } else {
        setTimeout(function() {
            Slide();
        }, 5000);
    }
}
