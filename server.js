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
	url       =  require('url'),
	express   =  require('express'),
	WebFilter =  require('./lib/WebFilter'),
	app       =  express.createServer(),
	port      =  8080;

app.configure(function()
{
	 app.use(express.static(pub));
});

app.listen(port);

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
	if(typeof req.query.url === 'undefined')
	{
		res.end('Please specify a url'); return;
	}

	req.query.url   =  unescape(req.query.url);
	var proxiedUrl  =  url.parse(req.query.url);

	WebFilter(proxiedUrl, function(errors, window)
	{
		if(window)
		{
			var $  =  window.$;

			$('link,a,img').absolutifyUrls(proxiedUrl);
			$('a').proxify('/proxy.html', 'url');

			res.send(window.document.innerHTML);
		}
		else
		{
			res.end(errors.toString());
		}
	});
	
});