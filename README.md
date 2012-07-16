# Synopsis
A web app that laods a web page in a iFrame. The user is then given options/filters
to apply to the images on that web page.

## Install
> git clone https://github.com/Paden/WebpageFilterJS

> cd WebpageFilterJS/

> npm install

##Run
> node server.js

## Running
Once running, point your browser to port 8080 on your server and enter a URL and 
check off the filters! That's it!

## Quit
Hit `ctrl+c`

## Module WebFilter.js API:

Method invoke: WebFilter(url, callback)

callback returns: function(errors, window)

window is DOM/BOM of the url input

window is given three server-side jQuery plugins:
- window.$.fn.absolutifyURls()
- window.$.fn.proxify()
- window.$.fn.GraphicsMagick()

See these source files for more details.
Note: GraphicsMagick plugin only manipulates img elements,
      it does not transform css images such as url('image.png').

## Further documentation in the comments of the each module
Enjoy!