function populateSiteList()
{
	var siteList = getSupportedSiteList();

	var siteListContainer = window.document.getElementById( "siteListContainer" );

	for( var ii in siteList )
	{
		var site = siteList[ii];
		var siteContainer = window.document.createElement( "div" );
		var strongText = window.document.createElement( "strong" );
		var siteName = window.document.createTextNode( site.domain );
		strongText.appendChild( siteName );
		siteContainer.appendChild( strongText );

		var pageList = window.document.createElement( "ul" );
		
		for( var xx in site.pages )
		{
			var page = site.pages[xx];
			var pagePattern = window.document.createTextNode( page.capturePattern.source );
			var pageItem = window.document.createElement( "li" );
			pageItem.appendChild( pagePattern );
			pageList.appendChild( pageItem );
		}
		siteContainer.appendChild( pageList );
		
		siteListContainer.appendChild( siteContainer );
		siteListContainer.appendChild( window.document.createElement( "br" ) );
	}
}

window.onload = populateSiteList;