Utils = {
	// Write a message on the top the page
	writeMessage: function(strMessage, strType) {
		var alertType = "alert-" + strType; 
		var target = $('#message_container');
		target
			.addClass('alert')
			.addClass(alertType)
			.html("<a class='close' href='#'>&times;</a><p>" + strMessage + "</p>");
	},

	removeMessage: function(){
		var target = $('#message_container');
		target
			.removeClass(target.attr('class'))
			.addClass('span5')
			.html("");
	}
}