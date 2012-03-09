Popup = {
	_display : function(content) {
		$('div#myPopup #popContent').html(content);
	},

	Pop: {
		srvRebuild : function() {
			var content = "<div class='page-header'>"
			+ "<h2>Rebuild the server</h2>"
			+ "</div>"
			+ "<form class=form-horizontal id=rebuild_form'>"
			+ "<fieldset>"
			+ Utils.Selects.images()
			+ "<div class='form-actions'>"
			+ "<a href='#' id='rebuild-save' class='btn btn-small btn-primary'>"
			+ "<i class='icon-ok icon-white'></i> Rebuild"
			+ "<a href='#' id='rebuild-cancel' class='btn btn-small'>"
			+ "<i class='icon-remove'></i> Cancel"
			+ "</div>"
			+ "</fieldset>"
			+ "</form>";

			Popup._display(content);
		}
	}
};