$(document).ready(function() {
	// Loading the auth values
	$('#settings_form input#username').val(localStorage['username']);
	$('#settings_form input#apikey').val(localStorage['apikey']);
	// ------------------------

	// Saving settings
	$(document).on("click", '#settings_form a#settings_save', function() {
		var username = $('#settings_form input#username').val(),
			apikey = $('#settings_form input#apikey').val();

		if(username != '' && apikey != '') {
			localStorage['username'] = username;
			localStorage['apikey'] = apikey;

			Utils.writeMessage("Credentials successfully saved", "success");
		} else 
			Utils.writeMessage("Please enter a username AND a password", "error");
	});
});
