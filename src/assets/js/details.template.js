document.addEventListener("DOMContentLoaded", function(_) {

    const table = new DataTable('#data', {
        scrollX: true,
        pageLength: 50,
        lengthMenu: [50, 100, 250, { label: 'All', value: -1 }],
        // stateSave: true,
        stateDuration: -1, // 0 for localStorage indefinetly or positive number for specific time, -1 for Session Storage
        order: {
            idx: 0,
            dir: 'asc'
        },
        fixedHeader: {
            header: true,
            headerOffset: 0
        }
    });

    const rmpPieChart = (() => {
        const chartContainer = document.getElementById('rmpPie');

        const options = {
            chart: {
                type: 'donut',
                zoom: {
                    enabled: false
                }
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
            },
            colors: ['#dc2626', '#ea580c', '#facc15', '#22c55e', '#2563eb', '#7e22ce']
        }
        
        return new ApexCharts(chartContainer, options);
    })();

    const statePieChart = (() => {
        const chartContainer = document.getElementById('statePie');

        const options = {
            chart: {
                type: 'donut',
                zoom: {
                    enabled: false
                }
            },
            series: [
                parseInt(chartContainer.dataset.planned), 
                parseInt(chartContainer.dataset.ongoing), 
                parseInt(chartContainer.dataset.finalised)
            ],
            labels: ['Planned', 'Ongoing', 'Finalised'],
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
            },
            colors: ['#14b8a6', '#0284c7', '#6d28d9']
        }
        
        return new ApexCharts(chartContainer, options);
    })();

    const documentBarChart = (() => {
        const barContainer = document.getElementById('docsBar');

        const options = {
            chart: {
                type: 'bar',
                stacked: true,
                zoom: {
                    enabled: false
                }
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
    statePieChart.render();
    documentBarChart.render();

    const mapContainer = document.getElementById('map');

    const map = new Datamap({
        element: mapContainer,
        responsive: true,
        projection: 'mercator',
        aspectRatio: 1,
        geographyConfig: {
            hideAntarctica: true,
            borderWidth: 1.2,
            // borderOpacity: 1,
            // borderColor: '#212121',
            popupTemplate: function(geography, data) { //this function should just return a string
              return '<span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-300">' + geography.properties.name + '</span>';
            },
            popupOnHover: true,
            highlightOnHover: false
        },
        fills: {
            study_centre: '#6d28d9',
            defaultFill: '#e2e8f0'
        },
        data: mapContainer.dataset.countries.split('; ').reduce((a, v) => ({ ...a, [v]: {
            "fillKey": "study_centre",
        }}), {})
    });

    window.addEventListener('resize', function(event){
        map.resize();
    });

});