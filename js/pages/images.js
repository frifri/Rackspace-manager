$(document).ready(function() {
	if(localStorage['username'] != null && localStorage['apikey'] != null) {

		// Check if the current token is still valid
		if(!Rackspace.Auth.isTokenValid())
			Rackspace.Auth.getToken();
		
		// Retrieve the images list
		Rackspace.Servers.Images.getDetailedList(false, function() {
			$('#imgTable').dataTable({
				"aaData": Rackspace.Servers.Images.minImgList,
				"aoColumns": [
					{"sTitle": "ID"},
					{"sTitle": "Name"},
					{"sTitle": "Created on"},
					{"sTitle": "Updated on"},
					{"sTitle": "Status"},
					{
						"sTitle": "Actions",
						"fnRender": function(o, val) {
							return "<div class='actionDiv' id='" 
								+ o.aData[0]
								+ "'><i class='icon-remove'></i></div>";
						}
					}
				],
				"sDom": "<'row'<'span5'l><'span5'f>r>t<'row'<'span5'i><'span5'p>>",
				"sPaginationType": "bootstrap"
			});
		});

	} else
		Utils.writeMessage("You will have to enter a username and an API key in order to use this extension.", "warning");
});