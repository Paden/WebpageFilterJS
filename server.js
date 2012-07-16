/***
 * 
 * Author: Paden Portillo
 *
 */

/***
 *        ____                            __                _          
 *       / __ \___  ____  ___  ____  ____/ /__  ____  _____(_)__  _____
 *      / / / / _ \/ __ \/ _ \/ __ \/ __  / _ \/ __ \/ ___/ / _ \/ ___/
 *     / /_/ /  __/ /_/ /  __/ / / / /_/ /  __/ / / / /__/ /  __(__  ) 
 *    /_____/\___/ .___/\___/_/ /_/\__,_/\___/_/ /_/\___/_/\___/____/  
 *              /_/                                                    
 */

var pub       =  __dirname + '/public',
	express   =  require('express'),
	url       =  require('url'),
	WebFilter =  require('./lib/WebFilter'),
	app       =  express.createServer(),
	port      =  8080;

app.configure(function()
{
	 app.use(express.static(pub));
});

function isDefined(obj)
{
	return typeof obj !== 'undefined';
}

app.listen(port);

console.log('Listening on port: ' + port)

/***
 *        ____  ____  __  ___________________
 *       / __ \/ __ \/ / / /_  __/ ____/ ___/
 *      / /_/ / / / / / / / / / / __/  \__ \ 
 *     / _, _/ /_/ / /_/ / / / / /___ ___/ / 
 *    /_/ |_|\____/\____/ /_/ /_____//____/  
 *                                           
 */

app.get('/proxy.html', function(req, res)
{
	var proxiedUrl =  req.query.url;

	if(typeof proxiedUrl === 'undefined')
	{
		res.end('Please specify a url'); return;
	}

	proxiedUrl  =  unescape(proxiedUrl);
	proxiedUrl  =  url.parse(proxiedUrl);

	//
	// WebFilter(urlToGrab, callback)
	//
	WebFilter(proxiedUrl, function(errors, window)
	{
		if(window)
		{
			var $       =  window.$, //jQuery
			    options =  { //filters to apply
		    	emboss    :  isDefined(req.query.emboss),
		    	flip      :  isDefined(req.query.flip),
		    	flop      :  isDefined(req.query.flop),
		    	grayscale :  isDefined(req.query.grayscale),
		    	implode   :  isDefined(req.query.implode),
		    	monochrome:  isDefined(req.query.monochrome),
		    	negative  :  isDefined(req.query.negative),
		    	sepia     :  isDefined(req.query.sepia)
		    };

		    //Transform relative URLs to absolute URLs
		    //Otherwise, relative URLs elements(<link>, <img>, and <a>) would not work.
			$('link,a,img').absolutifyUrls(proxiedUrl);

			//Transform enchor elements to filter through proxy
			//so that filters may be appiled to them
			$('a').proxify('/proxy.html', 'url');

			//The MEAT AND POTATOES!
			//Use this plugin to filter the images on a web page
			$('img').GraphicsMagick(options, function()
			{
				res.send(window.document.innerHTML);
			});
		}
		else
		{
			//Someting bad happen
			res.end(errors.toString());
		}
	});
});