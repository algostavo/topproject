<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js"></script>
<script type="application/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="http://developer.oanda.com/oandajs/oanda.js"></script>
<script type="text/javascript">
$(function() {
    var setSymbol = ['EUR_USD','GBP_USD','USD_JPY','AUD_USD'];
    var oldBid = null;
	var OANDA = {};

	OANDA.baseURL = "https://stream-fxpractice.oanda.com";
	OANDA.auth = {};
	OANDA.auth.enabled = true;
	OANDA.auth.token = "92eb2d8911829720802dda141031945b-942982d88fae70ac1316cc77d1014b4e";

	var setAuthHeader = function(xhr) {
	    xhr.setRequestHeader("Authorization", "Bearer " + OANDA.auth.token);
	};
	 
	
		// get rate quotes
	function getCurrentRates() {	
        OANDA.rate.quote(['EUR_USD'], function(response) {
		    if(response && !response.error) {
		           var bid = response.prices[0].bid;
		           var ask = response.prices[0].ask;

            //change the divs' background colour if the rates have changed. TODO: some jQuery animation would be nice:)
            if(oldBid && bid < oldBid) {
                $("#quote-panel").css("background-color", "#dd0000");
            } else if(oldBid && bid > oldBid) {
                $("#quote-panel").css("background-color", "#00dd00");
            } else {
                $("#quote-panel").css("background-color", "#ffffff");
            }
            oldBid = bid;

            //update the displayed rates
            $("bid").text(bid);
            $("ask").text(ask);
		}
        });		
	}	

    //get the symbol list
    //OANDA.rate.instruments(900859, ['pip', 'precision', 'marginRate'], function(listSymbolsResponse) {
    //	var fieldStr = fields.join(',');
    //	var data = fieldStr ? { "['pip', 'precision', 'marginRate']" : fieldStr , "900859" : accountId} : {};
    //	OANDA.api("/v1/instruments", 'GET', data, listSymbolsResponse);
      //  	for(var cur in listSymbolsResponse.instruments) {
        //    	var symbolName = listSymbolsResponse.instruments[cur].instrument;

          //  	setSymbol.append("<option value='" + symbolName + "'>" + symbolName + "</option>");
        	//}

        		//select EUR/USD by default
        	//	setSymbol.find("[value=EUR_USD]").attr("selected", "selected");
        	//	setInterval(getCurrentRates, 1000);
    //});

});
</script>