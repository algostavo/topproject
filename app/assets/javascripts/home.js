window.onload = function () {

var newDataPoints = [];

function newChart(data){

    // var newDataPoints = [];
    data.forEach(function(point) {
        newDataPoints.push({
            x: new Date(point.substr(0,10)),
            y: [point.open, point.high, point.low, point.close]
        })
    })
}


var chart = new CanvasJS.Chart("chartContainer",
{
    title:{
        text: "EUR/USD for 2014",
    },
    exportEnabled: true,
    axisY: {
        includeZero:false,
        prefix: "$",
        title: "",
    },     
    axisX: {
        interval:1,
        valueFormatString: "MMM-DD",
    },
    toolTip: {
        content: "Date:{x}</br><strong>Prices:</strong></br>Open:{y[0]}, Close:{y[3]}</br>High:{y[1]},Low:{y[2]}",
    },
    data: [ //data
    {
        type: "candlestick",
        dataPoints: newDataPoints
    }
    ]
});
chart.render();
}

function requestData() {
$.ajax({
    url: 'index/:chartData',  
    success: function(data) {
        newChart(data);
        console.log(data);        

        // call it again after one day
        setInterval(requestData, 86400000);
       },
       cache: false
    });
}

