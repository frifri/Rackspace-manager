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
			// https://auth.api.rackspacecloud.com/v1.1/auth
			var strUrl = "https://auth.api.rackspacecloud.com/" + Rackspace.Auth.authVersion + "/auth";
			
			Rackspace._request(jsonObject, strUrl, "POST", false, function(data) {
				Rackspace.token = data.auth.token.id;
				Rackspace.Server.public_url = data.auth.serviceCatalog['cloudServers'][0].publicURL;
			});
		}
	},
	
	Server: {
		// Dynamic url returned by Rackspace
		public_url : "",
		
		// Getting the server list (simple)
		getList: function(bAsync, rtrnVal) {
			var strUrl = Rackspace.Server.public_url + "/servers";
			
			Rackspace._request(null, strUrl, "GET", bAsync, function(data) {
				rtrnVal(data);
			});
		},
	
		// Getting the server list (with details)
		getDetailedList: function(bAsync, rtrnVal) {
			var strUrl = Rackspace.Server.public_url + "/servers/detail";
			
			Rackspace._request(null, strUrl, "GET", bAsync, function(data) {

				var test = {
				    "servers" : [
				        {
				            "id" : 1234,
				            "name" : "sample-server",
				            "imageId" : 1,
				            "flavorId" : 1,
				            "hostId" : "e4d909c290d0fb1ca068ffaddf22cbd0",
				            "status" : "BUILD",
				            "progress" : 60,
				            "addresses" : {
				                "public" : [
				                    "67.23.10.132",
				                    "67.23.10.131"
				                ],
				                "private" : [
				                    "10.176.42.16"
				                ]
				            },
				            "metadata" : {
				                "Server Label" : "Web Head 1",
				                "Image Version" : "2.1"
				            }
				        },
				        {
					        "id" : 5678,
				            "name" : "sample-server2",
				            "imageId" : 1,
				            "flavorId" : 1,
				            "hostId" : "9e107d9d372bb6826bd81d3542a419d6",
				            "status" : "ACTIVE",
				            "addresses" : {
				                "public" : [
				                    "67.23.10.133"
				                ],
				                "private" : [
				                    "10.176.42.17"
				                ] 
				            },
				            "metadata" : {
				                "Server Label" : "DB 1"
				            }
				        },
				        {
				            "id" : 1234,
				            "name" : "sample-server",
				            "imageId" : 1,
				            "flavorId" : 1,
				            "hostId" : "e4d909c290d0fb1ca068ffaddf22cbd0",
				            "status" : "BUILD",
				            "progress" : 60,
				            "addresses" : {
				                "public" : [
				                    "67.23.10.132",
				                    "67.23.10.131"
				                ],
				                "private" : [
				                    "10.176.42.16"
				                ]
				            },
				            "metadata" : {
				                "Server Label" : "Web Head 1",
				                "Image Version" : "2.1"
				            }
				        },
				        {
				            "id" : 1234,
				            "name" : "sample-server",
				            "imageId" : 1,
				            "flavorId" : 1,
				            "hostId" : "e4d909c290d0fb1ca068ffaddf22cbd0",
				            "status" : "BUILD",
				            "progress" : 60,
				            "addresses" : {
				                "public" : [
				                    "67.23.10.132",
				                    "67.23.10.131"
				                ],
				                "private" : [
				                    "10.176.42.16"
				                ]
				            },
				            "metadata" : {
				                "Server Label" : "Web Head 1",
				                "Image Version" : "2.1"
				            }
				        },
				    ] 
				}

				rtrnVal(test);
			});
		}
	},

	// REST request
	_request: function(jsonObject, strUrl, reqType, bAsync, rtrnVal) {
		// The json MUST be stringify in order to send it to Rackspace
		if(jsonObject)
			var strData = JSON.stringify(jsonObject);
		else 	// If the object is empty.
			var strData = null;
        
        $.ajax({
            url: strUrl,
            type: reqType,
            dataType: "json",
            contentType: "application/json",
			async: bAsync,
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