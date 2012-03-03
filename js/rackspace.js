/*
* Rackspace Server Lib.
* Copyright (c) 2012 Francis Genet. All rights reserved.
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

Rackspace = {

	Auth: {
		// Version of the current Rackspace auth API
		authVersion : "v1.1",
	
		getToken: function() {
			// If getting a new token, we need to reset the public url
			// Or else the url's gonna be the last public_url + the auth_url
			localStorage['srv_pub_url'] = "";

			var jsonObject = {
					"credentials": {
						"username": localStorage['username'],
						"key": localStorage['apikey']
					}
				},
			
			// Building the url
			// https://auth.api.rackspacecloud.com/v1.1/auth
				strUrl = "https://auth.api.rackspacecloud.com/" + Rackspace.Auth.authVersion + "/auth";
			
			Rest.post(jsonObject, strUrl, false, function(data) {
				var d = new Date;
				// The ttl is equal to the current unix time + 1 day (86400000 ms)
				localStorage['ttl'] = d.getTime() + 86400000;
				localStorage['token'] = data.auth.token.id;
				localStorage['srv_pub_url'] = data.auth.serviceCatalog['cloudServers'][0].publicURL;
			});
		},

		// return true if the token is still valid
		isTokenValid: function() {
			var d = new Date
				curDate = d.getTime(),
				ttl = localStorage['ttl'] - curDate;

			if(ttl > 0)
				return true;
			else
				return false;
		}
	},
	
	Servers: {
		minSrvList : [],
	
		_generateMinList: function(servers) {
			// For each server
			if(servers.servers.length != 0){
				$.each(servers.servers, function(key, server) {

					console.log(server);

					var srvId = server.id,
						srvName = server.name,
						srvStatus = server.status,
						srvPubIp = "",
						srvPrvIp = "";
	                                    
					$.each(server.addresses.public, function(ipKey, pubIp) {
						srvPubIp = srvPubIp + srvPubIp + pubIp;
					});

					$.each(server.addresses.private, function(ipKey, prvIp) {
						srvPrvIp = srvPrvIp + srvPrvIp + prvIp;
					});

					Rackspace.Servers.minSrvList.push([srvId, srvName, srvStatus, srvPubIp, srvPrvIp, null]);
					// Actions...
					//Rackspace.Servers.minSrvList.push([srvId, srvName, srvStatus, srvPubIp, srvPrvIp, null]);
				});
			} else
				Rackspace.Servers.minSrvList = [];
		},
	
		// Retrieve the server list (simple)
		getList: function(bAsync, rtrnVal) {
			var strUrl = "/servers";

			Rest.get(null, strUrl, bAsync, function(data) {
				Rackspace.Servers._generateMinList(data);
				rtrnVal();
			})
		},
	
		// Retrieve the server list (with details)
		getDetailedList: function(bAsync, rtrnVal) {
			var strUrl = "/servers/detail";
			
			Rest.get(null, strUrl, bAsync, function(data) {
				Rackspace.Servers._generateMinList(data);
				rtrnVal();
			});
		},

		// Retrieve a specific server
		get: function(srvId, bAsync, rtrnVal) {
			if(srvId != "") {
				var strUrl = "/servers/" + srvId;
				
				Rest.get(null, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			} else
				rtrnVal(false);
		},

		// Create a server
		create: function(srvName, imgId, flavId, bAsync, rtrnVal) {
			if(srvId != "" && imgId != "" && flavId != "") {
				var jsonObj = {
						"server": {
							"name": srvName,
							"imageId": imgId,
							"flavorId": flavId
						}
					},
					strUrl = "/servers";

				Rest.post(jsonObj, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			} else 
				rtrnVal(false);
		},

		// Retrieve a specific server
		deleteServer: function(srvId, bAsync, rtrnVal) {
			if(srvId != "") {
				var strUrl = "/servers/" + srvId;
				
				Rest.delete(null, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			} else 
				rtrnVal(false);
		},

		Action: {
			// Reboot a server
			// HARD or SOFT reboot
			reboot: function(type, srvId, rtrnVal) {
				if(type == "HARD"  || type = "SOFT") {
					var jsonObj = {
							"reboot": {
								"type": type
							}	
						},
						strUrl = "/servers/" + srvId + "/action";

					Rest.post(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else 
					rtrnVal(false);
			},

			// Rebuilding a server from a specific image
			rebuild: function(srvId, imgId, rtrnVal) {
				if(srvId != "" && imgId != "") {
					var jsonObj = {
							"rebuild": {
								"imageId": imgId
							}	
						},
						strUrl = "/servers/" + srvId + "/action";

					Rest.post(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else 
					rtrnVal(false)
			},

			// Resize action
			Resize: {
				// Resize the server
				// (Modify its flavor)
				doResize: function(srvId, flavId, rtrnVal) {
					if(servId != "" && imgId != "") {
						var jsonObj = {
								"resize": {
									"flavorId": flavId
								}	
							},
							strUrl = "/servers/" + srvId + "/action";

						Rest.post(jsonObj, strUrl, bAsync, function(data) {
							rtrnVal(data);
						});
					} else 
						rtrnVal(false);
				}, 

				// Confirm the resize
				confirm: function(srvId, rtrnVal) {
					if(servId != "" && imgId != "") {
						var jsonObj = {
								"confirmResize": null	
							},
							strUrl = "/servers/" + srvId + "/action";

						Rest.post(jsonObj, strUrl, bAsync, function(data) {
							rtrnVal(data);
						});
					} else 
						rtrnVal(false);
				},

				// Revert the resize
				revert: function(srvId, bAsync, rtrnVal) {
					if(servId != "" && imgId != "") {
						var jsonObj = {
								"revertResize": null	
							},
							strUrl = "/servers/" + srvId + "/action";

						Rest.post(jsonObj, strUrl, bAsync, function(data) {
							rtrnVal(data);
						});
					} else 
						rtrnVal(false);
				}
			}
		},

		Flavors: {
			minFlvList : [],

			_generateMinList: function(flavors) {
				// For each server
				if(flavors.flavors.length != 0){
					$.each(flavors.flavors, function(key, flavor) {
						var flvId = flavor.id,
							flvName = flavor.name,
							flvRam = flavor.ram,
							flvDisk = flavor.disk;

						Rackspace.Servers.Flavors.minFlvList.push([flvId, flvName, flvRam, flvDisk]);
					});
				} else 
					Rackspace.Servers.Flavors.minFlvList = [];
			},

			// Get the flavor list (simple)
			getList: function(bAsync, rtrnVal) {
				var strUrl = "/flavors";

				Rest.get(null, strUrl, bAsync, function(data) {
					Rackspace.Servers.Flavors._generateMinList(data);
					rtrnVal();
				});
			},

			// Get the flavor list (with details)
			getDetailedList: function(bAsync, rtrnVal) {
				var strUrl = "/flavors/detail";
				
				Rest.get(null, strUrl, bAsync, function(data) {
					Rackspace.Servers.Flavors._generateMinList(data);
					rtrnVal();
				});
			},

			// Retrieve a specific flavor
			get: function(flavId, bAsync, rtrnVal) {
				if(flavId != "") {
					var strUrl = "/flavors/" + flavId;

					Rest.get(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else 
					rtrnVal(false);
			}
		},

		Images: {
			minImgList : [],

			_generateMinList: function(images) {
				// For each server
				if(images.images.length != 0){
					$.each(images.images, function(key, image) {
						var imgId = image.id,
							imgName = image.name,
							imgCreated = image.created,
							imgUpdated = image.updated,
							imgStatus = image.status;

							if(!imgCreated)
								imgCreated = "N/A";

							if(!imgUpdated)
								imgUpdated = "N/A";

						Rackspace.Servers.Images.minImgList.push([imgId, imgName, imgCreated, imgUpdated, imgStatus]);
						// Actions...
						//Rackspace.Servers.Images.minImgList.push([imgId, imgName, imgCreated, imgUpdated, imgStatus, null]);
					});
				} else 
					Rackspace.Servers.Images.minImgList = [];
			},

			// Get the image list (simple)
			getList: function(bAsync, rtrnVal) {
				var strUrl = "/images";

				Rest.get(null, strUrl, bAsync, function(data) {
					Rackspace.Servers.Images._generateMinList(data);
					rtrnVal();
				});
			},

			// Get the image list (with details)
			getDetailedList: function(bAsync, rtrnVal) {
				var strUrl = "/images/detail";
				
				Rest.get(null, strUrl, bAsync, function(data) {
					Rackspace.Servers.Images._generateMinList(data);
					rtrnVal();
				});
			},

			// Retrieve a specific image
			get: function(imgId, bAsync, rtrnVal) {
				if(imgId != "") {
					var strUrl = "/images/" + imgId;

					Rest.get(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else 
					rtrnVal(false);
			},

			// Create an image
			create: function (srvId, imgName, bAsync, rtrnVal) {
				if(srvId != "" && imgName != "") {
					var jsonObj = {
							"image": {
								"serverId": srvId,
								"name": imgName
							}
						},
						strUrl = "/images";
				
					Rest.post(jsonObj, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else 
					rtrnVal(false);
			},

			// Delete a specific image
			deleteImage: function(imgId, bAsync, rtrnVal) {
				if(imgId) {
					var strUrl = "/images/" + imgId;
					
					Rest.delete(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else 
					rtrnVal(false);
			}
		}
	}
};