$(document).ready(function () {
    var title = {
        text: 'Product Pickup'
    };
    var credits = {
        text: 'Perch Interactive',
        href: 'https://www.perchinteractive.com/'
    };

    var subtitle = {
        text: 'Source: Perch Interactive'
    };
    var xAxis = {
        categories: charts_data.days
    };
    var yAxis = {
        title: {
            text: 'Engagement Interaction'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };

    var tooltip = {
        valueSuffix: '\xB0'
    }
    var legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    };
    var series = charts_data.products_data

    var json = {};
    json.title = title;
    json.credits = credits;
    json.subtitle = subtitle;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.legend = legend;
    json.series = series;

    $('#container-line').highcharts(json);


//    Pie Chart

    var pie_chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var pie_title = {
        text: 'Overall Product Popularity'
    };
    var pie_tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var pie_plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',

            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                        'black'
                }
            }
        }
    };
    var pie_series = charts_data.piechart_product_data;
    var pie_json = {};
    pie_json.chart = pie_chart;
    pie_json.title = pie_title;
    pie_json.credits = credits;
    pie_json.tooltip = pie_tooltip;
    pie_json.series = pie_series;
    pie_json.plotOptions = pie_plotOptions;
    $('#container-pie').highcharts(pie_json);
});
