function populateSiteList()
{
	var siteList = getSupportedSiteList();

	var siteListContainer = $("#siteListContainer");

	for( var ii in siteList )
	{
		var site = siteList[ii];
		var siteContainer = createSiteContainer( site.domain, ii, siteListContainer );

		var pageList = jQuery( "<ul/>" );
		
		for( var xx in site.pages )
		{
			var page = site.pages[xx];
			var elementId = "site_"+ii+"_page_"+xx;
			
			//var pageItem = jQuery( "<li/>", { id: elementId, click:patternClicked } );
			var pageItem = jQuery( "<li/>", { id: elementId } );
			pageItem.html( page.capturePattern.source );
			pageItem.appendTo( pageList );
		}
		pageList.appendTo( siteContainer );

		siteContainer.appendTo( siteListContainer );
	}
}

function patternClicked()
{
	alert( $(this).attr('id') );
}

function createSiteContainer( siteName, siteIndex, siteListContainer )
{
	var siteContainer = jQuery('<div/>', { id: 'site_'+siteIndex });
	var siteNameElement = jQuery('<strong/>');
	siteNameElement.html( siteName );
	siteNameElement.appendTo( siteContainer );
	
	siteContainer.appendTo( siteListContainer );
	
	return siteContainer;
}

$(document).ready(function()
{
	populateSiteList();
});