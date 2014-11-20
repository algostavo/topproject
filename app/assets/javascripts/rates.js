$(function() {

    var oldBid = null;
	var OANDA = {};
	var accountId = '900859'
    var symbols = ['EUR_USD', 'GBP_USD', 'USD_JPY', 'AUD_USD' ]
	OANDA.baseURL =  "https://stream-fxpractice.oanda.com";
	OANDA.auth =  {};
	OANDA.auth.enabled =  true;
	OANDA.auth.token =  "92eb2d8911829720802dda141031945b-942982d88fae70ac1316cc77d1014b4e";

	var setAuthHeader = function(xhr) {
	    xhr.setRequestHeader("Authorization", "Bearer " + OANDA.auth.token);
	};


var sendAjaxRequest = function(endpoint, method, parameters, requiresAuth, onComplete) {
    var contentType = "";
    if(method === 'POST' || method === 'PUT' || method === 'GET') {
        contentType = "application/x-www-form-urlencoded";
    }
    var beforeSend = function() {};
    if(OANDA.auth.enabled && requiresAuth) {
        beforeSend = setAuthHeader;
    }
    var req = $.ajax({
        url: OANDA.baseURL + endpoint, 
        type: method,
        dataType: 'json',
        data : parameters,
        contentType: contentType,
        beforeSend: beforeSend,
    });
    req.always(onComplete);
};

/* Send a raw api request on an endpoint.
 */
OANDA.api = function(endpoint, method, parameters, callback) {

    sendAjaxRequest(endpoint, method, parameters, true, function(jqXHR, textResponse) {
        var response = {};
        if(textResponse != 'success') {
            response.error = { 'HTTPCode' : jqXHR.status };
            try {
                var errorJSON = JSON.parse(jqXHR.responseText);
                $.extend(response.error, errorJSON);
            } catch(e) {
            }
        } else {
            response = jqXHR;
        }
        if(callback) {
            callback(response);
        }
    });
};



		// get rate quotes
	function getCurrentRates() {
        OANDA.rate.quote(symbols, function(response) {
            OANDA.api("/v1/prices", 'GET', {instruments: symbols.join(',')}, callback);
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
            $("#bid").text(bid);
            $("#ask").text(ask);
		    }
        });
	}
		
	//get the symbol list
    //OANDA.rate.instruments(accountId, ['pip', 'precision', 'marginRate'], function(listSymbolsResponse) {
     	//var fieldStr = fields.join(',');
    	//var data = fieldStr ? { "['pip', 'precision', 'marginRate']" : fieldStr , "accountId" : accountId} : {};
    	//OANDA.api("/v1/instruments", 'GET', data, listSymbolsResponse);
        	//for(var cur in listSymbolsResponse.instruments) {
            	//var symbolName = listSymbolsResponse.instruments[cur].instrument;

            	//setSymbol.append("<option value='" + symbolName + "'>" + symbolName + "</option>");
        	//}

        		//select EUR/USD by default
        		//setSymbol.find("[value=EUR_USD]").attr("selected", "selected");
        		//setInterval(getCurrentRates, 1000);
    //});


});
