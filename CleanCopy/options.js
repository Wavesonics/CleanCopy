var siteList = null;

function getSite( siteIndex )
{
	return siteList[ siteIndex ];
}

function getPage( siteIndex, pageIndex )
{
	var site = getSite( siteIndex );
	var page = site.pages[pageIndex];
	
	return page;
}

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
	return "site_" + siteIndex;
}

function getPageId( siteIndex, pageIndex )
{
	return getSiteId( + siteIndex ) + "_page_" + pageIndex;
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
	var page = getPage( siteIndex, pageIndex );
	var elementId = getPageId( siteIndex, pageIndex );

	var pageItem = jQuery( "<li/>", { id: elementId, click:function(){ togglePageDetails( siteIndex, pageIndex ) } } );
	pageItem.html( page.capturePattern.source );
	pageItem.appendTo( pageList );
}

function createSiteContainer( siteName, siteIndex, siteListContainer )
{
	var site = getSite( siteIndex );

	var siteContainer = jQuery( "<div/>", { id: getSiteId( siteIndex ) });
	
	if( site.isDefault === false )
	{
		var deleteSiteButton = jQuery( "<button/>", { html:"X", class:"deleteButton", click: function(){ deleteSite( siteIndex ) } } );
		deleteSiteButton.appendTo( siteContainer );
	}
	
	var siteNameElement = jQuery('<strong/>');
	siteNameElement.html( siteName );
	siteNameElement.appendTo( siteContainer );
	
	var pageList = jQuery( "<ul/>", { class:"page_container" } );
	
	var editSiteButton = jQuery( "<button/>", { html:"Add Page", click: function(){ toggleNewPageControls( siteIndex ) } } );
	editSiteButton.appendTo( pageList );
	
	pageList.appendTo( siteContainer );
	
	siteContainer.appendTo( siteListContainer );

	return siteContainer;
}

function togglePageDetails( siteIndex, pageIndex )
{
	var pageId = getPageId( siteIndex, pageIndex );
	var pageContainer = $( "#"+pageId );
	var pageDetails = pageContainer.children( ".page_details_container" );
	
	if( pageDetails.length == 0 )
	{
		createPageDetails( siteIndex, pageIndex );
	}
	else
	{
		pageDetails.slideUp( "fast", function(){ pageDetails.remove(); } );
	}
}

function createPageDetails( siteIndex, pageIndex )
{
	var page = getPage( siteIndex, pageIndex );
	
	var pageId = getPageId( siteIndex, pageIndex );
	var pageContainer = $( "#"+pageId );
	
	var pageDetailsContainer = jQuery( "<div/>", {class:"page_details_container"} );
	
	var captureGroupsContainer = jQuery( "<div/>" );
	jQuery( "<strong/>", { html:"Capture Groups: " } ).appendTo( captureGroupsContainer );
	jQuery( "<span/>", { html:page.captureGroups+"", class:"capture_groups" } ).appendTo( captureGroupsContainer );
	captureGroupsContainer.appendTo( pageDetailsContainer );
	
	var urlTamplateContainer = jQuery( "<div/>" );
	jQuery( "<strong/>", { html:"Template: " } ).appendTo( urlTamplateContainer );
	jQuery( "<span/>", { html:page.urlTemplate+"", class:"url_template" } ).appendTo( urlTamplateContainer );
	urlTamplateContainer.appendTo( pageDetailsContainer );
	
	if( page.isDefault === false )
	{
		var deletePageButton = jQuery( "<button/>", { html:"Delete Page", class:"deleteButton", click: function(){ deletePage( siteIndex, pageIndex ) } } );
		deletePageButton.appendTo( pageDetailsContainer );
	}
	
	pageDetailsContainer.hide();
	pageDetailsContainer.appendTo( pageContainer ).slideDown( "fast" );
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
		newPageControls.slideUp( "fast", function(){ newPageControls.remove(); } );
	}
}

function createNewPageControls( siteIndex )
{
	var controlsContainer = jQuery( "<div/>", { class:"page_controls_container" } );
	
	jQuery( "<strong/>", { html:"Pattern: " } ).appendTo( controlsContainer );
	var createPagePatternText = jQuery( "<input/>", {type:"text", class:"page_pattern"} );
	createPagePatternText.attr( "size", 128 );
	createPagePatternText.appendTo( controlsContainer );
	jQuery( "<br/>" ).appendTo( controlsContainer );
	
	jQuery( "<strong/>", { html:"Number of Capture Groups: " } ).appendTo( controlsContainer );
	var createPageCaptureGroupsText = jQuery( "<input/>", {type:"text", class:"page_capture_groups"} );
	createPageCaptureGroupsText.attr( "size", 1 );
	createPageCaptureGroupsText.appendTo( controlsContainer );
	jQuery( "<br/>" ).appendTo( controlsContainer );
	
	jQuery( "<strong/>", { html:"URL Template: " } ).appendTo( controlsContainer );
	var createPageCaptureGroupsText = jQuery( "<input/>", {type:"text", class:"page_template"} );
	createPageCaptureGroupsText.attr( "size", 96 );
	createPageCaptureGroupsText.appendTo( controlsContainer );
	jQuery( "<br/>" ).appendTo( controlsContainer );
	
	var createPageBtn = jQuery( "<button/>", { html:"Create New Page", class:"createButton", click: function(){ createNewPage( siteIndex ) } } );
	createPageBtn.appendTo( controlsContainer );
	
	var pageList = $( "#"+getSiteId( siteIndex ) ).find( ".page_container" );
	controlsContainer.hide();
	controlsContainer.appendTo( pageList ).slideDown( "fast" );
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
	newPage.isDefault = false;
	
	// Save and redraw
	siteList[ siteIndex ].pages.push( newPage );
	putSupportedSiteList( siteList );
	repopulateSiteList();
}

function createNewSite()
{
    var domain = $("#site_domain").val();
	$("#site_domain").val( "" );
	
	var newSite = new Object();
	newSite.domain = domain;
	newSite.pages = new Array();
	siteList.push( newSite );
	newSite.isDefault = false;
	putSupportedSiteList( siteList );
	
	repopulateSiteList();
}

function resetSiteList()
{
	var confirmed = confirm( "This will remove all custom sites! Are you sure you want to do this?" );
	if( confirmed === true )
	{
		putSupportedSiteList( supportedSites );
		repopulateSiteList();
	}
}

$(document).ready(function()
{
	populateSiteList();

    $("#add_site_btn").click( createNewSite );
	$("#reset_btn").click( resetSiteList );
});