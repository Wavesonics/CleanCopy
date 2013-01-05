function checkForValidUrl(tabId, changeInfo, tab)
{
	urlIsSupported( tab.url, function( isSupported )
	{
		if( isSupported === true )
		{
			chrome.pageAction.show(tabId);
		}
	});
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

function firstRun(details)
{
	if( details.reason == "install" )
	{
		putSupportedSiteList( supportedSites );
	}
	else if( details.reason  == "update" )
	{
		getSupportedSiteList( mergeSiteLists );
	}
};

function mergeSiteLists( siteList )
{
	// Must merge the lists
	var oldSiteList = clone( siteList );
	// Remove all defaults from the old list, we only want to bring custom
	// sites forward
	pruneDefaults( oldSiteList );

	// Create a copy of the defaults
	var newSiteList = clone( supportedSites );

	for( var ii in oldSiteList )
	{
		var oldSite = oldSiteList[ii];
		var defualtSite = findSiteInDefaults( oldSite, newSiteList );

		if( defualtSite !== null )
		{
			for( var xx in oldSite.pages )
			{
				var page = oldSite.pages[xx];
				addPageToSite( page, defualtSite );
			}
		}
		// Not found in the new list, just add it
		else
		{
			oldSite.isDefault = false;
			newSiteList.push( oldSite );
		}
	}
	
	putSupportedSiteList( newSiteList );
}

// Perform first time setup
chrome.runtime.onInstalled.addListener( firstRun );

// Listen for list invalidation from Options page
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse)
	{
		if( request.siteListUpdated === true )
		{
			invalidateSiteList();
		}
	});