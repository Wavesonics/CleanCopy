function populateSiteList()
{
	var siteList = getSupportedSiteList();

	var siteListContainer = window.document.getElementById( "siteListContainer" );

	for( var i in siteList )
	{
		var site = siteList[i];
		var siteContainer = window.document.createElement( "div" );
		var siteName = window.document.createTextNode( site.domain );
		siteContainer.appendChild( siteName );
		
		siteListContainer.appendChild( siteContainer );
		siteListContainer.appendChild( window.document.createElement( "br" ) );
	}
}

window.onload = populateSiteList;