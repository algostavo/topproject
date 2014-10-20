var chart; // global

$(function () {

function requestData() {
    $.ajax({
		//type: 'GET'
		url: 'home/index' ,
		success: function(data) {
			//var rateData = <%= @rateData.to_json %>;
			var dataParsed = JSON.parse(rateData);
			var candle = [];
			var obj = dataParsed;
			for(i in obj){
				var temp = [];
				temp.push("time");
				temp.push(obj[i].time);
				temp.push("openMid");
				temp.push(obj[i].openMid);
				temp.push("highMid");
				temp.push(obj[i].highMid);
				temp.push("lowMid");
				temp.push(obj[i].lowMid);
				temp.push("closeMid");
				temp.push(obj[i].closeMid);
				candle.push(temp);
			}

			return candle;

			//var seriesData = [];
			//for (var i = 0; i < data.length; i++) {
				//var candletring = data[i].x;
				 //var x = candletring.remove(/ /);
			//}
			
			//var series = chart.series[0],
			//shift = series.data.length > 1;  // shift if the series is longer than 20
			
			console.log(candle)
			//add the point
			//chart.series[0].addPoint(point, true, shift);
			
			// call it again after one day
			setTimeout(requestData, 86400000);
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