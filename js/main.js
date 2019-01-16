document.addEventListener("DOMContentLoaded", function () {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawGoogleChart);

    drawAmChart();
});

function drawGoogleChart() {
    var data = google.visualization.arrayToDataTable([
        ['Director (GWh)', 'Rotten Tomatoes', 'IMDB'],
        [420, 95, 7.9],
        [820, 115, 6.4],
        [1170, 125, 6.2],
        [1355, 140, 6.2]
    ]);

    var options = {
        title: 'The decline of \'The 39 Steps\'',
        vAxis: { title: 'Accumulated Rating' },
        isStacked: false,
        areaOpacity: 0
    };

    var chart = new google.visualization.SteppedAreaChart(document.getElementById('google_div'));

    chart.draw(data, options);
}

function drawAmChart() {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("amDiv", am4charts.XYChart);
    chart.paddingRight = 20;

    var data = [{
        "GWh": 0,
        "generador": 95,
        "COP": 0,
        "compra": 200,

        "yTarget": 0,
        "target": 1400,
        "xMax": 0,
        "max": 200

    },
    {
        "GWh": 420,
        "generador": 115,
        "COP": 250,
        "compra": 175
    },
        ,
    {
        "GWh": 820,
        "generador": 125,
        "COP": 730,
        "compra": 155
    },
        ,
    {
        "GWh": 1170,
        "generador": 140,
        "COP": 1240,
        "compra": 140
    },
        ,
    {
        "GWh": 1400,// 1355 + x = break-even
        "generador": 140,
        "COP": 1400,// 1355 + x = break-even
        "compra": 140,

        "yTarget": 230,
        "target": 1400,
        "xMax": 1600,
        "max": 200,

        "xBreakeven": 1355,
        "yBreakeven": 140
    },
    ];

    chart.data = data;

    var dateAxis = chart.xAxes.push(new am4charts.ValueAxis());
    dateAxis.renderer.minGridDistance = 50;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    var series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.valueX = "GWh";
    series.dataFields.valueY = "generador";
    series.tooltipText = "{valueY.value}";
    series.strokeWidth = 3;

    var series2 = chart.series.push(new am4charts.StepLineSeries());
    series2.dataFields.valueX = "COP";
    series2.dataFields.valueY = "compra";
    series2.tooltipText = "{valueY.value}";
    series2.strokeWidth = 3;

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Objetivo";
    lineSeries.dataFields.valueY = "yTarget";
    lineSeries.dataFields.valueX = "target";

    var lineSeries2 = chart.series.push(new am4charts.LineSeries());
    lineSeries2.name = "Tope";
    lineSeries2.dataFields.valueX = "xMax";
    lineSeries2.dataFields.valueY = "max";

    var lineSeries3 = chart.series.push(new am4charts.LineSeries());
    lineSeries3.name = "Equilibrio";
    lineSeries3.dataFields.valueX = "xBreakeven";
    lineSeries3.dataFields.valueY = "yBreakeven";

    var bullet = lineSeries3.bullets.push(new am4charts.Bullet());
    var image = bullet.createChild(am4core.Image);
    image.href = "images/break-even.svg";
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.fullWidthLineX = true;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = chart.colors.getIndex(2);
    chart.cursor.lineX.fillOpacity = 0.1;

    chart.scrollbarX = new am4core.Scrollbar();
}