let slideInfo = {
    item: 0,
    total: 1,
};
let slideTimeout;

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
        Slide(true);
    });
    $("#right").click(function() {
        Slide();
    });

    // disable background for livesite
    let liveSiteFrame = document.getElementById("livesite-frame");
    liveSiteFrame.addEventListener("load", () => {
        if (liveSiteFrame && liveSiteFrame.contentWindow) {
            liveSiteFrame.contentWindow.postMessage("activate-ledwall", "*");
        }
    });

    scheduleSpecialRound();

    slideTimeout = setTimeout(function() {
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

    clearTimeout(slideTimeout);
    if (slideInfo.item === 0 || slideInfo.item === 1) {
        slideTimeout = setTimeout(function() {
            Slide();
        }, 10000);
    } else {
        slideTimeout = setTimeout(function() {
            Slide();
        }, 5000);
    }
}

function scheduleSpecialRound() {
    let specialRoundElem = document.getElementById("special-round-slide");
    const curTime = Date.now() / 1000;
    const diffWithEnd = specialRounds.end - curTime;
    if (diffWithEnd < 0) {
        // Hide slide, no more rounds
        specialRoundElem.style.display = "none";
        return;
    }
    let fileIdx = Math.min(
        specialRounds.files.length - 1,
        Math.ceil(diffWithEnd / specialRounds.interval)
    );
    const nextRound = Math.ceil(
        specialRounds.end - specialRounds.interval * (fileIdx - 1) - curTime
    );
    // console.log(fileIdx, nextRound, new Date((curTime + nextRound) * 1000));
    let roundImg = specialRoundElem.getElementsByTagName("img")[0];
    roundImg.src =
        specialRounds.basePath +
        specialRounds.files[specialRounds.files.length - fileIdx];
    console.log(`scheduling next round in ${nextRound}s`);
    setTimeout(() => {
        scheduleSpecialRound();
    }, nextRound * 1000);
}

const cancelSlide = () => {
    clearTimeout(slideTimeout);
};
