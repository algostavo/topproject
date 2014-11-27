var dataPoints = [];

window.onload = function () {

function newChart(data){
    data.forEach(function(point) {
        dataPoints.push({
            x: new Date(point.substr(0,10)),
            y: [point.openMid, point.highMid, point.lowMid, point.closeMid]
        })
    })
}

function requestData() {
$.ajax({
    url: 'home/index',
    data: '<%= @chartData %>',      
    //dataType: 'json',
    success: function(data){   
        console.log(data);           
        newChart(data);
        // call it again after one day
        setInterval(requestData, 86400000);
       },
       cache: false
    });
}


var chart = new CanvasJS.Chart("chartContainer",
{
    title:{
        text: "EUR_USD for 2014",
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
        dataPoints: dataPoints
    }
    ]
});
chart.render();
}

