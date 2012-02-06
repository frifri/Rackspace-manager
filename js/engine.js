/*
* Copyright 2012 Francis Genet.
*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/*
	This is ugly but might be useful in the future.
*/

Rest = {
	get: function(jsonObject, strUrl, bAsync, rtrnVal) {
		Rest._request(jsonObject, strUrl, "GET", bAsync, function(data) {
			rtrnVal(data);
		});
	},

	post: function(jsonObject, strUrl, bAsync, rtrnVal) {
		Rest._request(jsonObject, strUrl, "POST", bAsync, function(data) {
			rtrnVal(data);
		});
	},

	delete: function(jsonObject, strUrl, bAsync, rtrnVal) {
		Rest._request(jsonObject, strUrl, "DELETE", bAsync, function(data) {
			rtrnVal(data);
		});
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



				if(localStorage['token'] != "")
					xhr.setRequestHeader('X-Auth-Token', localStorage['token']);
			},
            data: strData,
			success: function(data) {
				rtrnVal(data);
			},
            error: function(jqXHR, status, errorThrown) {
            	console.log(jqXHR);
				//console.log("Error during the request : " + errorThrown + " (status code " + status + ")");
            }
        });
	}
}