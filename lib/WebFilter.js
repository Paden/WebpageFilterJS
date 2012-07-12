var jsdom    =  require('jsdom'),
	filepath =  'file://' + __dirname;

function WebFilter(proxiedUrl, callback)
{
	var scripts =  	['http://code.jquery.com/jquery-1.7.1.min.js', 
					 filepath + '/absolutifyUrls.jquery.js',
					 filepath + '/proxify.jquery.js'];

	var options =  {
		FetchExternalResources   : ['img', 'css'],
		ProcessExternalResources : false,
		MutationEvents           : false,
		QuerySelector            : false
	};

	jsdom.env(proxiedUrl.href, scripts, options, callback);
}

exports =  module.exports  =  WebFilter;