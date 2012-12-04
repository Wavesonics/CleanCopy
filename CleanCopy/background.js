function checkForValidUrl(tabId, changeInfo, tab)
{
	if( urlIsSupported( tab.url ) === true )
	{
		chrome.pageAction.show(tabId);
	}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);