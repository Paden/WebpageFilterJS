var WebImage  =  require('./WebImage'); 

function WebImageList()
{
	this.list =  [];
};

WebImagelist.prototype.add  =  function(savePath, iurl)
{
	return this.list.push(new WebImage(savePath, iurl));
};

WebImagelist.prototype.save =  function()
{
	var images    =  this.list;

	for(var i = 0; i < images.length; i++)
	{
		images[i].save();
	}  
};

exports = module.exports =  WebImageList;