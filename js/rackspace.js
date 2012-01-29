/*
 * Rackspace Manager
 *
 * Created by Francis Genet on 2012-01-29.
 * Copyright (c) 2012 Francis Genet. All rights reserved.
 *
 */

Rackspace = {
	// Version of the Rackspace API that we are gonna use
	apiVersion : "v1.1",

	Auth: {
		getToken: function() {
			var jsonObject = {
				"credentials": {
					"username": "user",
					"key": "key"
				}
			};

			Rackspace._request(jsonObject, "auth", Rackspace.apiVersion, "auth", "POST");
		}
	},

	// REST request
	_request: function(jsonObject, srvTarget, apiVersion, srvMethod, reqType) {
		// The json MUST be stringify in order to send it to Rackspace
		var strData = JSON.stringify(jsonObject);
		var strUrl = "https://" + srvTarget + ".api.rackspacecloud.com/" + apiVersion + "/" + srvMethod;
        
        $.ajax({
            url: strUrl,
            type: reqType,
            dataType: "json",
            contentType: "application/json",
            data: strData,
            error: function(jqXHR, status, errorThrown) {
              console.log("Error during the request : " + errorThrown);
            }
        });
	}
};