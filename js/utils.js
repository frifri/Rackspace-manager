Utils = {
	// Write a message on the top the page
	writeMessage: function(strMessage, strType) {
		var alertType = "alert-" + strType; 
		var target = $('#message_container');
		target
			.addClass('alert')
			.addClass(alertType)
			.html("<a class='close' href='#'>&times;</a><p>" + strMessage + "</p>");
	},

	removeMessage: function(){
		var target = $('#message_container');
		target
			.removeClass(target.attr('class'))
			.addClass('span5')
			.html("");
	},
	
	refreshTable: function(type){
		if(type == "server"){
			Rackspace.Servers.getDetailedList(true, function() {
				var oTable = $('#srvTable').dataTable();
				oTable.fnClearTable();
				oTable.fnAddData(Rackspace.Servers.minSrvList);
				$('i#srv_actions.icon-refresh').tooltip();
			});
		} else if(type == "image") {
			Rackspace.Servers.Images.getDetailedList(true, function() {
				var oTable = $('#imgTable').dataTable();
				oTable.fnClearTable();
				oTable.fnAddData(Rackspace.Servers.minImgList);
			});
		}
	}
}