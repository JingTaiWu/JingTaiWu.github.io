$(document).ready(function(){
	$('a.fancybox').fancybox({
		type: "iframe"
	});
	//calendar
	//$("#calendar").fullCalendar({
	//	header: {
	//		right: 'month, basicWeek, basicDay',
	//		left: 'prev, next, today',
	//		center: 'title',
	//	},
	//	events : [
	//			{
	//				title: 'Work',
	//				start: '2014/6/30',
	//				end: '2014/7/4'
	//			}
	//		],
	//	editable: true
	//});
	
	
	//Accordion
//	$("#accordion").accordion()
//	.resizable({
//		minHeight: 260,
//		minWidth: 520,
//		grid: 50})
//	.draggable();
	$("#title").hide();
	$("#title").fadeIn(2000);
	$("hr").hide();
	$("hr").fadeIn(2000);
	$("img").hide();
	$("img").fadeIn(2000);
	$("#navigation").hide();
	$("#navigation").fadeIn(2000);
	
	
	//corner
	$(".nav li a").corner();
	$("#me").corner("50px");
	//$("#muchDoge").corner("50px");
	//change image when hover
	$( ".nav li:nth-child(1) a" ).click(function(){		
		$("#me").attr("src", "resources/me.png");
	});
	$( ".nav li:nth-child(2) a" ).click(function(){
		$("#me").attr("src", "resources/megrey.png");
	});
	$( ".nav li:nth-child(3) a" ).click(function(){
		$("#me").attr("src", "resources/meSummer.png");
	});
	$( ".nav li:nth-child(4) a" ).click(function(){
		$("#me").attr("src", "resources/meSunny.png");
	});


});