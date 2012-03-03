$(document).ready(function() {
	if(localStorage['username'] != null && localStorage['apikey'] != null) {

		// Check if the current token is still valid
		if(!Rackspace.Auth.isTokenValid())
			Rackspace.Auth.getToken();
		
		// Retrieve the images list
		Rackspace.Servers.Flavors.getDetailedList(false, function() {
			$('#flvTable').dataTable({
				"aaData": Rackspace.Servers.Flavors.minFlvList,
				"aoColumns": [
					{"sTitle": "ID"},
					{"sTitle": "Name"},
					{"sTitle": "Ram"},
					{"sTitle": "Disk space"}
				],
				"sDom": "<'row'<'span5'l><'span5'f>r>t<'row'<'span5'i><'span5'p>>",
				"sPaginationType": "bootstrap"
			});
		});

	} else
		Utils.writeMessage("You will have to enter a username and an API key in order to use this extension.", "warning");
});