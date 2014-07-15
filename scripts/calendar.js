$(document).ready(function(){

  //initailization for parse API
  Parse.initialize("uJ4V4GqHDAKyzh3DUYVrkw9RMdfL64mBL2MmW5b2", "L2dleaK9mHGa14CFlqOw2WtEC5dcPlvYrCnrg1Vo");

  //initialization for calendar
  reloadCalendar();

  //initializaion for add event dialog along with styling for input boxes
  addEventDialog = $("#addEventDialog").dialog({
                    autoOpen: false,
                    height: 400,
                    width: 500,
                    modal: true,
                    buttons: {
                      "Add Event": function(){
                        var eventobject = {

                        };
                      },
                      "Cancel" : function(){
                        addEventDialog.dialog('close');
                      }
                    },
                    show: {
                       effect: "blind",
                       duration: 500
                     },
                    hide: {
                       effect: "fade",
                       duration: 500
                     }
  });

  $("#addEvent").button();

  $(".datepicker").datepicker({dateFormat: "yy-mm-dd",
                               showAnim: "slideDown"
  });
  $("#eventColor").ColorPicker({
                  onSubmit: function(hsb, hex, rgb, el) {
              		$(el).val(hex);
              		$(el).ColorPickerHide();
              	},
                onChange: function (hsb, hex, rgb) {
		              $('#eventColor').val(hex);
	              }
  });

  $("#eventStartTime, #eventEndTime").watermark("HH:MM:SS");

  //initialization for autheticating dialog
  authDialog = $("#authentication").dialog({
                  autoOpen: false,
                  height: 351,
                  width: 535,
                  modal: true,
                  buttons: {
                    "Log in" : function(){
                      autheticate($("#user").val(), $("#pass").val());
                    },
                    "Cancel": function(){
                      authDialog.dialog("close");
                      $("#user,#pass").val('');
                    }
                  },
                 show: {
                    effect: "blind",
                    duration: 500
                  },
                 hide: {
                    effect: "fade",
                    duration: 500
                  }
                });



  //add event button listener
  $("#addEvent").on('click',function(event){
    //open the dialog
    event.preventDefault();
    authDialog.dialog("open");
  });
  //login input listenser
  $("#pass").on('keyup',function(event){
    event.preventDefault();
    if(event.which === 13){
      autheticate($("#user").val(), $("#pass").val());
    }
  });
});

//autheticating the user
function autheticate(username, password){
    Parse.User.logIn(username, password, {
      success: function(user){
        alert("Login Successful");
        authDialog.dialog('close');
        $("#user").val(''); $("#pass").val('');

        //procceed to add event
        addEventDialog.dialog('open');
      },
      error: function(user, error){
        alert("Login failed, Try Again");
      }
    });
}


//add event function
function addEvent(eventobject){
  $.ajax({
    url: "https://api.parse.com/1/classes/Calendar",
    type: "POST",
    headers: {"X-Parse-Application-Id": "uJ4V4GqHDAKyzh3DUYVrkw9RMdfL64mBL2MmW5b2",
              "X-Parse-REST-API-Key": "3UIRVoMGUcCBXoiRKK8RIGE5eCqywONMIzKFBulY",
              "Content-Type" : "application/json"},
    data: eventobject,
    success: function(data){
      console.log("Add Event Successful.");
      console.log("Here is the location of the Object: " + data.Location);
    },
    error: function(){
      console.log("Add Event Failed.");
    }
  });
}

//reload the calendar (if the user updates the calendar, calendar should reload)
function reloadCalendar(){
  //ajax call
  $.ajax({
    url: "https://api.parse.com/1/classes/Calendar",
    type: "GET",
    headers: {"X-Parse-Application-Id": "uJ4V4GqHDAKyzh3DUYVrkw9RMdfL64mBL2MmW5b2",
              "X-Parse-REST-API-Key": "3UIRVoMGUcCBXoiRKK8RIGE5eCqywONMIzKFBulY"},
    success: function(data){

      var eventsFromParse = [];
      for (var i = 0; i < data.results.length; i++){
        eventsFromParse.push(data.results[i].eventObject);
      }
      //destroy the old calendar first
      $("#calendar").fullCalendar('destroy');
      $("#calendar").fullCalendar({
        theme: true,
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
    }
  });
}
