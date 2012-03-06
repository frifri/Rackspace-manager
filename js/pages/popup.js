$(document).ready(function() {
	if(localStorage['username'] != null && localStorage['apikey'] != null) {

		// Check if the current token is still valid
		if(!Rackspace.Auth.isTokenValid())
			Rackspace.Auth.getToken();
		
		// Retrieve the server list
		Rackspace.Servers.getDetailedList(false, function() {
			$('#srvTable').dataTable({
				"aaData": Rackspace.Servers.minSrvList,
				"aoColumns": [
					{"sTitle": "ID"},
					{"sTitle": "Name"},
					{"sTitle": "Status"},
					{"sTitle": "Public IP(s)"},
					{"sTitle": "Private IP(s)"},
					{
						"sTitle": "Actions",
						"fnRender": function(o, val) {
							return "<div class='actionDiv' id='" 
								+ o.aData[0]
								+ "'><i id='srv_actions' class='icon-refresh' rel='tooltip' title='Soft reboot'></i>";
						}
					}
				],
				"sDom": "<'row'<'span5'l><'span5'f>r>t<'row'<'span5'i><'span5'p>>",
				"sPaginationType": "bootstrap"
			});
		});
		
		$('i#srv_actions.icon-refresh').tooltip();
		$(document).on('click', 'i#srv_actions.icon-refresh', function() {
			var srvId = $(this).parent().attr('id');
			Rackspace.Servers.Action.reboot('SOFT', srvId, function(data) {
				//console.log(data);
				Utils.refreshTable("server");
			});
		});
	} else
		Utils.writeMessage("You will have to enter a username and an API key in order to use this extension.", "warning");
});