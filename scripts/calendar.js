$(document).ready(function(){
  //initailization for parse API
  Parse.initialize("uJ4V4GqHDAKyzh3DUYVrkw9RMdfL64mBL2MmW5b2", "L2dleaK9mHGa14CFlqOw2WtEC5dcPlvYrCnrg1Vo");

  //initailization for array of events (for update)
  events = [];

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
                        var eventAdded = addEventJs();
                        if(eventAdded){
                          addEventDialog.dialog('close');
                        }
                      },
                      "Cancel" : function(){
                        addEventDialog.dialog('close');
                      }
                    },
                    show: {
                       effect: "fade",
                       duration: 500
                     },
                    hide: {
                       effect: "fade",
                       duration: 1000
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

  $("#eventStartTime, #eventEndTime").timepicker({'timeFormat': 'H:i:s'});

  //check log in status
  if(Parse.User.current()){
    $("#login").text("Log Out");
  } else {
    $("#login").text("Log In");
  }
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
                    effect: "fade",
                    duration: 1000
                  },
                 hide: {
                    effect: "fade",
                    duration: 1000
                  }
                });


  //log in
  $("#nav ul li:nth-child(5) a").on('click',function(event ){
    event.preventDefault();
    if(Parse.User.current()){
      Parse.User.logOut();
      $("#login").text("Log In");
    } else {
      authDialog.dialog("open");
    }
  })
  //add event button listener
  $("#addEvent").on('click',function(event){
    //open the dialog
    event.preventDefault();
    var currentUser = Parse.User.current();
    //authDialog.dialog("open");
    if(currentUser){
      addEventDialog.dialog("open");
    } else {
      alert("Please log in first");
    }
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
  var result;
    Parse.User.logIn(username, password, {
      success: function(user){
        //alert("Login Successful");
        authDialog.dialog('close');
        $("#user").val(''); $("#pass").val('');
        $("#login").text("Log Out");
        result= true;
      },
      error: function(user, error){
        $("#authentication").effect("shake", 500);
        //alert("Login failed, Try Again");

        result = false;
      }
    });
    return result;
}


function addEventJs(event){
  //instantiate
  var CalendarClass = Parse.Object.extend("Calendar");
  var eventObject = new CalendarClass();
  if(validateTimeFormat($("#eventStartTime").val()) !== true){
    alert("Your event start time isn't in the right format!");
    return false;
  }
  else if(validateTimeFormat($("#eventEndTime").val()) !== true){
    alert("Your event end time isn't in the right format!");
    return false;
  } else {
    //add the object
    eventObject.set("title", $("#eventTitle").val());
    eventObject.set("start", $("#eventStart").val() + "T" + $("#eventStartTime").val());
    eventObject.set("end", $("#eventEnd").val() + "T" + $("#eventEndTime").val());
    eventObject.set("color", "#" + $("#eventColor").val());
    eventObject.set("editable", true);

    //save the object to the server
    eventObject.save(null, {
      success: function(eventObject){
        console.log("Event successfully added!");
        console.log("Event Object:");
        console.log(eventObject);
        loadCalendarJS();
      },
      error: function(eventObject, error){
        console.log("Failed to add event!");
        console.log("Error: " + error.message);
      }
    });

    return true;
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
      events = results;
      var tempList = [];
      for(var youTheShitz = 0; youTheShitz < results.length; youTheShitz++){
        tempList.push(results[youTheShitz].attributes);
      }
      $("#calendar").fullCalendar('destroy');
      $("#calendar").fullCalendar({
        theme: true,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        events: tempList
      });
    },
    error: function(error){
      console.log("This is what went wrong: " + error.message);
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
