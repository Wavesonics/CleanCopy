function urlIsSupported( url )
{
	var isValid = false;

	var site = getSupportedSite( url );
	if( site != null )
	{
		for( var i in site.pages )
		{
			var page = site.pages[i];
			var parts = getUrlParts( url, page );

			if( parts != null && parts.length == page.captureGroups + 1 )
			{
				isValid = true;
				break;
			}
		}
	}
	
	return isValid;
}

function getSupportedSite( url )
{
	var site = null;

	var siteList = getSupportedSiteList();
	for( var i in siteList )
	{
		var tempSite = siteList[i];

		if( checkDomain( tempSite, url ) )
		{
			site = tempSite;
			break;
		}
	}
	return site;
}

function checkDomain( site, url )
{
	return site.domainRegex.test( url );
}
 
function getUrlParts( url, page )
{
	return page.capturePattern.exec( url );
}

function putSupportedSiteList( newSiteList )
{
	for( var ii in newSiteList )
	{
		var pages = newSiteList[ii].pages;
		for( var xx in pages )
		{
			pages[xx].capturePattern = pages[xx].capturePattern.source;
		}
	}
	
	localStorage.supportedSites = JSON.stringify( newSiteList );
}

function getSupportedSiteList()
{
	if( getSupportedSiteList.list === null )
	{
		getSupportedSiteList.list = JSON.parse( localStorage.supportedSites );
		
		for( var ii in getSupportedSiteList.list )
		{
			var site = getSupportedSiteList.list[ii];
			site.domainRegex = new RegExp( "^(?:http|https):\/\/(?:www.)?" + site.domain + ".*$", "i" );
			
			var pages = site.pages;
			for( var xx in pages )
			{
				pages[xx].capturePattern = new RegExp( pages[xx].capturePattern );
			}
		}
	}
	
	return getSupportedSiteList.list;
}
getSupportedSiteList.list = null;