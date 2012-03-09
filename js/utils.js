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
				oTable.fnAddData(localStorage['minSrvList']);

				// Refreshing tooltips
				$('i#srv_actions.icon-refresh').tooltip();
				$('i#srv_actions.icon-repeat').tooltip();
			});
		} else if(type == "image") {
			Rackspace.Servers.Images.getDetailedList(true, function() {
				var oTable = $('#imgTable').dataTable();
				oTable.fnClearTable();
				oTable.fnAddData(localStorage['minImgList']);
			});
		}
	},

	Selects: {
		images : function() {
			var imgSelect = "<div class='control-group'>"
			+ "<label class='control-label' for='image'>Image</label>"
			+ "<div class='controls'>"
			+ "<select id='image'>"
			+ "<option value='0'> ---------------- </option>"

			$.each(Rackspace.Servers.Images.minImgList, function(key, item) {
				imgSelect = imgSelect
				+ "<option value='" + item[0] + "' >" + item[1] + "</option>";
			});

			imgSelect = imgSelect
			+ "</select>"
			+ "</div>"
			+ "</div>";

			return imgSelect;
		}
	}
}