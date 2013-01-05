function urlIsSupported( url, callback )
{
	getSupportedSite( url, function( site )
	{
		var isValid = false;
		
		if( site !== null )
		{
			for( var i in site.pages )
			{
				var page = site.pages[i];
				var parts = getUrlParts( url, page );
				
				if( parts !== null && parts.length == page.captureGroups + 1 )
				{
					isValid = true;
					break;
				}
			}
		}
		
		callback( isValid );
	});
}

function getSupportedSite( url, callback )
{
	getSupportedSiteList( function( siteList )
	{
		var site = null;
		if( siteList != null )
		{
			for( var i in siteList )
			{
				var tempSite = siteList[i];

				if( checkDomain( tempSite, url ) )
				{
					site = tempSite;
					break;
				}
			}
		}
		
		callback( site );
	});
}

function checkDomain( site, url )
{
	return site.domainRegex.test( url );
}

function getUrlParts( url, page )
{
	return page.capturePattern.exec( url );
}

function addPageToSite( page, site )
{
    var pageFound = false;
    for( var ii in site.pages )
    {
        var tempPage = site.pages[ii];
        if( tempPage.capturePattern.source === page.capturePattern.source )
        {
            pageFound = true;

            site.pages.splice( ii, 1 );
            site.pages.push( page );

            break;
        }
    }

    if( pageFound === false )
    {
        site.pages.push( page );
    }
}

function putSupportedSiteList( newSiteList )
{
	var tempSiteList = clone( newSiteList );

	for( var ii in tempSiteList )
	{
		delete tempSiteList.domainRegex;
		var pages = tempSiteList[ii].pages;
		for( var xx in pages )
		{
			pages[xx].capturePattern = pages[xx].capturePattern.source;
		}
	}

	chrome.storage.sync.set( {"supportedSites" : tempSiteList}, function()
	{
		if( saveDataErrorCheck() )
		{
			chrome.storage.sync.getBytesInUse("supportedSites", function( bytes ){ console.log( "Bytes in use: " + bytes ); });
			
			getSupportedSiteList.list = null;
			// Let the background page know the site list has been updated
			chrome.extension.sendMessage( {siteListUpdated: true} );
		}
	} );
}

function saveDataErrorCheck()
{
	var success = true;
	if( chrome.runtime.lastError !== undefined  )
	{
		success = false;
		console.log( chrome.runtime.lastError );
		alert( chrome.runtime.lastError.message );
	}
	return success;
}

function getSupportedSiteList( callback )
{
	if( getSupportedSiteList.list === null )
	{
		chrome.storage.sync.get( "supportedSites", function( data )
		{
			if( chrome.runtime.lastError === undefined )
			{
				getSupportedSiteList.list = data.supportedSites;

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
				
				if( callback !== undefined )
				{
					callback( getSupportedSiteList.list );
				}
			}
		} );
	}
	else
	{
		callback( getSupportedSiteList.list );
	}
}
getSupportedSiteList.list = null;

function invalidateSiteList()
{
	getSupportedSiteList.list = null;
	getSupportedSiteList();
}

function clone( obj )
{
	return $.extend(true, [], obj);
}

///////////////////////////////////////////////////////////
// Helper methods
///////////////////////////////////////////////////////////

function pruneDefaults( siteList )
{
    for( var ii=0; ii<siteList.length; ++ii )
    {
        var site = siteList[ii];
        if( site.isDefault === true )
        {
            for( var xx=0; xx<site.pages.length; ++xx )
            {
                var page = siteList[ii].pages[xx];
                if( page.isDefault === true )
                {
                    siteList[ii].pages.splice( xx, 1 );
					--xx;
                }
            }

            // If all the pages were defaults, then remove the whole site
            if( siteList[ii].pages.length === 0 )
            {
                siteList.splice( ii, 1 );
				--ii;
            }
        }
    }
}

function findSiteInDefaults( site, defaults )
{
    var defaultSite = null;
    for( var ii in defaults )
    {
        var tempSite = defaults[ii];
        if( tempSite.domain === site.domain )
        {
            defaultSite = tempSite;
            break;
        }
    }
    return defaultSite;
}