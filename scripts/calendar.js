$(document).ready(function(){

  //initailization for parse API
  Parse.initialize("uJ4V4GqHDAKyzh3DUYVrkw9RMdfL64mBL2MmW5b2", "L2dleaK9mHGa14CFlqOw2WtEC5dcPlvYrCnrg1Vo");

  //initialization for calendar
  $("#calendar").fullCalendar();
  //load the data into the calendar
  loadCalendarJS();

  //initializaion for add event dialog along with styling for input boxes
  addEventDialog = $("#addEventDialog").dialog({
                    autoOpen: false,
                    height: 400,
                    width: 500,
                    modal: true,
                    buttons: {
                      "Add Event": function(){
                        addEventJs();
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
                    duration: 1000
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

//document ready ends here--------------------------------------------
//UDF starts here-----------------------------------------------------

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
function addEventREST(eventobject){
  $.ajax({
    url: "https://api.parse.com/1/classes/Calendar",
    type: "POST",
    headers: {"X-Parse-Application-Id": "uJ4V4GqHDAKyzh3DUYVrkw9RMdfL64mBL2MmW5b2",
              "X-Parse-REST-API-Key": "3UIRVoMGUcCBXoiRKK8RIGE5eCqywONMIzKFBulY",
              "Content-Type" : "application/json"},
    data: eventobject,
    success: function(data){
      alert("Add Event Successful.");
      console.log("Here is the location of the Object: " + data.Location);
      loadCalendar();
    },
    error: function(){
      alert("Add Event Failed.");
    }
  });
}

function addEventJs(event){
  //initialization for add event status
  $("#addEventStatusDialog").dialog({
    autoOpen: false,
    modal: true,
    height: 351,
    width: 535,
    buttons: {
      "Okay" : function(){
        this.dialog("close");
        $("#addEventStatusDialog").empty();
      },
    show: {
       effect: "fade",
       duration: 500
     },
    hide: {
       effect: "fade",
       duration: 500
     }
    }
  });

  //instantiate
  var CalendarClass = Parse.Object.extend("Calendar");
  var eventObject = new CalendarClass();
  if(validateTimeFormat($("#eventStartTime").val()) !== true){
    alert("Your event start time isn't in the right format!");
  }
  else if(validateTimeFor($("#eventEndTime").val()) !== true){
    alert("Your event end time isn't in the right format!");
  } else {
    //add the object
    eventObject.set("title", $("#eventTitle").val());
    eventObject.set("start", $("#eventStart").val() + "T" + $("#eventStartTime").val());
    eventObject.set("end", $("#eventEnd").val() + "T" + $("#eventEndTime").val());
    eventObject.set("eventColor", "#" + $("#eventColor").val());

    //save the object to the server
    eventObject.save(null, {
      success: function(eventObject){
        console.log("Event successfully added!");
        console.log("Event Object:");
        console.log(eventObject);
        $("#addEventStatusDialog").append("<p>" + "Event successfully added!" + "</p>");
        $("#addEventStatusDialog").dialog("open");
        loadCalendarJS();
      },
      error: function(eventObject, error){
        console.log("Failed to add event!");
        console.log("Error: " + error.message);
        $("#addEventStatusDialog").append("<p>" + "Failed to add event!" + "</p>");
        $("#addEventStatusDialog").dialog("open");
      }
    });
  }
}

//reload the calendar after any calendar updates
function loadCalendarJS(){
  //Parse object queries setup
  var CalendarClass = Parse.Object.extend("Calendar");
  var query = new Parse.Query(CalendarClass);
  //you can set up intersting query constraints
  //quert.equalTo

  //find returns the query result
  query.find({
    success: function(results){
      var events = [];
      for(var youTheShitz = 0; youTheShitz < results.length; youTheShitz++){
        events.push(results[youTheShitz].attributes);
      }
      $("#calendar").fullCalendar('destroy');
      $("#calendar").fullCalendar({
        theme: true,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        events: events
      });
    },
    error: function(error){
      console.log("This is what went wrong: " + error.message);
    }
  });
}

//reload the calendar (if the user updates the calendar, calendar should reload)
function loadCalendarREST(){
  //Parse object queries setup
  var CalendarClass = Parse.Object.extend("Calendar");
  var query = new Parse.Query(CalendarClass);
  query.find
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

//check for valid time input
function validateTimeFormat(checkString){
  //regular Experssion, omg fav
  var regEx = /^([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/;
  var result = regEx.test(checkString);
  return result;
}
