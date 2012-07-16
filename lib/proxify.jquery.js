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
