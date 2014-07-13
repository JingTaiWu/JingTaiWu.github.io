//making this variable global to get all the events
var eventsFromParse = [];

$(document).ready(function(){

//div effects
  $("img").corner("30px");
  $("#greeting,#name").hide();
  $("#greeting").fadeIn(2000);
  $("#name").fadeIn(4000);
  $("#content > a").fancybox({
    type: "iframe"
  });

//switch pictures
  var imgSrc1 = "resources/me.png";
  var imgSrc2 = "resources/megrey.png";
  var imgSrc3 = "resources/meSunny.png";

  $("#left").on('click',function(){
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

  $("#right").on('click',function(){
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

  $("#nav > ul > li > a").click(function(e){
    e.preventDefault();
    scrollToDiv($(this).attr('id'));
    return false;
  })

//parsing json object
$.ajax({
  url: "https://api.parse.com/1/classes/Calendar",
  type: "GET",
  headers: {"X-Parse-Application-Id": "uJ4V4GqHDAKyzh3DUYVrkw9RMdfL64mBL2MmW5b2",
            "X-Parse-REST-API-Key": "3UIRVoMGUcCBXoiRKK8RIGE5eCqywONMIzKFBulY"},
  success: function(data){
    for (var i = 0; i < data.results.length; i++){
      eventsFromParse.push($.parseJSON(data.results[i].event));
    }
    console.log(eventsFromParse);
    $("#calendar").fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      events: eventsFromParse
    });
  },

  error: function(e){
    console.log("Failed to load Calendar Data");
    console.log(e);
  }
});

});
