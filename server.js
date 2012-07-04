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

var pub        =  __dirname + '/public'
  , express    =  require('express')
  , app        =  express.createServer()
  , port       =  8080
  , jsdom      =  require('jsdom')
  , fs         =  require('fs')
  , http       =  require('http')
  , gm         =  require('gm')
  , dlPath     =  __dirname + '/uploads'
  , filterPath =  pub + '/filter' 

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
 
app.get('/filterURL.html', function(req, res)
{
	var url        =  unescape(req.query.url)
	,   jqueryPath =  'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';

	console.log('Accessing...' + url);
	
	jsdom.env(
	{
		html   :  url,
		scripts:  [ jqueryPath ],
		done   :  function(errors, window) 
		{
			if(window)
			{
				var $              =  window.$ //jQuery
				  , href           =  window.location.href
				  , filterURL      =  'filterURL.html?url='
				  , anchorChanges  =  0 
				  , imageChanges   =  0;

				//
				//Modify each anchor to use the filterURL.html
				//
				$('a').each(function()
				{
					if(this.hasAttribute('href'))
					{
						anchorChanges++;

						var url    =  this.href
						  , noHost =  url.match(/http|https/) === null;

						url        =  escape(noHost? href + url : url);
						this.href  =  filterURL + url;
					}
				});

				console.log('Converted ' + anchorChanges + ' Anchors!');	

				//
				//Modify each anchor to use the filterURL.html
				//
				$('img').each(function()
				{
					if(this.hasAttribute('src'))
					{
						imageChanges++;

						var url    =  this.src
						  , noHost =  url.match(/http|https/) === null;

						if(url.indexOf('/') == 0)
						{
							url    =  url.substring(1);
						}

						url        =  noHost? href + url : url;
						this.src   =  flipImage(url);
					}
				});

				console.log('Converted ' + imageChanges + ' Images!');	

				res.send(window.document.documentElement.innerHTML);
			}
			else
			{
				res.send(errors);
			}
	  	}
	});
});

function flipImage(url)
{
	console.log(url);
	try
	{
		console.log('trying...');
		http.get({host:'google.com', path: '/intl/en_ALL/images/srpr/logo1w.png'}, function(res) 
		  {
		  	try
		  	{
		  		var stream = fs.createWriteStream("clown.jpg");
		    	res.pipe(stream);
		  	}
		  	catch(e1)
		  	{
		  		console.log('not trying hard enough2 :' + e1);
		  	}
		  } 
		);
	}
	catch(e)
	{
		console.log('not trying hard enough:' + e);
	}
	

	return url;
}