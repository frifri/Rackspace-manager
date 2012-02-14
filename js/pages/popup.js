$(document).ready(function() {
	if(localStorage['username'] != null && localStorage['apikey'] != null) {

		// Check if the current token is still valid
		if(!Rackspace.Auth.isTokenValid())
			Rackspace.Auth.getToken();
		
		// Retrieve the server list
		Rackspace.Servers.getDetailedList(false, function(data) {
			var servers = data.servers,
				arServerList = new Array();

			// For each server
			$.each(servers, function(key, server) {
				var srvName = server.name,
					srvStatus = server.status,
					srvPubIp = "",
					srvPrvIp = "";
                                    
				$.each(server.addresses.public, function(ipKey, pubIp) {
					srvPubIp = srvPubIp + pubIp + " ";
				});

				$.each(server.addresses.private, function(ipKey, prvIp) {
					srvPrvIp = srvPrvIp + prvIp + " ";
				});

				arServerList[key] = [srvName, srvStatus, srvPubIp, srvPrvIp];
			});

			$('#srvTable').dataTable({
				"aaData": arServerList,
				"aoColumns": [
					{"sTitle": "Name"},
					{"sTitle": "Status"},
					{"sTitle": "Public IP(s)"},
					{"sTitle": "Private IP(s)"}
				],
				"sDom": "<'row'<'span5'l><'span6'f>r>t<'row'<'span5'i><'span6'p>>",
				"sPaginationType": "bootstrap"
			});
		});
	} else
		Utils.writeMessage("You will have to enter a username and an API key in order to use this extension.", "warning");
});