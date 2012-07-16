/***
 *
 * Author: Paden
 * Purpose: Transform enchor elements to filter through proxy
 *			so that filters may be appiled to them.
 *
 *
 * Example: http://nodejs.org --> proxy.html?url=nodejs.org
 *
 */
(function($)
{
	$.fn.proxify  =  function(iurl, qsName)
	{
		function proxify(elem, iurl, qsName)
		{
			if(elem.hasAttribute('href'))
			{
				elem.href =  iurl + '?' + qsName + '=' + escape(elem.href);
			}
		}

		return this.each(function()
		{
			proxify(this, iurl, qsName);
		});
	}
})(jQuery);
