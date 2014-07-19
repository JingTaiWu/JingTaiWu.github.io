
$(document).ready(function(){

//div effects
  $("img").corner("20px");
  $("#img1,#img2,#img3").corner("30px");
  $("#greeting,#name,#header img").hide();
  $("#greeting").fadeIn(2000);
  $("#name,#header img").fadeIn(4000);
  $("#content > a").fancybox({
    type: "iframe"
  });
  //my gallery
  $(".fancybox").fancybox();
  //resume
  $("#resumelink").fancybox({
    type: "iframe",
    autoCenter: true,
    width: 1250,
    height: 750,
    autoSize: false
  });

//switch pictures
  var imgSrc1 = "resources/me.png";
  var imgSrc2 = "resources/megrey.png";
  var imgSrc3 = "resources/meSunny.png";

  $("#left").on('click',function(event){
    event.preventDefault();
      if (($("#img1").attr('src') === imgSrc1)) {
        $("#img1").css('opacity',0);
        $("#img1").attr('src', imgSrc3);
        $("#img1").animate({opacity:1});
      } else if ($("#img1").attr('src') === imgSrc2) {
        $("#img1").css('opacity',0);
        $("#img1").attr('src', imgSrc1);
        $("#img1").animate({opacity:1});
      } else if ($("#img1").attr('src') === imgSrc3) {
        $("#img1").css('opacity',0);
        $("#img1").attr('src', imgSrc2);
        $("#img1").animate({opacity:1});
      }
  });

  $("#right").on('click',function(event){
    event.preventDefault();
      if (($("#img1").attr('src') === imgSrc1)) {
        $("#img1").css('opacity',0);
        $("#img1").attr('src', imgSrc2);
        $("#img1").animate({opacity:1});
      } else if ($("#img1").attr('src') === imgSrc2) {
        $("#img1").css('opacity',0);
        $("#img1").attr('src', imgSrc3);
        $("#img1").animate({opacity:1});
      } else if ($("#img1").attr('src') === imgSrc3) {
        $("#img1").css('opacity',0);
        $("#img1").attr('src', imgSrc1);
        $("#img1").animate({opacity:1});
      }
  });

//scroll to a div function (navigation bar)
  function scrollToDiv (id){
    id = id.replace("link", "");
    $('html,body').animate({scrollTop: $("#"+id).offset().top - 70},'fast');
  };

  $("#headerlink,#gallerylink,#aboutlink,#calendarSectionlink").click(function(e){
    e.preventDefault();
    scrollToDiv($(this).attr('id'));
    return false;
  })

});
