$(document).ready(function() {
	if(Rackspace.Auth.isTokenValid()) {
		// Load the table
		$('#srvTable').dataTable({
			"aaData": Rackspace.Servers.minSrvList,
			"aoColumns": [
				{"sTitle": "ID"},
				{"sTitle": "Name"},
				{"sTitle": "Status"},
				{"sTitle": "Public IP(s)"},
				{"sTitle": "Private IP(s)"},
				{
					"sTitle": "Actions",
					"fnRender": function(o, val) {
						return "<div class='actionDiv' id='" 
							+ o.aData[0]
							+ "'><i id='srv_actions' class='icon-refresh' rel='tooltip' title='Soft reboot'></i>"
							+ " <i id='srv_actions' class='icon-repeat' rel='tooltip' title='Rebuild'></i>";
					}
				}
			],
			"sDom": "<'row'<'span5'l><'span5'f>r>t<'row'<'span5'i><'span5'p>>",
			"sPaginationType": "bootstrap"
		});
		
		// Tooltips
		$('i#srv_actions.icon-refresh').tooltip();
		$('i#srv_actions.icon-repeat').tooltip();

		$(document).on('click', 'i#srv_actions.icon-refresh', function() {
			var srvId = $(this).parent().attr('id');
			Rackspace.Servers.Action.reboot('SOFT', srvId, function(data) {
				Utils.refreshTable("server");
			});
		});

		// Rebuild events
		// ---------------------
		$(document).on('click', 'i#srv_actions.icon-repeat', function() {
			if(Popup.isHidden()) {
				$('#popContent').attr('srvId', $(this).parent().attr('id'));
				Popup.Pop.srvRebuild();
			}
			else
				Popup.hide();
		});

		$(document).on('click', 'div#myPopup #popContent a#rebuild-cancel', function() {
			Popup.hide();
		});

		$(document).on('click', 'div#myPopup a.close', function() {
			Popup.hide();
		});

		$(document).on('click', 'div#myPopup #popContent a#rebuild-save', function() {
			var srvId = $('#popContent').attr('srvId'),
				imgId = $('#popContent select#image').val();

			Rackspace.Servers.Action.rebuild(srvId, imgId, function(data) {
				console.log(data);
			});
		});
		// ---------------------

	} else
		Utils.writeMessage("You will have to enter a username and an API key in order to use this extension.", "warning");
});