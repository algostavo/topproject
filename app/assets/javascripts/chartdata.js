var chart; // global

$(function () {

function requestData() {
    $.ajax({
		//type: 'GET'
		url: 'home/index',
		success: function(point) {
			var series = chart.series[0],
			shift = series.data.length > 1;  // shift if the series is longer than 20
			
			//add the point
			//chart.series[0].addPoint(point, true, shift);
			
			// call it again after one day
			setTimeout(requestData, 86,400,000);
		},
		cache: false
	});
}
        
        
		
$(document).ready(function(){
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'container',
			defaultSeriesType: 'candlestick',
			events: {
				load: requestData
			}
		},		
            rangeSelector : {
                selected : 1
            },

            title : {
                text : 'EUR/USD Currency Pair'
            },

            series : [{
                name : 'EUR/USD',
                data : [],
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });

});