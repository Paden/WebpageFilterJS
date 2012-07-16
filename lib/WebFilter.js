/***
 * 
 * Author: Paden Portillo
 *
 * Purpose: WebFilter grabs a url, puts it in a DOM/BOM object
 *          then loads server-side jQuery options to the DOM/BOM
 *          for the developer to use.
 */
var jsdom    =  require('jsdom'),
	url      =  require('url'),
	filepath =  'file://' + __dirname;

function WebFilter(proxiedUrl, callback)
{
	var scripts =  	['http://code.jquery.com/jquery-1.7.1.min.js', //jQuery
					 filepath + '/absolutifyUrls.jquery.js', 
					 filepath + '/proxify.jquery.js',
					 filepath + '/GraphicsMagick.jquery.js'];

	var options =  {
		FetchExternalResources   : ['img', 'css'],
		ProcessExternalResources : false,
		MutationEvents           : false,
		QuerySelector            : false
	};

	//Download page and transform into DOM/BOM
	jsdom.env(proxiedUrl.href, scripts, options, function(errors, window)
	{
		//for debug and Server-Side uses
		if(window)
		{
			window.__ServerRequire  =  require;
			window.__ServerConsole  =  console;
			window.__dirname        =  __dirname;
		}

		callback(errors, window);
	});
}

exports =  module.exports  =  WebFilter;