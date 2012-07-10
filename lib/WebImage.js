var url  =  require('url'),
	fs   =  require('fs'),
    http =  require('http');

function WebImage(path)
{
	this.imageUrl  =  url.parse(path); 
}

WebImage.prototype.save(path, callback)
{
	http.request(this.imageUrl, function(res)
	{
		var imagedata =  '';
		res.setEncoding('binary');

	    res.on('data', function(chunk)
	    {
	        imagedata += chunk
	    });

    	res.on('end', function()
    	{
    		path  +=  this.imageUrl.pathname;
	        fs.writeFile(path, imagedata, 'binary', callback);
	    });
    });
};


exports = module.exports =  WebImage;