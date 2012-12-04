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
	var sites = null;

	for( var i in supportedSites )
	{
		var tempSite = supportedSites[i];
		if( tempSite.domain == rootDomain )
		{
			sites = tempSite;
			break;
		}
	}
	return sites;
}

function getUrlParts( url, domain, page )
{
	var regExPattern = new RegExp( page.capturePattern, "i" );
	var match = regExPattern.exec( url );
	return match;
}