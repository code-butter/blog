function handler(event) {
	var request = event.request;
	var host = request.headers.host.value;
	if (host.startsWith('www.')) {
		var newHost = host.replace(/^www\./, '');
		return {
			statusCode: 301,
			statusDescription: 'Found',
			headers: {
				'location': { 'value': `https://${newHost}${request.uri}` }
			}
		};
	}
	if (request.uri.endsWith("/")) {
		request.uri += "index.html";
	}
	return request;
}