$(document).ready(function() {
	// Loading the auth values
	$('.content #settings_container input#username').val(localStorage['username']);
	$('.content #settings_container input#apikey').val(localStorage['apikey']);
	// ------------------------

	$('.content a h2').click(function() {
		Rackspace.Auth.getToken();
		Rackspace.Server.getDetailedList();
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