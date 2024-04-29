function buildBadge(text) {
    return '<span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-300">' + text + '</span>'; 
}

document.addEventListener("DOMContentLoaded", function(_) {

    const table = new DataTable('#data', {
        scrollX: true,
        pageLength: 50,
        lengthMenu: [25, 50, 100, { label: 'All', value: -1 }],
        // stateSave: true,
        stateDuration: -1, // 0 for localStorage indefinetly or positive number for specific time, -1 for Session Storage
        order: {
            idx: 3,
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
                fontFamily: 'inherit',
                // redrawOnParentResize: false
            },
            colors: ['#dc2626', '#ea580c', '#facc15', '#22c55e', '#2563eb', '#7e22ce'],
            labels: ['RMP Category 1', 'RMP Category 2', 'RMP Category 3', 'Non EU RMP', 'No RMP', 'Not specified'],
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
            responsive: [
                {
                    breakpoint: 600,
                    options: {
                        legend: {
                            position: 'bottom',
                        }
                    },
                }
            ],
            series: [
                parseInt(chartContainer.dataset.rmp1), 
                parseInt(chartContainer.dataset.rmp2), 
                parseInt(chartContainer.dataset.rmp3), 
                parseInt(chartContainer.dataset.rmpNonEu), 
                parseInt(chartContainer.dataset.rmpNa),
                parseInt(chartContainer.dataset.rmpNs)
            ],
            states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0,
                    }
                },
                hover: {
                    filter: {
                        type: 'lighten',
                        value: 0.01,
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    }
                },
            },
            tooltip: {
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    return '<div>' + buildBadge(w.globals.labels[seriesIndex] + ': ' + series[seriesIndex]) + '</div>';
                }
            }
        }
        
        return new ApexCharts(chartContainer, options);
    })();

    const statePieChart = (() => {
        const chartContainer = document.getElementById('statePie');

        const options = {
            chart: {
                type: 'donut',
                fontFamily: 'inherit',
                // redrawOnParentResize: false
            },
            colors: ['#64748b', '#6366f1', '#34d399'],
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
            responsive: [
                {
                    breakpoint: 600,
                    options: {
                        legend: {
                            position: 'bottom',
                        }
                    },
                }
            ],
            series: [
                parseInt(chartContainer.dataset.planned), 
                parseInt(chartContainer.dataset.ongoing), 
                parseInt(chartContainer.dataset.finalised)
            ],
            states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0,
                    }
                },
                hover: {
                    filter: {
                        type: 'lighten',
                        value: 0.01,
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    }
                },
            },
            tooltip: {
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    return '<div>' + buildBadge(w.globals.labels[seriesIndex] + ': ' + series[seriesIndex]) + '</div>';
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
                stacked: true,
                stackType: 'normal',
                // stackType: '100%',
                fontFamily: 'inherit',
                toolbar: {
                    show: false 
                },
                height: '100%'
            },
            colors: ['#34d399', '#64748b'],
            dataLabels: {
                style: {
                    fontSize: '.75rem',
                    fontWeight: 'bold',
                    // colors: undefined
                },
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            },
            grid: {
                show: false,
            },
            legend: {
                show: false,
            },
            plotOptions: {
                bar: {
                    // horizontal: true,
                    columnWidth: '50%',
                    barHeight: '75%',
                    dataLabels: {
                        total: {
                            enabled: true,
                            offsetY: -4,
                            style: {
                                fontSize: '1rem',
                                fontWeight: 600
                            }
                        }
                    }
                },
            },
            series: [{
                name: 'Reported',
                data: [parseInt(barContainer.dataset.pastCollectionWithProtocols), parseInt(barContainer.dataset.pastReportWithResults)]
              }, {
                name: 'Not reported',
                data: [parseInt(barContainer.dataset.pastCollection) - parseInt(barContainer.dataset.pastCollectionWithProtocols), parseInt(barContainer.dataset.pastReport) - parseInt(barContainer.dataset.pastReportWithResults)]
            }],
            states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0,
                    }
                },
                hover: {
                    filter: {
                        type: 'lighten',
                        value: 0.01,
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    }
                },
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },          
                categories: ['Protocols', 'Results']
            },
            yaxis: {
                show: false,
            }
        }
        
        return new ApexCharts(barContainer, options);
    })();
    

    rmpPieChart.render();
    statePieChart.render();
    documentBarChart.render();

    const mapContainer = document.getElementById('mapChart');

    const map = new Datamap({
        element: mapContainer,
        height: 300,
        width: 400,
        responsive: true,
        projection: 'mercator',
        aspectRatio: 3 / 4,
        geographyConfig: {
            hideAntarctica: true,
            borderWidth: .75,
            // borderOpacity: 1,
            // borderColor: '#212121',
            popupTemplate: function(geography, data) {
              return buildBadge(geography.properties.name);
            },
            popupOnHover: true,
            highlightOnHover: false
        },
        fills: {
            study_centre: '#4338ca',
            defaultFill: '#e2e8f0'
        },
        data: mapContainer.dataset.countries.split('; ').reduce((a, v) => ({ ...a, [v]: {
            "fillKey": "study_centre",
        }}), {})
    });

    window.addEventListener('resize', function(event){
        map.resize();
    });

    const tabsRadio = document.querySelectorAll('input[name="tab"]');
    const tabMap = Array.from(tabsRadio).reduce((prev, cur) => ({ ...prev, [cur.id]: document.getElementById(`${cur.id}Container`) }), {});
    function changeTab(current) {
        for (let [id, container] of Object.entries(tabMap)) {
            if (id == current) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        }

        if (current = "map") {
            map.resize();
        }
    }

    for (element of tabsRadio) {
        element.addEventListener('change', function(event) {
            changeTab(event.target.id);
        });
    }

    changeTab(Array.from(tabsRadio).filter((element) => element.checked)[0].id);

});