$(document).ready(function() {
	$('#message_container a.close').live("click", function() {
		Utils.removeMessage();
	});
});