$(document).ready(function() {
	// Loading the auth values
	$('.content #settings_container input#username').val(localStorage['username']);
	$('.content #settings_container input#apikey').val(localStorage['apikey']);
	// ------------------------

	$('.content a h2').click(function() {
		Rackspace.Auth.getToken();
		Rackspace.Server.getDetailedList(false, function(data) {
			var servers = data.servers;
			var arServerList = new Array();

			$.each(servers, function(key, server) {
				var srvName = server.name;
				var srvStatus = server.status;

				var srvPubIp = "";
				$.each(server.addresses.public, function(ipKey, pubIp) {
					srvPubIp = srvPubIp + pubIp + " ";
				});

				var srvPrvIp = "";
				$.each(server.addresses.public, function(ipKey, prvIp) {
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
				]
			});
		});
	});
	
	// Saving settings
	$('.content #settings_container img#creds_validate').click(function() {
		var username = $('.content #settings_container input#username').val();
		var apikey = $('.content #settings_container input#apikey').val();

		if(username != '' && apikey != '') {
			localStorage['username'] = username;
			localStorage['apikey'] = apikey;
		} else {
			console.log("an empty input... Boloss!")
		}
	});
});