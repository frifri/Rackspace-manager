$(document).ready(function() {
	$("#test").click(function() {
		Rackspace.Auth.getToken();
	});
});