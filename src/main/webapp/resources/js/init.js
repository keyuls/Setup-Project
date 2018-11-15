(function($){
  $(function(){

	$( document ).ready(function() {
		  $(".dropdown-button").dropdown({
		      hover: false //  on hover
		    }
		  );
		  
		  $('.tabs').tabs();
		  $('#modal2').modal();
		  $('select').material_select();
		  $("label").markRegExp(/([@]|[#])([a-z])\w+/gmi);
		 		  
	});	  
	
	  
  $(function() {
	  if($.fn.cloudinary_fileupload !== undefined) {
	    $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload()
	    .on("cloudinarydone", function (e, data) {	  
	  	  	$( "input[name='profilePicture']" ).attr('value',data.result.secure_url);
	    	//console.log(data.result.secure_url);
	    })
	  }
	});	  

  $('.cloudinary-fileupload').bind('cloudinarydone', function(e, data) {
	  $('.preview').html(
	    $.cloudinary.image(data.result.public_id,
	      { format: data.result.format, version: data.result.version,
	        crop: 'fill', width: 120, height: 120 })
	  );
	  $('.preview').children('img').addClass('circle');
	  $('.preview').parent().children('#profilePicture').css('display','none');
	  $('.preview').parent().children('span').css('display','none');
	  $('.preview').parent().children('img').css('border','1px dashed #796eff');
	  $('.image_public_id').val(data.result.public_id);
	  return true;
	});


  $('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15, // Creates a dropdown of 15 years to control year,
	    today: 'Today',
	    clear: 'Clear',
	    close: 'Ok',
	    closeOnSelect: false, // Close upon selecting a date,
	    format:'dd-mm-yyyy',	
});
  
var $input = $('.datepicker').pickadate();
var picker = $input.pickadate('picker');

$('.alert').append('<button class="waves-effect btn-flat close"><i class="material-icons">close</i></button>');

$('body').on('click', '.alert .close', function() {
    $(this).parent().fadeOut(300, function() {
        $(this).remove();
    });
});



 $('.button-collapse').sideNav({
    	draggable: true,
    	onOpen: function(el) { $('#slide-out').css({'background-color': '#f1f1f1',
    												'top':'0',
    												'width':'200px',
    												'height': '600px',
    												'overflow':'scroll'
    												}); 
    						}
    });
   
 	var selected = 0;     
    $('.follow-btn').click(function(event){
    	var subCategoryId = $(this).parent().attr('id');
    	var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        var myContextPath = $(this).attr('myContextPath');
        var status = true;
        if($(this).hasClass('Following')){
        	status = false;
        	$(this).html('Follow');
            $(this).removeClass('Following');
            $(this).addClass('Not-Following');
			selected=selected-20;
            updateProgress(selected,false);
            
        }else{
            $(this).addClass('btn-flat');
            $(this).html('Following');
            $(this).addClass('Following');
            $(this).removeClass('Not-Following');
            selected=selected+20;
			updateProgress(selected,true);

        }
    	$.ajax({
    			type:"GET",
    			url : myContextPath+"/user/followtopic/"+subCategoryId+"/"+status,
    			//crossDomain: true,
    			/*beforeSend: function(xhr) {
    			    xhr.setRequestHeader(header, token);
    			},*/
    			success:function(response){
    				//console.log("Follow Topic SUCCESS: ", response);    				
    				if(response=="false"){
    					status = false;
    		        	$(this).html('Follow');
    		            $(this).removeClass('Following');
    		            $(this).addClass('Not-Following');
    					askForLogin();

    				}  					
    			},
    			error:function(e){
    				//console.log("Follow Topic ERROR: ", e);
    			}
    	});
    });
        
    
    $('#continue').click(function(event){
    	selected=0;
    });
    
    
    function updateProgress(selected,isFollow){
    	//console.log(selected);
    	$('#progressbar').css("width", selected.toString()+"%");
    		var totaltopic= selected/20;
    		if(selected>=100){
    			$('#continue').text('Continue');
    			$('#continue').removeClass( "disabled" );
    			$('#continue').css('color','#fff');
    			$('#continue').css('background','#796eff');
    		}
    		else{
    			$('#continue').text( 'Follow '+(5-totaltopic).toString()+' more subjects');
    			$('#continue').addClass( "disabled" );
    		}
    };
    
    
    $('.upvote-btn').click(function(event){
    	var productId = $(this).parent().attr('id');
    	var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        var myContextPath = $(this).attr('myContextPath');
        var status = true;
        if($(this).hasClass('Upvoted')){
        	status = false;
            $(this).removeClass('Upvoted');
            $(this).addClass('Not-Upvoted');
        	$(this).addClass('custom-text');
        	$(this).children('.upvote-1').css('display','none');
        	$(this).children('.upvote').show();

        }
        else{            
        	$(this).addClass('Upvoted');
        	$(this).removeClass('Not-Upvoted');
        	$(this).removeClass('custom-text');
        	$(this).children('.upvote').css('display','none');
        	$(this).children('.upvote-1').show();
        }
    	$.ajax({
    			type:"GET",
    			url : myContextPath+"/user/upvote/"+productId+"/"+status,
    			//crossDomain: true,
    			success:function(response){
    				//console.log("Upvote SUCCESS: ", response);
    				if(response=="false"){
    		        	status = false;
	    	            $(this).removeClass('Upvoted');
	    	            $(this).addClass('Not-Upvoted');
	    	        	$(this).addClass('custom-text');
	    	        	$(this).children('.upvote-1').css('display','none');
	    	        	$(this).children('.upvote').show();
	    					
    					askForLogin();
    				}
    			},
    			error:function(e){
    				//console.log("Upvote ERROR: ", e);
    			}
    	});
    });

    

    
    $('.bookmark-btn').click(function(event){
    	var productId = $(this).parent().attr('id');
    	var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        var myContextPath = $(this).attr('myContextPath');
        var status = true;
        if($(this).hasClass('Bookmarked')){
        	status = false;
            $(this).removeClass('Bookmarked');
            $(this).addClass('Not-Bookmarked');
        	$(this).addClass('custom-text');
        }
        else{            

        	$(this).addClass('Bookmarked');
        	$(this).removeClass('Not-Bookmarked');
        	$(this).removeClass('custom-text');
        }
    	$.ajax({
    			type:"GET",
    			url : myContextPath+"/user/bookmark/"+productId+"/"+status,
    			//crossDomain: true,
    			success:function(response){
    				//console.log("Bookmark SUCCESS: ", response); 
    				if(response=="false"){
    					status = false;
    	            	$(this).removeClass('Bookmarked');
    	            	$(this).addClass('Not-Bookmarked');
    	            	$(this).addClass('custom-text');
    					askForLogin();
    				}
    			},
    			error:function(e){
    				//console.log("Bookmarked ERROR: ", e);
    			}
    	});
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space


$('.user-follow-btn').click(function(event){
	var userId = $(this).parent().attr('id');
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    var myContextPath = $(this).attr('myContextPath');
    var status = true;
    if($(this).hasClass('Following')){
    	status = false;
    	$(this).html('Follow');
        $(this).removeClass('Following');
        $(this).addClass('Not-Following');
        
    }else{
        $(this).addClass('btn-flat');
        $(this).html('Following');
        $(this).addClass('Following');
        $(this).removeClass('Not-Following');
    }
	$.ajax({
			type:"GET",
			url : myContextPath+"/user/followuser/"+userId+"/"+status,
			//crossDomain: true,
			/*beforeSend: function(xhr) {
			    xhr.setRequestHeader(header, token);
			},*/
			success:function(response){
				//console.log("Follow User SUCCESS: ", response);    				
				if(response=="false"){
			    	status = false;
			    	$(this).html('Follow');
			        $(this).removeClass('Following');
			        $(this).addClass('Not-Following');					
					askForLogin();					

				}
			},
			error:function(e){
				//console.log("Follow User ERROR: ", e);
			}
	});
});




$(".comment-area").on("submit","#commentForm", function(){
//$("#commentForm").submit(function(event) {
	
	event.preventDefault();
	var current = $(this);
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
	var myContextPath = $(this).attr('myContextPath');
	var parentid=$(this).attr('parentId');
	var formData = {
    		description : $(this).find('#newcomment').val(),
    		productId :  $(this).attr('productId'),
    		parentId:$(this).attr('parentId')
    }
	$(this).find('#newcomment').val("");
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url :  myContextPath+ "/comment/save",
		data : JSON.stringify(formData),
		dataType : 'json',
		beforeSend: function(xhr) {
		    xhr.setRequestHeader(header, token);
		},
		success : function(result) { 
			if(parentid!="null" )
				current.css('display', 'none');
			
			var userpicture= ((result.profilePicture).length>0 ?
									'<img src='+'\"'+result.profilePicture+'\"'+'alt="" class="circle responsive-img" style="margin-left: -14px;width: 42px; height:42px; border:2px solid #796eff;">' 
								: '<span id="profileImage" style="height:42px;width:42px; border:2px solid #fff;margin-left: -14px; margin-top:0px; line-height: 36px;color: #fff;font-size: 14px;background: #796eff;margin-bottom: 7px;">'+ result.firstName.charAt(0) +result.laststName.charAt(0)   +'</span>'
			);      								

			var newcomment='<div class="col s12 m12 l12">'+
				 '<div class="col s12 m12 l12">'+
					 '<div style="margin-left:10px; width:50px;float:left;">'+
						'<a href='+'\"'+myContextPath+'/profile/'+result.userName+'\"'+'>'+ 
								userpicture +
							'</a>'+							 
					 '</div>'+
					'<div style="float:left;font-size:16px;">'+
 						'<a class="custom-text" href='+'\"'+myContextPath+'/profile/'+result.userName+'\"'+'>'+
 							result.firstName+ ' ' + result.lastName+
						'</a>'+
					'</div> '+				 
				 '</div>'+
				 '<div class="col s12 m12 l12">'+
		 			'<p style="text-align:  justify;">'+result.description+'</p>'+
		 		'</div>';			
		 	
			if(result.parentId==0)
				$(".allcomments").append('<div class="row parentcomment'+result.commentId+'\"'+'style="background:#fff;border-radius:8px; padding-top:15px;">'+newcomment+'<a href="#" class="custom-text reply" style="text-decoration:underline" commentid='+'\"'+result.commentId+'\"'+'myContextPath='+'\"'+myContextPath+'\"' +'productId='+'\"'+result.productId+'\"' +'><p class="">Reply</p></a>'+
				 		'</div></div>'+'</div>');
			else{
				var parentclass= '.parentcomment'+result.parentId;
				$(".allcomments").find(parentclass).append('<div class="row"><div class="col s11 m11 l11 offset-s1 offset-m1 offset-l1"style="border-left: 2px #eee solid;">'+newcomment+'<a href="#" class="custom-text reply" style="text-decoration:underline" commentid='+'\"'+result.parentId+'\"'+'myContextPath='+'\"'+myContextPath+'\"' +'productId='+'\"'+result.productId+'\"' +'><p class="">Reply</p></a>'+
				 	'</div>'+'</div>'+'</div></div>');
			}
				
			//console.log(result);
		},
		error : function(e) {			
			//console.log("ERROR: ", e);
			askForLogin();	
		}
	});
});



$(".allcomments").on("click",".reply", function(){
	event.preventDefault();
	if($(this).next().has('form#commentForm').length==0)
		$(this).after('<div class="col s12 m12 l12"> <form class="col s12" id="commentForm" productId='+'\"'+$(this).attr('productId')+'\"'+ 'parentId='+'\"'+$(this).attr('commentid') +'\"' +'myContextPath='+'\"'+$(this).attr('myContextPath')+'\"'+'> <div class="row"><div class="input-field col s12"><textarea id="newcomment" class="materialize-textarea" style="border: 1px solid #9e9e9e;background:#eee;" required></textarea></div><div class="input-field col s6 right" ><button class="btn btn-lg btn-primary btn-block right" type="submit">Post</button></div></div></form></div>');
		

});


/*submit task*/
$(".new-task-add").on("submit","#taskForm", function(){
		
		event.preventDefault();
		var current = $(this);
		var token = $("meta[name='_csrf']").attr("content");
	    var header = $("meta[name='_csrf_header']").attr("content");
		var myContextPath = $(this).attr('myContextPath');
		var parentid=$(this).attr('parentId');
		var formData = {
	    		description : $(this).find('#newtask').val(),
	    		parentId:$(this).attr('parentId')
	    }
		$(this).find('#newtask').val("");
		
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url :  myContextPath+ "/learner/save",
			data : JSON.stringify(formData),
			dataType : 'json',
			beforeSend: function(xhr) {
			    xhr.setRequestHeader(header, token);
			},
			success : function(result) { 
     								
				var newtask=
					'<p>'+
				    	'<input type="checkbox" id="'+result.taskId+'" class="filled-in"  myContextPath='+ '\"'+myContextPath+'\"' + '/>' +
						'<label for="'+result.taskId+'">'+ result.description+'</label>'+					    
				    '</p>';			
			 		$(".mytasklist").prepend(newtask);
			 		$("label").markRegExp(/([@]|[#])([a-z])\w+/gmi);
			 		if ($('.mytasklist').find('#no-task').length) {
			 			$("#no-task").remove(); 
			 		}
					
			},
			error : function(e) {			
				askForLogin();	
			}
		});
	});



$('.mytasklist').on('change','input[type=checkbox]',function() {
	var myContextPath = $(this).attr('myContextPath');
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    var isFinish = false;
	if($(this).is(":checked")) 
		isFinish = true;
	
	var formData = {
    		taskId:$(this).attr('id'),
    		status: isFinish
    }	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url :  myContextPath+ "/learner/checkupdate",
		data : JSON.stringify(formData),
		dataType : 'json',
		beforeSend: function(xhr) {
		    xhr.setRequestHeader(header, token);
		},
		success : function(result) {			
 			//console.log('checked');									
		},
		error : function(e) {			
			askForLogin();
			console.log(e);
		}
	});
});



$("#progress-select").on('change', function() {
	var myContextPath = $(this).attr('myContextPath');
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    var progressId = this.value;
	
	var progressData = {
    		productId:$(this).attr('productId'),
    		progressId:progressId 
    }	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url :  myContextPath+ "/user/updateprogress",
		data : JSON.stringify(progressData),
		dataType : 'json',
		beforeSend: function(xhr) {
		    xhr.setRequestHeader(header, token);
		},
		success : function(result) {			
 			//console.log('checked');									
		},
		error : function(e) {			
			askForLogin();
			console.log(e);
		}
	});	   
});

/*Open collection list pop up*/
$('.open-collection-btn').on('click',function(event){
	var isUser = $( '#collection-modal').attr('isuser');
	if(typeof isUser == typeof undefined || isUser == "false"){
		askForLogin();
	}
	else{
		
		$('.create-collection').hide();
		$('.collection-list').show();
		var productId= $(this).attr('productId');
		var myContextPath = $(this).attr('myContextPath');
		var token = $("meta[name='_csrf']").attr("content");
	    var header = $("meta[name='_csrf_header']").attr("content");    
	    var dataObj={
	    	productId:productId
	    }
	    
		$('.modal').modal();
		$('#collection-modal').attr('productId',productId);
		
		$("#collection-modal .add-collection-btn").each(function(i){
	        $(this).removeClass('Following');
			$(this).addClass('Not-Following');
			$(this).find('.material-icons').text("playlist_add");
	        $(this).attr('data-tooltip','Add to collection');
	
		});
			
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url :  myContextPath+ "/course/coursecollectionList",
			data : JSON.stringify(dataObj),
			dataType : 'json',
			beforeSend: function(xhr) {
			    xhr.setRequestHeader(header, token);
			},
			success : function(result) {			
				collectionIdList=result["collectionIdList"];
				$("#collection-modal .add-collection-btn").each(function(i){
					if(collectionIdList.indexOf($(this).attr("collectionId")) > -1){
						$(this).addClass('Following');
						$(this).find('.material-icons').text("playlist_add_check");
				        $(this).removeClass('Not-Following');
				        $(this).attr('data-tooltip','Added to collection');
					}
				});
				
			},
			error : function(e) {			
				//askForLogin();
				console.log(e);
			}
		});
		
		$('#collection-modal').modal('open');
	
	}
});

$('.new-collection-btn').click(function(event){
	var isUser = $( '#collection-modal').attr('isuser');
	if(typeof isUser == typeof undefined || isUser == "false"){
		askForLogin();
	}else{
		$(".create-collection").show();
		$(".collection-list").hide();
		$('.modal').modal();
		$('#collection-modal').modal('open');
	}
});


/*Get data for create collection*/
$(".create-collection").on("submit","#createcollection", function(){
	event.preventDefault();
	var myContextPath = $(this).attr('myContextPath');
	var dataArray  = $(this).serializeArray();
    dataObj = {};

    $(dataArray).each(function(i, field){
    	//console.log()
      dataObj[field.name] = field.value;
    });
    dataObj["productId"] = $('#collection-modal').attr('productId');
    
	
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
		
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url :  myContextPath+ "/course/createcollection",
		data : JSON.stringify(dataObj),
		dataType : 'json',
		beforeSend: function(xhr) {
		    xhr.setRequestHeader(header, token);
		},
		success : function(result) {			
 			//console.log('checked');
			 $('.modal').modal('close');
			 Materialize.toast('New collection created successfully.', 2000);
		},
		error : function(e) {			
			askForLogin();
			console.log(e);
		}
	});
	
});


