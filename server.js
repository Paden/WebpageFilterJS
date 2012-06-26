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

var pub     =  __dirname + '/public'
,   express =  require('express')
,   app     =  express.createServer()
,   port    =  8080
,   jsdom   =  require('jsdom');

app.configure(function()
{
	 app.use(express.static(__dirname + '/public'));
});


jsdom.defaultDocumentFeatures = {
  FetchExternalResources   : [],
  ProcessExternalResources : true,
  MutationEvents           : false,
  QuerySelector            : false
};

app.listen(port);

/***
 *        ____  ____  __  ___________________
 *       / __ \/ __ \/ / / /_  __/ ____/ ___/
 *      / /_/ / / / / / / / / / / __/  \__ \ 
 *     / _, _/ /_/ / /_/ / / / / /___ ___/ / 
 *    /_/ |_|\____/\____/ /_/ /_____//____/  
 *                                           
 */

app.get('/filterURL.html', function(req, res)
{
	console.log('asdf');
	
	jsdom.env(
	{
		html: unescape(req.query.url),
		scripts: [
		    'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'
		],
		done: function(errors, window) 
		{
			console.log('asdf');
			if(window)
			{
				var $ = window.$;

				console.log($);

				$('img').each(function()
				{
					console.dir(this);
					var src       =  this.src
					,   hasDomain =  src.indexOf('http//') > -1;

					if(!hasDomain)
					{
						this.src  =  req.query.url + this.src;
					}
				});

				res.send(window.document.documentElement.innerHTML);
			}
			else
			{
				res.send(errors);
			}
	  	}
	});
});