document.addEventListener("DOMContentLoaded", function(_) {

    const rmpPieChart = (() => {
        const chartContainer = document.getElementById('rmpPie');

        const options = {
            chart: {
                type: 'donut'
            },
            series: [
                parseInt(chartContainer.dataset.rmp1), 
                parseInt(chartContainer.dataset.rmp2), 
                parseInt(chartContainer.dataset.rmp3), 
                parseInt(chartContainer.dataset.rmpNonEu), 
                parseInt(chartContainer.dataset.rmpNa),
                parseInt(chartContainer.dataset.rmpNs)
            ],
            labels: ['RMP1', 'RMP2', 'RMP3', 'Non EU RMP', 'Not assigned', 'Not specified'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                            }
                        }
                    }
                }
            }
        }
        
        return new ApexCharts(chartContainer, options);
    })();

    const documentBarChart = (() => {
        const barContainer = document.getElementById('docsBar');

        const options = {
            chart: {
                type: 'bar',
                stacked: true
            },
            series: [{
                name: 'Reported',
                data: [parseInt(barContainer.dataset.pastCollectionWithProtocols), parseInt(barContainer.dataset.pastReportWithResults)]
              }, {
                name: 'Not reported',
                data: [parseInt(barContainer.dataset.pastCollection) - parseInt(barContainer.dataset.pastCollectionWithProtocols), parseInt(barContainer.dataset.pastReport) - parseInt(barContainer.dataset.pastReportWithResults)]
            }],
            plotOptions: {
                bar: {
                  dataLabels: {
                    total: {
                      enabled: true
                    }
                  }
                },
            },
            xaxis: {
                categories: ['Protocols', 'Results']
            }
        }
        
        return new ApexCharts(barContainer, options);
    })();
    

    rmpPieChart.render();
    documentBarChart.render();
});