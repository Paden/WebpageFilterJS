var url     =  require('url'),
	fs      =  require('fs'),
    request =  require('request');

function WebImage(savePath, iurl)
{
	this.imageUrl =  url.parse(iurl);
	this.savePath =  savePath;
}

WebImage.prototype.save()
{
	var savePath  =  this.savePath + this.imageUrl.pathname,
	    urlPath   =  this.imageUrl.href;

	request(urlPath).pipe(fs.createWriteStream(savePath));
};
/*WebImage.prototype.save(callback)
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
    		var path  =  this.savePath + this.imageUrl.pathname;
	        fs.writeFile(path, imagedata, 'binary', callback);
	    });
    });
};*/


exports = module.exports =  WebImage;