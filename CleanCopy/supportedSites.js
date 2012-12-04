var supportedSites = [
	{
		domain : "youtube.com",
		pages :
		[
			{
				captureGroups : 1,
				capturePattern : "^(?:http|https):\/\/(?:www.)?youtube.com\/watch\?.*v=([a-zA-Z0-9_]+).*$",
				urlTemplate : "http://youtube.com/watch?v=URL_ID_1_HERE&hd=1"
			}
		]
	},
	{
		domain : "amazon.com",
		pages :
		[
			{
				captureGroups : 1,
				capturePattern : "^(?:http|https):\/\/(?:www.)?amazon.com\/(?:.*\/)*dp\/((?:product\/)?[a-zA-Z0-9_-]+)(?:\/)*.*$",
				urlTemplate : "http://amazon.com/dp/URL_ID_1_HERE/"
			},
			{
				captureGroups : 1,
				capturePattern : "^(?:http|https):\/\/(?:www.)?amazon.com\/(?:.*\/)*gp\/((?:product\/)?[a-zA-Z0-9_-]+)(?:\/)*.*$",
				urlTemplate : "http://amazon.com/gp/URL_ID_1_HERE/"
			}
		]
	},
	{
		domain : "amazon.co.uk",
		pages :
		[
			{
				captureGroups : 1,
				capturePattern : "^(?:http|https):\/\/(?:www.)?amazon.co.uk\/(?:.*\/)*gp\/((?:product\/)?[a-zA-Z0-9_-]+)(?:\/)*.*$",
				urlTemplate : "http://amazon.co.uk/gp/URL_ID_1_HERE/"
			},
			{
				captureGroups : 1,
				capturePattern : "^(?:http|https):\/\/(?:www.)?amazon.co.uk\/(?:.*\/)*dp\/((?:product\/)?[a-zA-Z0-9_-]+)(?:\/)*.*$",
				urlTemplate : "http://amazon.co.uk/dp/URL_ID_1_HERE/"
			}
		]
	}
];