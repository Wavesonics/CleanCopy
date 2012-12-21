var siteList = null;

function repopulateSiteList()
{
	$("#siteListContainer").html( "" );
	populateSiteList();
}

function populateSiteList()
{
	siteList = getSupportedSiteList();

	var siteListContainer = $("#siteListContainer");

	for( var ii in siteList )
	{
		var site = siteList[ii];
		var siteContainer = createSiteContainer( site.domain, ii, siteListContainer );

		var pageList = siteContainer.find( ".page_container" );

		for( var xx in site.pages )
		{
			createPage( ii, xx, pageList );
		}
		pageList.appendTo( siteContainer );

		siteContainer.appendTo( siteListContainer );
	}
}

function getSiteId( siteIndex )
{
	return "page_" + siteIndex;
	//return 'site_'+siteList[siteIndex].domain.hashCode();
}

function getPageId( siteIndex, pageIndex )
{
	return "site_" + siteIndex + "_page_" + pageIndex;
	//return "site_"+siteList[siteIndex].domain.hashCode()+"_page_"+siteList[siteIndex].pages[pageIndex].capturePattern.source.hashCode();
}

function deleteSite( siteIndex )
{
	var deleteConfirmed = confirm( "Delete this site?" );
	
	if( deleteConfirmed )
	{
		// Remove from backing array
		siteList.splice(siteIndex, 1);
		// Save to disk
		putSupportedSiteList( siteList );
		// Re draw the list
		repopulateSiteList();
	}
}

function deletePage( siteIndex, pageIndex )
{
	var deleteConfirmed = confirm( "Delete this page?" );
	
	if( deleteConfirmed )
	{
		siteList[siteIndex].pages.splice( pageIndex, 1 );
		// Save to disk
		putSupportedSiteList( siteList );
		// Re draw the list
		repopulateSiteList();
	}
}

function createPage( siteIndex, pageIndex, pageList )
{
	var site = siteList[siteIndex];
	var page = site.pages[pageIndex];
	var elementId = getPageId( siteIndex, pageIndex );

	var pageItem = jQuery( "<li/>", { id: elementId, click:function(){ deletePage( siteIndex, pageIndex ) } } );
	pageItem.html( page.capturePattern.source );
	pageItem.appendTo( pageList );
}

function createSiteContainer( siteName, siteIndex, siteListContainer )
{
	var siteContainer = jQuery('<div/>', { id: getSiteId( siteIndex ) });
	
	var deleteSiteButton = jQuery( "<button/>", { html:"X", click: function(){ deleteSite( siteIndex ) } } );
	deleteSiteButton.appendTo( siteContainer );
	
	var siteNameElement = jQuery('<strong/>');
	siteNameElement.html( siteName );
	siteNameElement.appendTo( siteContainer );
	
	var pageList = jQuery( "<ul/>", { class:"page_container" } );
	
	var deleteSiteButton = jQuery( "<button/>", { html:"Edit", click: function(){ toggleNewPageControls( siteIndex ) } } );
	deleteSiteButton.appendTo( pageList );
	
	pageList.appendTo( siteContainer );
	
	siteContainer.appendTo( siteListContainer );

	return siteContainer;
}

function toggleNewPageControls( siteIndex )
{
	var pageList = $( "#"+getSiteId( siteIndex ) ).children( ".page_container" );
	var newPageControls = pageList.children( ".page_controls_container" );

	if( newPageControls.length == 0 )
	{
		createNewPageControls( siteIndex );
	}
	else
	{
		newPageControls.remove();
	}
}

function createNewPageControls( siteIndex )
{
	var controlsContainer = jQuery( "<div/>", { class:"page_controls_container" } );
	
	var createPagePatternText = jQuery( "<input/>", {type:"text", class:"page_pattern"} );
	createPagePatternText.appendTo( controlsContainer );
	
	var createPageCaptureGroupsText = jQuery( "<input/>", {type:"text", class:"page_capture_groups"} );
	createPageCaptureGroupsText.appendTo( controlsContainer );
	jQuery( "<br/>" ).appendTo( controlsContainer );
	
	var createPageCaptureGroupsText = jQuery( "<input/>", {type:"text", class:"page_template"} );
	createPageCaptureGroupsText.appendTo( controlsContainer );
	
	var createPageBtn = jQuery( "<button/>", { html:"Add Page", click: function(){ createNewPage( siteIndex ) } } );
	createPageBtn.appendTo( controlsContainer );
	
	var pageList = $( "#"+getSiteId( siteIndex ) ).find( ".page_container" );
	controlsContainer.appendTo( pageList );
}

function createNewPage( siteIndex )
{
	var pageList = $( "#"+getSiteId( siteIndex ) ).children( ".page_container" );
	var newPageControls = pageList.children( ".page_controls_container" );
	
	var pagePattern = newPageControls.find( ".page_pattern" );
	var pageCaptureGroups = newPageControls.find( ".page_capture_groups" );
	var pageTemplate = newPageControls.find( ".page_template" );
	
	// Need validation here
	
	// Create the new page object from the input
	var newPage = new Object();
	newPage.captureGroups = parseInt( pageCaptureGroups.val() );
	newPage.capturePattern = new RegExp( pagePattern.val() );
	newPage.urlTemplate = pageTemplate.val();
	
	// Save and redraw
	siteList[ siteIndex ].pages.push( newPage );
	putSupportedSiteList( siteList );
	repopulateSiteList();
}

function createNewSite()
{
    var domain = $("#site_domain").val();
	
	var newSite = new Object();
	newSite.domain = domain;
	newSite.pages = new Array();
	siteList.push( newSite );
	putSupportedSiteList( siteList );
	
	var newSiteContainer = createSiteContainer( domain, siteList.length, $("#siteListContainer") );
}

function resetSiteList()
{
	putSupportedSiteList( supportedSites );
	repopulateSiteList();
}

$(document).ready(function()
{
	populateSiteList();

    $("#add_site_btn").click( createNewSite );
	$("#reset_btn").click( resetSiteList );
});