

$(document).ready(function(){
  console.log(jQuery.ui);

  $("#calendar").fullCalendar({
    header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
    editable: true,
    events: [{
      title : "test",
      start : "2014-7-9",
      end   : "2014-7-14"
    }]
  });
});
