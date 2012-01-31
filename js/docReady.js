$(document).ready(function() {
	// Loading the auth values
	$('#settings_form input#username').val(localStorage['username']);
	$('#settings_form input#apikey').val(localStorage['apikey']);
	// ------------------------

	$('a#testTable').click(function() {
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

			console.log(arServerList);

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
	});
	
	// Saving settings
	$('#settings_form a#settings_save').click(function() {
		var username = $('#settings_form input#username').val();
		var apikey = $('#settings_form input#apikey').val();

		if(username != '' && apikey != '') {
			localStorage['username'] = username;
			localStorage['apikey'] = apikey;
		} else {
			console.log("an empty input... Boloss!")
		}
	});
});