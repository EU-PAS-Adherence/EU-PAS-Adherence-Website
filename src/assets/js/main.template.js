document.addEventListener("DOMContentLoaded", function(event) {
    // const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

    // const header = document.getElementById('data').querySelector('thead');
    // console.log(header.clientHeight);

    const table = new DataTable('#data', {
        // scrollY: height * 0.5,
        pageLength: 50,
        lengthMenu: [50, 100, 250, { label: 'All', value: -1 }],
        // stateSave: true,
        stateDuration: -1, // 0 for localStorage indefinetly or positive number for specific time, -1 for Session Storage
        order: {
            idx: 1,
            dir: 'desc'
        },
        fixedHeader: {
            header: true,
            headerOffset: 0
        },
    });
});