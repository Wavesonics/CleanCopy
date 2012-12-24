function checkForValidUrl(tabId, changeInfo, tab)
{
	if( urlIsSupported( tab.url ) === true )
	{
		chrome.pageAction.show(tabId);
	}
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
		// Must merge the lists
		
	}
};

// Perform first time setup
chrome.runtime.onInstalled.addListener( firstRun );