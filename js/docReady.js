$(document).ready(function() {
	$(document).on("click", '#message_container a.close', function() {
		Utils.removeMessage();
	});
});