var chart; // global

$(function () {

function requestData() {
    $.ajax({
		url:  'home/index' ,
		data: '@chartData',
		success: function(data) {
			//var seriesData = [];
			//var series = chart.series[0],
			shift = series.data.length > 1;  // shift if the series is longer than 20
			
			//console.log(candle)
			//add the point
			//chart.series[0].addPoint(point, true, shift);
			
			// call it again after one day
			setInterval(requestData, 86400000);
		},
		cache: false
	});
}
        
        
		
$(document).ready(function(){
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'container',
			type: 'candlestick',
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