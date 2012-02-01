/*
 * Rackspace Server Lib
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
			
			Rest.post(jsonObject, strUrl, false, function(data) {
				Rackspace.token = data.auth.token.id;
				Rackspace.Servers.public_url = data.auth.serviceCatalog['cloudServers'][0].publicURL;
			});
		}
	},
	
	Servers: {
		// Dynamic url returned by Rackspace
		public_url : "",
		
		// Retrieving the server list (simple)
		getList: function(bAsync, rtrnVal) {
			var strUrl = Rackspace.Servers.public_url + "/servers";

			Rest.get(null, strUrl, bAsync, function(data) {
				rtrnVal(data);
			})
		},
	
		// Retrieving the server list (with details)
		getDetailedList: function(bAsync, rtrnVal) {
			var strUrl = Rackspace.Servers.public_url + "/servers/detail";
			
			Rest.get(null, strUrl, bAsync, function(data) {
				rtrnVal(data);
			});
		},

		// Retrieving a specific server
		get: function(srvId, bAsync, rtrnVal) {
			if(srvId != "") {
				var strUrl = Rackspace.Servers.public_url + "/servers/" + srvId;
				
				Rest.get(null, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			} else {
				rtrnVal(false);
			}
		},

		// Creating a server
		create: function(srvName, imgId, flavId, bAsync, rtrnVal) {
			if(srvId != "" && imgId != "" && flavId != "") {
				var jsonObj = {
					"server": {
						"name": srvName,
						"imageId": imgId,
						"flavorId": flavId
					}
				};

				var strUrl = Rackspace.Servers.public_url + "/servers";

				Rest.post(jsonObj, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			} else {
				rtrnVal(false);
			}
		},

		// Retrieving a specific server
		deleteServer: function(srvId, bAsync, rtrnVal) {
			if(srvId != "") {
				var strUrl = Rackspace.Servers.public_url + "/servers/" + srvId;
				
				Rest.delete(null, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			} else {
				rtrnVal(false);
			}
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
					};

					var strUrl = Rackspace.Servers.public_url + "/servers/" + srvId + "/action";

					Rest.post(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else {
					rtrnVal(false);
				}
			},


			rebuild: function(srvId, imgId, rtrnVal) {
				if(srvId != "" && imgId != "") {
					var jsonObj = {
						"rebuild": {
							"imageId": imgId
						}	
					};

					var strUrl = Rackspace.Servers.public_url + "/servers/" + srvId + "/action";

					Rest.post(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else {
					rtrnVal(false)
				}
			},

			// Resize action
			Resize: {
				// Resizing the server
				// (Modifying its flavor)
				doResize: function(srvId, flavId, rtrnVal) {
					if(servId != "" && imgId != "") {
						var jsonObj = {
							"resize": {
								"flavorId": flavId
							}	
						};

						var strUrl = Rackspace.Servers.public_url + "/servers/" + srvId + "/action";

						Rest.post(jsonObj, strUrl, bAsync, function(data) {
							rtrnVal(data);
						});
					} else {
						rtrnVal(false);
					}
				}, 

				// Confirm the resize
				confirm: function(srvId, rtrnVal) {
					if(servId != "" && imgId != "") {
						var jsonObj = {
							"confirmResize": null	
						};

						var strUrl = Rackspace.Servers.public_url + "/servers/" + srvId + "/action";

						Rest.post(jsonObj, strUrl, bAsync, function(data) {
							rtrnVal(data);
						});
					} else {
						rtrnVal(false);
					}
				},

				// Revert the resize
				revert: function(srvId, bAsync, rtrnVal) {
					if(servId != "" && imgId != "") {
						var jsonObj = {
							"revertResize": null	
						};

						var strUrl = Rackspace.Servers.public_url + "/servers/" + srvId + "/action";

						Rest.post(jsonObj, strUrl, bAsync, function(data) {
							rtrnVal(data);
						});
					} else {
						rtrnVal(false);
					}
				}
			}
		},

		Flavors: {
			// Getting the flavor list (simple)
			getList: function(bAsync, rtrnVal) {
				var strUrl = Rackspace.Servers.public_url + "/flavors";

				Rest.get(null, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			},

			// Getting the server list (with details)
			getDetailedList: function(bAsync, rtrnVal) {
				var strUrl = Rackspace.Servers.public_url + "/flavors/detail";
				
				Rest.get(null, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			},

			get: function(flavId, bAsync, rtrnVal) {
				if(flavId != "") {
					var strUrl = Rackspace.Servers.public_url + "/flavors/" + flavId;

					Rest.get(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else {
					rtrnVal(false);
				}
			}
		},

		Images: {
			// Getting the flavor list (simple)
			getList: function(bAsync, rtrnVal) {
				var strUrl = Rackspace.Servers.public_url + "/images";

				Rest.get(null, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			},

			// Getting the server list (with details)
			getDetailedList: function(bAsync, rtrnVal) {
				var strUrl = Rackspace.Servers.public_url + "/images/detail";
				
				Rest.get(null, strUrl, bAsync, function(data) {
					rtrnVal(data);
				});
			},

			// Retrieving a specific image
			get: function(imgId, bAsync, rtrnVal) {
				if(imgId != "") {
					var strUrl = Rackspace.Servers.public_url + "/images/" + imgId;

					Rest.get(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else {
					rtrnVal(false);
				}
			},

			// Creating an image
			create: function (srvId, imgName, bAsync, rtrnVal) {
				if(srvId != "" && imgName != "") {
					var jsonObj = {
						"image": {
							"serverId": srvId,
							"name": imgName
						}
					}

					var strUrl = Rackspace.Servers.public_url + "/images";
				
					Rest.post(jsonObj, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else {
					rtrnVal(false);
				}
			},

			deleteImage: function(imgId, bAsync, rtrnVal) {
				if(imgId != "") {
					var strUrl = Rackspace.Servers.public_url + "/images/" + imgId;
					
					Rest.delete(null, strUrl, bAsync, function(data) {
						rtrnVal(data);
					});
				} else {
					rtrnVal(false);
				}
			}
		}
	}
};