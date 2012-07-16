(function($)
{
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
		if(!callback)
		{
			callback  =  options;
			options   =  {};
		}

		$.extend(options, defaults);  

		var require  =  __ServerRequire,
		    console  =  __ServerConsole,
		    total    =  this.size(),
		    url      =  require('url'),
			fs       =  require('fs'),
			gm       =  require('gm'),
		    request  =  require('request'),
		    path     =  require('path'),
		    File     =  require ('file-utils').File,
		    savePath =  path.normalize(__dirname + '/../public/');

		function GraphicsMagick(elem, done)
		{
			var imageUrl  =  url.parse(elem.src),
				relPath   =  path.normalize('/uploads/' + imageUrl.hostname + '/' + imageUrl.pathname),
			    filePath  =  path.normalize(savePath + relPath),
			    dirPath   =  filePath.substring(0, filePath.lastIndexOf('/')+1),
				f         =  new File(filePath),
			    dir       =  new File(dirPath);

			dir.createDirectory(function(error, created)
			{
				if(!error)
				{
					f.createNewFile(function (error, created)
					{
						if(!error)
						{
							var imgReq  =  gm(request(imageUrl.href))

							if(options.emboss)
								imgReq.emboss()
							if(options.flip)
								imgReq.flip()
							if(options.flop)
								imgReq.flop()
							if(options.grayscale)
								imgReq.grayscale()
							if(options.implode)
								imgReq.implode()
							if(options.monochrome)
								imgReq.monochrome()
							if(options.negative)
								imgReq.negative()
							if(options.sepia)
								imgReq.sepia()

							imgReq.stream(function (err, stdout, stderr) 
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

		return this.each(function()
		{
			var errors  =  [];
			GraphicsMagick(this, function(err)
			{
				if(err) { errors.push(err); }

				if(--total <= 0)
				{
					callback(errors);
				}
			});
		});
	}
})(jQuery);