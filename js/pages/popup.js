$(document).ready(function() {
	if(localStorage['username'] != null && localStorage['apikey'] != null) {
		Rackspace.Auth.getToken();
		Rackspace.Servers.getDetailedList(false, function(data) {
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
				$.each(server.addresses.private, function(ipKey, prvIp) {
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
	} else {
		Utils.writeMessage("You will have to enter a username and an API key in order to use this extension.", "warning");
	}
});