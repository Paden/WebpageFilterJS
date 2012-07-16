/***
 *
 * Author: Paden
 * Purpose: Transform relative URLs to absolute URLs
 *
 */
(function($)
{
	$.fn.absolutifyUrls  =  function(iurl)
	{
		var url  =  iurl.protocol + '//' + iurl.host;

		function absolutifyUrls(elem)
		{
			var hrefAttributes =  ['href', 'src'];

			for(var i = 0, attrib; attrib = hrefAttributes[i++];)
			{
				if(elem.hasAttribute(attrib))
				{
					var href  =  elem[attrib],
						isAbs =  href.match(/http|https/) != null;

					if(!isAbs)
					{
						if(href.indexOf(0) !== '/')
						{
							href     =  '/' + href;
						}
						elem[attrib] =  url + href;
					}
				}
			}
		}

		return this.each(function(i, elem)
		{
			absolutifyUrls(elem);
		});
	}
})(jQuery);
