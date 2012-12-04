function urlIsSupported( url )
{
	var isValid = false;

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
				isValid = true;
				break;
			}
		}
	}
	
	return isValid;
}

function getSupportedSite( url, rootDomain )
{
	var site = null;

	var siteList = getSupportedSiteList();
	for( var i in siteList )
	{
		var tempSite = siteList[i];

		if( tempSite.domain == rootDomain )
		{
			site = tempSite;
			break;
		}
	}
	return site;
}

function getUrlParts( url, domain, page )
{
	var regExPattern = new RegExp( page.capturePattern, "i" );
	var match = regExPattern.exec( url );
	return match;
}

function putSupportedSiteList( newSiteList )
{
	localStorage.supportedSites = JSON.stringify( newSiteList );
}

function getSupportedSiteList()
{
	if( getSupportedSiteList.list === null )
	{
		getSupportedSiteList.list = JSON.parse( localStorage.supportedSites );
	}
	
	return getSupportedSiteList.list;
}
getSupportedSiteList.list = null;