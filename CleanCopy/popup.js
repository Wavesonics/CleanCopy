function cleanCopy() {
	chrome.tabs.query({
		active: true,                              // Select active tabs
		windowId: chrome.windows.WINDOW_ID_CURRENT // In the current window
	}, function (array_of_Tabs) {
		// Since there can only be one active tab in one active window, 
		//  the array has only one element
		var tab = array_of_Tabs[0];
		var url = tab.url;

		var rootDomain = UriParser.parseRootDomain( url );
		var site = getSupportedSite( url, rootDomain );
		
		if( site != null )
		{
			for( var i in site.pages )
			{
				var page = site.pages[i];
				var parts = getUrlParts( url, rootDomain, page );

				if( parts != null && parts.length == page.captureGroups + 1 )
				{
					var cleanUrl = page.urlTemplate.replace( "URL_ID_1_HERE", parts[1] );
					copyToClipboard( cleanUrl );
					break;
				}
			}
		}
	});
}

function copyToClipboard( text ){
	var copyDiv = document.createElement('div');
	copyDiv.contentEditable = true;
	document.body.appendChild(copyDiv);
	copyDiv.innerHTML = text;
	copyDiv.unselectable = "off";
	copyDiv.focus();
	document.execCommand('SelectAll');
	document.execCommand("Copy", false, null);
	document.body.removeChild(copyDiv);
}

document.addEventListener('DOMContentLoaded', function() {
  cleanCopy();
});