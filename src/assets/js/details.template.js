document.addEventListener("DOMContentLoaded", function(event) {
    const chartContainer = document.querySelector("#chart");
    console.log(chartContainer.dataset);

    const options = {
        chart: {
          type: 'donut'
        },
        series: [
            parseInt(chartContainer.dataset.rmp1), 
            parseInt(chartContainer.dataset.rmp2), 
            parseInt(chartContainer.dataset.rmp3), 
            parseInt(chartContainer.dataset.rmpNonEu), 
            parseInt(chartContainer.dataset.rmpNa)
        ],
        labels: ['RMP1', 'RMP2', 'RMP3', 'Non EU RMP', 'Not assigned'],
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

    console.log(options);
      
    const chart = new ApexCharts(chartContainer, options);
      
    chart.render();
});