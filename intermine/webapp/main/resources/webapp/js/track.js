function drawTimeChart(trackId, title) {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', title);
    var drawTimeChartFunction = function(tracks) {
        data.addRows(tracks);
        var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div' + trackId));
        chart.draw(data, {'displayAnnotations': true, 'displayRangeSelector': false, 'displayLegendDots': false, 'zoomStartTime': calculateStartTime(), 'zoomEndTime': new Date()});
    }
    if (trackId == 'template')
        TrackAjaxServices.getTemplateTracksTrend(drawTimeChartFunction);
    else if (trackId == 'query')
        TrackAjaxServices.getQueryTracksTrend(drawTimeChartFunction);
    else if (trackId == 'login')
        TrackAjaxServices.getLoginTracksTrend(drawTimeChartFunction);
    else if (trackId == 'search')
        TrackAjaxServices.getSearchTracksTrend(drawTimeChartFunction);
    else if (trackId == 'listExecution')
        TrackAjaxServices.getListExecutionTrend(drawTimeChartFunction);
    else if (trackId == 'listCreation')
        TrackAjaxServices.getListCreationTrend(drawTimeChartFunction);
}

function drawTableChart(timeRange, trackId, columnName) {
    var tableChartData = new google.visualization.DataTable();
    tableChartData.addColumn('string', columnName);
    tableChartData.addColumn('number', 'Tracks');
    tableChartData.addColumn('number', 'Users');
    var drawTableChartFunction = function(tracks) {
        tableChartData.addRows(tracks);
        table = new google.visualization.Table(document.getElementById('table_div' + trackId)); 
        table.draw(tableChartData, {alternatingRowStyle: true, width: '600px', page: 'enable', pageSize: 10}); 
    }
    if (trackId == 'query')
        TrackAjaxServices.getQueryTracksDataTable(timeRange, drawTableChartFunction);
    else if (trackId == 'search')
        TrackAjaxServices.getSearchTracksDataTable(timeRange, drawTableChartFunction);
    else if (trackId == 'listExecution')
        TrackAjaxServices.getListExecutionTracksDataTable(timeRange, drawTableChartFunction);
    else if (trackId == 'listCreation')
        TrackAjaxServices.getListCreationTracksDataTable(timeRange, drawTableChartFunction);
  }

function drawPieAndTableChart(timeRange, trackId, columnName) {
    var pieChartData = new google.visualization.DataTable();
    pieChartData.addColumn('string', columnName);
    pieChartData.addColumn('number', 'Tracks');
    pieChartData.addColumn('number', 'Users');

    var tableChartData = new google.visualization.DataTable();
    tableChartData.addColumn('string', columnName);
    tableChartData.addColumn('number', 'Tracks');
    tableChartData.addColumn('number', 'Users');
    
    TrackAjaxServices.getTemplateTracksPercentage(timeRange, function(tracks) {
        for (index = 0; index < 5; index = index + 1) {
            if (tracks[index] != null) {
                pieChartData.addRows([tracks[index]]);
            }
        }
        tableChartData.addRows(tracks);
        var piechart = new google.visualization.PieChart(document.getElementById('piechart_div' + trackId));
        piechart.draw(pieChartData, {width: 450, height: 300, legend: 'left', chartArea:{left:20,top:10,width:"75%",height:"60%"}});
        table = new google.visualization.Table(document.getElementById('table_div' + trackId)); 
        table.draw(tableChartData, {alternatingRowStyle: true, width: '600px', page: 'enable', pageSize: 10}); 
        google.visualization.events.addListener(table, 'select', function() {
            piechart.setSelection(table.getSelection()); }) 
        google.visualization.events.addListener(piechart, 'select', function() { 
            table.setSelection(piechart.getSelection());}) 
    });
  }

function calculateStartTime() {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;
    var currentDate_ms = new Date().getTime();
    var startTime_ms = (currentDate_ms - 30 * ONE_DAY);
    return new Date(startTime_ms);
 }