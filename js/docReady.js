$(document).ready(function() {
	$(document).on("click", '#message_container a.close', function() {
		Utils.removeMessage();
	});
	/*$(document).on("click", 'div.actionDiv i.icon-remove', function() {
		var itemId = $(this).parent().attr('id');

		Rackspace.Servers.Images.get(itemId, false, function(data) {
			console.log(data);
		})
	});*/
});