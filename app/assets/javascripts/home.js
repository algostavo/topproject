
window.onload = function () {
var dataPoints = []; 

function requestData() {
$.ajax({
    url: 'home/index/gon.chartData',
    data: {},    
    type: 'GET',  
    dataType: 'json',
    success: function(data){   
        console.log(data);           
        newChart(data);
        // call it again after one day
        setInterval(requestData, 86400000);
       },
       cache: false
    });
}

function newChart(data){       
    data.forEach(function(point) {
        dataPoints.push({
            x: new Date(point.substr(0,10).replace(/-/g, ',')),
            y: [point.openMid.value, point.highMid.value, point.lowMid.value, point.closeMid.value]
        })
    })
}

var chart = new CanvasJS.Chart("chartContainer",
{
    title:{
        text: "EUR_USD 2014",
    },
    exportEnabled: true,
    axisY: {
        includeZero:false,
        prefix: "$",
        title: "",
    },     
    axisX: {
        interval:1,
        valueFormatString: "YYYY-MM-DD",
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





//str.replace(/-/g , ',')