/*course add or removed from collection*/
$('.add-collection-btn').click(function(event){
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
	var myContextPath = $(this).attr('myContextPath');
	var collectionid=$(this).attr('collectionId');
	var productId = $('#collection-modal').attr('productId');
	var status = true;
    if($(this).hasClass('Following')){
    	status = false;
    	$(this).find('.material-icons').text("playlist_add");
        $(this).removeClass('Following');
        $(this).addClass('Not-Following');
        $(this).attr('data-tooltip','Add to collection');
        
    }else{
        $(this).addClass('btn-flat');
        $(this).find('.material-icons').text("playlist_add_check");
        $(this).addClass('Following');
        $(this).removeClass('Not-Following');
        $(this).attr('data-tooltip','Added to collection');
    }
	
	var data = {
			collectionId: collectionid,
			productId: productId,
			status: status
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url :  myContextPath+ "/course/updatecoursecollection",
		data : JSON.stringify(data),
		dataType : 'json',
		beforeSend: function(xhr) {
		    xhr.setRequestHeader(header, token);
		},
		success : function(result) {
			
		},
		error : function(e) {			
			askForLogin();
			console.log(e);
		}
	});	
	
});


/*User follow collection*/
$('.follow-collection-btn').click(function(event){
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
	var myContextPath = $(this).attr('myContextPath');
	var collectionid=$(this).attr('collectionId');
    var status = true;
    if($(this).hasClass('Following')){
    	status = false;
    	$(this).html('Follow');
        $(this).removeClass('Following');
        $(this).addClass('Not-Following');
        
    }else{
        $(this).addClass('btn-flat');
        $(this).html('Following');
        $(this).addClass('Following');
        $(this).removeClass('Not-Following');
    }	
	
	var data = {
			collectionId: collectionid,
			status: status
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url :  myContextPath+ "/user/followcollection",
		data : JSON.stringify(data),
		dataType : 'json',
		beforeSend: function(xhr) {
		    xhr.setRequestHeader(header, token);
		},
		success : function(result) {
			
		},
		error : function(e) {			
			askForLogin();
			console.log(e);
		}
	});	
	
});

$('.emailsetting').on('change','input[type=radio]',function() {
	var myContextPath = $('.emailsetting').parent().attr('myContextPath');
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
	var formData = {
    		settingType:this.name,
    		settingId: this.value,
    		userId : $('.emailsetting').parent().attr('userId')
    }	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url :  myContextPath+ "/emailsetting/updateoption",
		data : JSON.stringify(formData),
		dataType : 'json',
		beforeSend: function(xhr) {
		    xhr.setRequestHeader(header, token);
		},
		success : function(result) {			
			 Materialize.toast('Your settings are updated successfully.', 2000);
		},
		error : function(e) {			
			askForLogin();
			console.log(e);
		}
	});
});

//ref: https://stackoverflow.com/questions/1987524/turn-a-number-into-star-rating-display-using-jquery-and-css
$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

$(function() {
    $('span.stars').stars();
});

function askForLogin(){
	$('.modal').modal();
	 $('#modal1').modal('open');
};

/*copy from textbox. Ref: https://codepen.io/shaikmaqsood/pen/XmydxJ/ */ 
function copyToClipboard(element) {
	  var $temp = $("<input>");
	  $("body").append($temp);
	  $temp.val($(element).val()).select();
	  document.execCommand("copy");
	  $temp.remove();
	}
