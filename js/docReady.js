$(document).ready(function() {
	$(document).on("click", '#message_container a.close', function() {
		Utils.removeMessage();
	});

	// Initialisations
	if(localStorage['username'] != null && localStorage['apikey'] != null) {
	
		// Check if the current token is still valid
		if(!Rackspace.Auth.isTokenValid())
			Rackspace.Auth.getToken();
	
		Rackspace.Servers.getDetailedList(false, function() {
			console.log("DEBUG: server list loaded");
		});
		Rackspace.Servers.Flavors.getDetailedList(false, function() {
			console.log("DEBUG: flavor list loaded");
		});
		Rackspace.Servers.Images.getDetailedList(false, function() {
			console.log("DEBUG: image list loaded");
		});
	
	}


	/*$(document).on("click", 'div.actionDiv i.icon-remove', function() {
		var itemId = $(this).parent().attr('id');

		Rackspace.Servers.Images.get(itemId, false, function(data) {
			console.log(data);
		})
	});*/
});