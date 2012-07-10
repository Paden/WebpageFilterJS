var WebImage  =  require('./WebImage'); 

function WebImageList()
{
	this.list =  [];
};

WebImagelist.prototype.add  =  function(path)
{
	return this.list.push(new WebImage(path));
};

WebImagelist.prototype.save =  function(path, callback)
{
	var images    =  this.list,
	    countdown =  images.length,
	    errorList =  [];

	function asyncSeries(err)
	{
		if(err)
		{
			errorList.push(err);
		}

		if(--countdown <= 0)
		{
			callback(errorList);
		}
	}

	for(var i = 0; i < images.length; i++)
	{
		images[i].save(path, asyncSeries);
	}  
};