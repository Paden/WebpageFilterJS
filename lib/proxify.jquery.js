(function($)
{
	$.fn.proxify  =  function(iurl, qsName)
	{
		function proxify(elem)
		{
			if(elem.hasAttribute('href'))
			{
				elem.href =  iurl + '?' + qsName + '=' + escape(elem.href);
			}
		}

		return this.each(function(i, elem)
		{
			proxify(elem);
		});
	}
})(jQuery);
