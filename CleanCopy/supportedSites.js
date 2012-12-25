const supportedSites = [
	{
		domain : "youtube.com",
		pages :
		[
			{
				captureGroups : 1,
				capturePattern : /^(?:http|https):\/\/(?:www.)?youtube.com\/watch\?.*v=([a-zA-Z0-9_-]+).*$/i,
				urlTemplate : "http://youtube.com/watch?v=URL_ID_0_HERE&hd=1",
				isDefault : true
			}
		],
		isDefault : true
	},
	{
		domain : "amazon.com",
		pages :
		[
			{
				captureGroups : 1,
				capturePattern : /^(?:http|https):\/\/(?:www.)?amazon.com\/(?:.*\/)*dp\/((?:product\/)?[a-zA-Z0-9_-]+)(?:\/)*.*$/i,
				urlTemplate : "http://amazon.com/dp/URL_ID_0_HERE/",
				isDefault : true
			},
			{
				captureGroups : 1,
				capturePattern : /^(?:http|https):\/\/(?:www.)?amazon.com\/(?:.*\/)*gp\/((?:product\/)?[a-zA-Z0-9_-]+)(?:\/)*.*$/i,
				urlTemplate : "http://amazon.com/gp/URL_ID_0_HERE/",
				isDefault : true
			}
		],
		isDefault : true
	},
	{
		domain : "amazon.co.uk",
		pages :
		[
			{
				captureGroups : 1,
				capturePattern : /^(?:http|https):\/\/(?:www.)?amazon.co.uk\/(?:.*\/)*gp\/((?:product\/)?[a-zA-Z0-9_-]+)(?:\/)*.*$/i,
				urlTemplate : "http://amazon.co.uk/gp/URL_ID_0_HERE/",
				isDefault : true
			},
			{
				captureGroups : 1,
				capturePattern : /^(?:http|https):\/\/(?:www.)?amazon.co.uk\/(?:.*\/)*dp\/((?:product\/)?[a-zA-Z0-9_-]+)(?:\/)*.*$/i,
				urlTemplate : "http://amazon.co.uk/dp/URL_ID_0_HERE/",
				isDefault : true
			}
		],
		isDefault : true
	},
	{
		domain : "maps.google.com",
		pages :
		[
			{
				captureGroups : 3,
				capturePattern : /^(?:http|https):\/\/maps.google.com\/maps\?.*(?:q=([',\+a-zA-Z0-9_-]+)).*(?:(?:&|\?)ll=(-?\d+\.\d+,-?\d+\.\d+)).*(?:&z=(\d+)).*$/i,
				urlTemplate : "https://maps.google.com/maps?q=URL_ID_0_HERE&ll=URL_ID_1_HERE&z=URL_ID_2_HERE",
				isDefault : true
			},
			{
				captureGroups : 2,
				capturePattern : /^(?:http|https):\/\/maps.google.com\/maps\?.*(?:q=([',\+a-zA-Z0-9_-]+)).*(?:&z=(\d+)).*$/i,
				urlTemplate : "https://maps.google.com/maps?q=URL_ID_0_HERE&z=URL_ID_1_HERE",
				isDefault : true
			}
		],
		isDefault : true
	}
];