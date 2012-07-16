/***
 *
 * Author: Paden
 * Purpose: Manipulate and rehost images given filter(s)
 *
 */
(function($)
{
	//Filter options
	var defaults =  {
    	emboss    :  false,
    	flip      :  false,
    	flop      :  false,
    	grayscale :  false,
    	implode   :  false,
    	monochrome:  false,
    	negative  :  false,
    	sepia     :  false
    };

	$.fn.GraphicsMagick  =  function(options, callback)
	{
		options   =  options || {}; 
		options   =  $.extend({}, defaults, options);  

		var require  =  __ServerRequire,
		    console  =  __ServerConsole,
		    total    =  this.size(),
		    url      =  require('url'),
			fs       =  require('fs'), 
			gm       =  require('gm'), //GraphicsMagick module
		    request  =  require('request'),
		    path     =  require('path'),
		    File     =  require ('file-utils').File,
		    savePath =  path.normalize(__dirname + '/../public/');

		//
		//elem = <img> element to manipulate
		//done = call when manipulation is complete, once all <img> are
		//       manipulated a callback is sent to the invoker
		//
		function GraphicsMagick(elem, done)
		{
			var imageUrl  =  url.parse(elem.src),
				relPath   =  path.normalize('/uploads/' + imageUrl.hostname + '/' + imageUrl.pathname),
			    filePath  =  path.normalize(savePath + relPath),
			    dirPath   =  filePath.substring(0, filePath.lastIndexOf('/')+1),
				f         =  new File(filePath),
			    dir       =  new File(dirPath);

			//create directory if doesn't exist
			dir.createDirectory(function(error, created)
			{
				if(!error)
				{	
					//create file if doesn't exist
					f.createNewFile(function (error, created)
					{
						if(!error)
						{
							var imgRequest  =  gm(request(imageUrl.href))

							//apply selected filters
							if(options.emboss)
								imgRequest.emboss()
							if(options.flip)
								imgRequest.flip()
							if(options.flop)
								imgRequest.flop()
							if(options.grayscale)
								imgRequest.colorspace('GRAY')
							if(options.implode)
								imgRequest.implode()
							if(options.monochrome)
								imgRequest.monochrome()
							if(options.negative)
								imgRequest.negative()
							if(options.sepia)
								imgRequest.sepia()

							//Save image manipulation and update elem.src
							//to rehosted path
							imgRequest.stream(function (err, stdout, stderr) 
							{
							  	stdout.pipe(fs.createWriteStream(filePath), { end: false });
							  	stdout.on('end', function()
							  	{
							  		elem.src = relPath;
									done();
							  	});
							});
						}
						else { done(error); }
					});
				}
				else { done(error); }
			});
		}

		//for each <img> object
		return this.each(function()
		{
			var errors   =  [];

			//
			//Second param (function): call when manipulation is complete, once all <img> are
		    //  manipulated a callback is sent to the invoker
			//
			GraphicsMagick(this, function(err) 
			{
				if(err) { errors.push(err); }

				if(--total <= 0)
				{
					//All images are complete
					//now tell the invoker
					callback(errors);
				}
			});
		});
	}
})(jQuery);