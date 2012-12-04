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
	else
	{
		// Should merge old list with new defaults here
	}	
};

// Perform first time setup
chrome.runtime.onInstalled.addListener( firstRun );