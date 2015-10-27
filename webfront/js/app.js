$(document).ready(function(){
	
	$('#history-panel').hide();
	
	$('#signal-light').popover({title: "Real-time Status", trigger:"hover", animation: true, delay: {hide: 200}});
	$('#array1').popover({title: "Array1 Real-time Status", content: "Good.", trigger: "focus", animation: true, placement: "top"});
	$('#array2').popover({title: "Array2 Real-time Status", content: "Good.", trigger: "focus", animation: true, placement: "top"});
	$('#array3').popover({title:"Array3 Real-Time Status", html: true, trigger: "focus", animation: true, placement: "top"});
	$('#array4').popover({title: "Array4 Real-time Status", content: "Good.", trigger: "focus", animation: true, placement: "top"});
	$('#array5').popover({title: "Array5 Real-time Status", content: "Good.", trigger: "focus", animation: true, placement: "top"});
	$('#array6').popover({title: "Array6 Real-time Status", content: "Good.", trigger: "focus", animation: true, placement: "top"});
	
	var test1_json_text = '{"arrays":[\
		{"id":"array1", "state":"ok", "info":"Normally work."}, \
		{"id":"array2", "state":"ok", "info":"Normally work."},\
		{"id":"array3", "state":"error", "info":"Memory leaks.<br>   Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br>  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"},\
		{"id":"array4", "state":"ok", "info":"Normally work."},\
		{"id":"array5", "state":"ok", "info":"Normally work."},\
		{"id":"array6", "state":"ok", "info":"Normally work."}\
		],\
		"overall_state":"error",\
		"overall_info":"Array3 has an error. Memory leaks."}';
		test1_obj = JSON.parse(test1_json_text);
		var test1_overall_state=test1_obj.overall_state;
		var test1_overall_info=test1_obj.overall_info;
		var test1_arrays=test1_obj.arrays;
		
	var test2_json_text = '{"arrays":[\
		{"id":"array1", "state":"ok", "info":"Normally work."}, \
		{"id":"array2", "state":"ok", "info":"Normally work."},\
		{"id":"array3", "state":"ok", "info":"Normally work."},\
		{"id":"array4", "state":"ok", "info":"Normally work."},\
		{"id":"array5", "state":"ok", "info":"Normally work."},\
		{"id":"array6", "state":"ok", "info":"Normally work."}\
		],\
		"overall_state":"ok",\
		"overall_info":"Good. All arrays are working well."}';
		test2_obj = JSON.parse(test2_json_text);
		var test2_overall_state=test2_obj.overall_state;
		var test2_overall_info=test2_obj.overall_info;
		
	$('.controller').click(function(){
		
//		$.getJSON('arrays.json', function(obj){
//			overall_state = obj.overall_state;
//			overall_info = obj.overall_info;
//			arrays = obj.arrays;
//		}).success(function() { alert("success"); })
//        .error(function(jqXHR, textStatus, errorThrown) { // Debug the error!!
//            console.log("error " + textStatus);
//            console.log("error throw " + errorThrown);
//            console.log("incoming Text " + jqXHR.responseText);
//        }) // End of .error
//        .complete(function() { alert("complete"); });
		
			
		if(test1_overall_state == "error"){
			$('#signal-light img').attr('src', '../img/Red.png');
			$('#row-arrays').removeClass('success');
			$('#row-arrays').addClass('danger');
			$('#signal-light').attr('data-content', test1_overall_info);
		}
		
		
		for(var i=0, len=test1_arrays.length; i<len; i++){
			var array_id = test1_arrays[i].id;
			var array_state = test1_arrays[i].state;
			var array_info = test1_arrays[i].info;
			if (array_state == "error"){
				$('#'+array_id).removeClass('btn-success');
				$('#'+array_id).addClass('btn-danger');
				var info = "<table class='table table-striped'>\
								<thead>\
							  	 	<tr>\
							  	 		<th>Type</th>\
							  	 		<th>Content</th>\
							  	 	</tr>\
							  	 </thead>\
							  	 <tbody>";
				var messages=array_info.split("<br>");
				
				for(var i=0, len=messages.length; i<len; i++){
					var row = "<tr>\
								 <td>Critical</td>\
							     <td>"+messages[i]+"</td>\
							   </tr>";
					info += row;
				}
				info += "</tbody></table>";
				
				$('#'+array_id).attr('data-content', "<button class='btn btn-success' onclick='clear_danger("+'"'+array_id+'","'+test2_overall_state+'","'+test2_overall_info+'"'+")'> Clear </button> <br>"+info);
			}
		}
	});

	
	
	$("#add-button").click(function(){
        $("#add-array").modal();
        $("#add-confirm").click(function(){
        	var array_name = $('#array-name').val();
        	if (array_name != ""){
        		$("#first-col").after("<td><button type='button' class='btn btn-success' id='"+array_name+"'>"+array_name+"</button></td>");
        	}
        	$('#array-name').val("");
        }); 	
    });
	
	$('#show-history').click(function(){
		$('#real-time-panel').toggle(300);
		$('#history-panel').toggle(300);	
	});
});

function clear_danger(array_id, overall_state, overall_info){
	$('#'+array_id).removeClass('btn-danger');
	$('#'+array_id).addClass('btn-success');
	$('#'+array_id).attr('data-content', "Normally work.");
	if (overall_state == 'ok'){
		$('#signal-light img').attr('src', '../img/Green.png');
		$('#row-arrays').removeClass('danger');
		$('#row-arrays').addClass('success');
		$('#signal-light').attr('data-content', overall_info);
	}
};

function del(array_id){
	$('#'+array_id).remove();
};