Utils = {
	// Write a message on the top the page
	writeMessage: function(strMessage, strType) {
		var target = $('#message_container');
		target.addClass('alert-message');
		target.addClass(strType);
		target.html("<a class='close' href='#'>x</a><p>" + strMessage + "</p>");
	},

	removeMessage: function(){
		var target = $('#message_container');
		target.removeClass('alert-message');
		target.removeClass(target.attr('class'));
		target.html("");
	}
}