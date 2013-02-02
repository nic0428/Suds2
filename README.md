<h1>SUDS2.js<h2>

SUDS2 is a fork of [Kevin Whinnery's](https://twitter.com/kevinwhinnery) [JavaScript SOAP Client Library](https://github.com/kwhinnery/Suds).  

<h2>Suds2: A SOAP Client Library for Titanium Mobile</h2>

<h2>Usage</h2>

<h3>Require suds into your project</h3>
<pre><code>
//Create our application namespace
var my = {
	suds : require('suds2'),
	isAndroid : (Ti.Platform.osname === 'android'),
	config : {
		endpoint:"http://www.webservicex.net/CurrencyConvertor.asmx",
	    targetNamespace: 'http://www.webserviceX.NET/'		    	    	
	}	
};	
</code></pre>


<h3>Calling a service</h3>
<pre><code>
	var sudsClient = new my.suds(my.config);
    sudsClient.invoke('ConversionRate', 
    	{
		    FromCurrency: 'EUR',
		    ToCurrency: 'USD'
		}, 
		function(xmlDoc) {
	    	var results = xmlDoc.documentElement.getElementsByTagName('ConversionRateResult');
	        if (results && results.length>0) {
	            var result = results.item(0);
	            Ti.API.info('1 Euro buys you ' + results.item(0).text + ' U.S. Dollars.');
	        } else {
	            Ti.API.info('Oops, could not determine result of SOAP call.');
	        }
		});
</code></pre>		
## API

The following is the current API documentation for Suds, which consists of a constructor for the client and an `invoke`
method on the client to call specific services on your endpoint.  Impressive, no?

### `SudsClient(options)`

Constructor for a Suds SOAP web service client.

* options - A JavaScript object containing the following properties:
	* endpoint - the SOAP endpoint you will be using
	* targetNamespace - the namespace for your service data structures and prefix for SOAP actions - will be in your service WSDL
	* envelopeBegin (optional) - a string containing the XML preceding the contents of the SOAP request body
	* envelopeEnd (optional) - a string containing the XML following the contents of the SOAP request body
	* authorization (optional) - a string used to specify basic HTTP authorization in the request header
	* includeNS (optional) - a boolean (ns0 by default) allows to exclude namespace if needed
	* ns (optional) -  a string, ns0 by default, allows you to update your namespace
	* addTargetSchema (optional) - a boolean, alse by default, allows to update target schema 

	
### `sudsClient.invoke(soapAction, body, callback(xmlDoc))`

Invoke a SOAP action on the web service defined by this Suds instance.

* soapAction - the web service method to invoke
* body - can be one of:
	* An XML string containing the SOAP request body, constructed manually
	* A JavaScript object containing a hierarchical data structure which can be converted to XML
* callback - a callback function to process the request result, with the following information
	* [this] - `this` inside your callback will refer to the XHR object used to make the SOAP web service call
	* xmlDoc - An [XML Document Object](http://www.w3schools.com/Dom/default.asp) containing the SOAP response
	
## Examples

For a working example see the included [app.js](http://github.com/benbahrenburg/Suds2/blob/master/app.js).
