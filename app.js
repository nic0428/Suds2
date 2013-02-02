/*jslint maxerr:1000 */

//Create our application namespace
var my = {
	suds : require('suds2'),
	isAndroid : (Ti.Platform.osname === 'android'),
	config : {
		endpoint:"http://www.webservicex.net/CurrencyConvertor.asmx",
	    targetNamespace: 'http://www.webserviceX.NET/',
	    includeNS : true, //Optional (true by default)allows to exclude namespace if needed
	    ns: 'ns0', //Optional (ns0 by default) allows you to update your namespace
	    addTargetSchema : false //Optional (false by default) allows to update target schema 		    	    	
	}	
};


// Create a simple window to show our results
(function(){

	var win = Ti.UI.createWindow({
		backgroundColor:'#fff', layout:'vertical'
	});

	win.add(Ti.UI.createLabel({
		text:"SOAP Service Sample", color:'#000', top:5, height:22, font:{fontWeight:'bold',fontSize:16} 
	}));
	win.add(Ti.UI.createLabel({
		text:"Press Go to see FX Rate for EUR to USD", color:'#000', top:5, height:22, font:{fontSize:14} 
	}));	

	var label = Ti.UI.createLabel({
	    top: 10, left: 10,
	    width: 'auto', height: 'auto',
	    text: 'Press go to start'
	});
	win.add(label);

	var goButton = Ti.UI.createButton({
		title:'Go', left:10, top:10
	});
	win.add(goButton);

	goButton.addEventListener('click',function(e){

		label.text ="Loading...";
			
		try {

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
			            label.text = '1 Euro buys you ' + results.item(0).text + ' U.S. Dollars.';
			        } else {
			            label.text = 'Oops, could not determine result of SOAP call.';
			        }
				});
			
		} catch(e) {
		    Ti.API.error('Error: ' + e);
		}		
	});
	
	win.open();	
	
})();

