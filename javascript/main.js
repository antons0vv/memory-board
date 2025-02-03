import scanData from './scandata.js'
$(document).ready(function () {

    $(window).scrollTop($(window).height() / 2);
    $(window).scrollLeft($(window).width() / 2);

    $(".scan").each(function () {
        let rAngle = (Math.random() * 20) - 10;
        $(this).css("rotate", rAngle + "deg");
    });

    $(".scan").each(function () {
        let rAnglePopup = (Math.random() * 20) - 10;
        $(".scanPopup").css("rotate", rAnglePopup + "deg");
    });

    $(".scan").draggable({ stack: ".scan" });


    // About popup

    $("#aboutBtn").click(function () {
        $(".About").removeClass("popupOff").addClass("popupOn");
    });

    $(".close").click(function () {
        $(".popup").removeClass("popupOn").addClass("popupOff");
        $(".addName").val("");
        $(".addDate").val("");
        $(".storyTextDiv").val("");
    });

    // Plus popup

    let divCount = 0;

    $("#plusBtn").click(function () {
        $(".addStory").removeClass("popupOff").addClass("popupOn");
    });

    function toggleSubmitButton() {
        let storyText = $(".storyTextDiv").val();
        let name = $(".addName").val();
        let date = $(".addDate").val();
        if (storyText.trim() !== "" && name.trim() !== "" && date.trim() !== "") {
            $(".submStory").prop("disabled", false);
            $(".submStory").addClass("enable");
        } else {
            $(".submStory").prop("disabled", true);
            $(".submStory").removeClass("enable");
        }
    }

    toggleSubmitButton();
    $(".storyTextDiv, .addName, .addDate").on("input", toggleSubmitButton);

    $(".submStory").click(function () {
        let storyText = $(".storyTextDiv").val();
        let name = $(".addName").val();
        let date = $(".addDate").val();

        if (storyText.trim() !== "" && name.trim() !== "" && date.trim() !== "") {
            let newDiv = $("<div>").addClass("story").addClass("scan").attr("id", "div" + divCount++);
            let namePara = $("<p>").addClass("text").addClass("nameCard").text(name + "/" + date);
            let storyPara = $("<p>").addClass("text").addClass("textCard").text(storyText);

            newDiv.append(namePara);
            newDiv.append(storyPara);

            newDiv.css({
                "top": "150px", "left": "150px"
            });

            $(".scans").append(newDiv);

            newDiv.draggable();

            $(".storyTextDiv").val("");
            $(".addName").val("");
            $(".addDate").val("");

            $(".popup").removeClass("popupOn").addClass("popupOff");
        }
    });


    //Ovals animation

    $("#aboutBtn").mouseover(function () {
        $(".path_2").css("opacity", "1").animate({
            'stroke-dashoffset': 0
        }, 400, 'easeInOutCubic');

    }).mouseleave(function () {
        $(".path_2").css({
            "stroke-dashoffset": "340", "opacity": "0"
        });
    });

    $("#vtBtn").mouseover(function () {
        $(".path_1").css("opacity", "1").animate({
            'stroke-dashoffset': 0
        }, 400, 'easeInOutCubic');

    }).mouseleave(function () {
        $(".path_1").css({
            "stroke-dashoffset": "340", "opacity": "0"
        });
    });

    // Description Popup

    $(".scan").click(function () {
        let imageId = $(this).attr('id');
        let imageData = scanData[imageId];
        $(".scanName").html(imageData.name);
        $(".scanDate").html(imageData.date);
        $(".scanDesc").html(imageData.description);
        $(".scanPopup").attr("src", imageData.src);

        if ($("#" + imageId).width() < $("#" + imageId).height()) {
            $(".scanPopup").css({ "rotate": "0" + "deg", "object-fit": "contain", "width": "100%", "height": "100%" });
        } else if (imageId == "basquiat") {
            $(".scanPopup").css({ "rotate": "0" + "deg", "object-fit": "contain", "width": "100%", "height": "100%" });
        }
        else if (imageId == "sticker2") {
            $(".scanPopup").css({ "rotate": "0" + "deg", "object-fit": "contain", "width": "90%", "height": "90%" });
        }
        else if (imageId == "nice2") {
            $(".scanPopup").css({ "rotate": "0" + "deg", "object-fit": "contain", "width": "100%", "height": "100%" });
        }
        else if (imageId == "matches") {
            $(".scanPopup").css({ "rotate": "0" + "deg", "object-fit": "contain", "width": "100%", "height": "100%" });
        }
        else if (imageId == "kino") {
            $(".scanPopup").css({ "rotate": "0" + "deg", "object-fit": "contain", "width": "100%", "height": "100%" });
        }
        else if (imageId == "peace") {
            $(".scanPopup").css({ "rotate": "0" + "deg", "object-fit": "contain", "width": "80%", "height": "80%" });
        }
        else {
            $(".scanPopup").css({ "rotate": "-90" + "deg", "object-fit": "contain", "width": "120%", "height": "120%" });
        };

        $(".desScan").removeClass("popupOff").addClass("popupOn");

    });

});
