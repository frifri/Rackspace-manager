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
}

	