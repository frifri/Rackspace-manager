/*
 * Rackspace Manager
 *
 * Created by Francis Genet on 2012-01-29.
 * Copyright (c) 2012 Francis Genet. All rights reserved.
 *
 */

Rackspace = {
	// Version of the current Rackspace auth API
	authVersion : "1.1",
	// Version of the current Rackspace API
	apiversion : "1.0",
	// The main API url (should not change)
	baseApiUrl : "api.rackspacecloud.com/",

	Auth: {
		getToken: function() {
			var jsonObject = {
				"credentials": {
					"username": localStorage['username'],
					"key": localStorage['apikey']
				}
			};
			
			// building the url
			// https://auth.api.rackspacecloud.com/auth
			var strUrl = "https://auth." + baseApiUrl + authVersion + "/auth";
			
			Rackspace._request(jsonObject, strUrl, "POST", function(data) {
				console.log(data);
			});
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