/*
 * Rackspace Manager
 *
 * Created by Francis Genet on 2012-01-29.
 * Copyright (c) 2012 Francis Genet. All rights reserved.
 *
 */

Rackspace = {
	// Auth Token
	token : "",

	Auth: {
		// Version of the current Rackspace auth API
		authVersion : "v1.1",
	
		getToken: function() {
			var jsonObject = {
				"credentials": {
					"username": localStorage['username'],
					"key": localStorage['apikey']
				}
			};
			
			// Building the url
			// https://auth.api.rackspacecloud.com/auth
			var strUrl = "https://auth.api.rackspacecloud.com/" + Rackspace.Auth.authVersion + "/auth";
			
			Rackspace._request(jsonObject, strUrl, "POST", function(data) {
				Rackspace.token = data.auth.token.id;
				Rackspace.Server.public_url = data.auth.serviceCatalog['cloudServers'][0].publicURL;
			});
		}
	},
	
	Server: {
		// Dynamic url returned by Rackspace
		public_url : "",
	
		getDetailedList: function() {
			
		}
	},

	// REST request
	_request: function(jsonObject, strUrl, reqType, rtrnVal) {
		// The json MUST be stringify in order to send it to Rackspace
		var strData = JSON.stringify(jsonObject);
        
        $.ajax({
            url: strUrl,
            type: reqType,
            dataType: "json",
            contentType: "application/json",
			async: false,
			beforeSend: function(xhr, settings) {
				if(Rackspace.token != "")
					xhr.setRequestHeader('X-Auth-Token', Rackspace.token);
			},
            data: strData,
			success: function(data) {
				rtrnVal(data);
			},
            error: function(jqXHR, status, errorThrown) {
				console.log("Error during the request : " + errorThrown + " (status code " + status + ")");
            }
        });
	}
};