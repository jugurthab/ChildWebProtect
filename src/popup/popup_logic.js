

function getGeneralOverviewBoard(main_content){
    var visitedSitesNb = document.createElement("p");
    var visitedSitesNbText = document.createTextNode("Nb. Visited sites (last 24h) : ");
    visitedSitesNb.appendChild(visitedSitesNbText);

    var suspectedSitesNb = document.createElement("p");
    var suspectedSitesNbText = document.createTextNode("Suspected (last 24h) : ");
    suspectedSitesNb.appendChild(suspectedSitesNbText);
    
    main_content.innerHTML = "";
    main_content.appendChild(visitedSitesNb);
    main_content.appendChild(suspectedSitesNb);
}


function getStatistics(main_content){

    var statCanvas = document.createElement("canvas");

    var ctx = statCanvas.getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


    main_content.innerHTML = "";
    main_content.appendChild(statCanvas);
}


function getBlockedContent(main_content){
    /*
<div id="block_menu_blocked_content">
                    <p>Blocked (last 24h) : <span id="block_menu_blocked_content_blocked"></span></p>
                    <div>Tried to view : 
                        <ul id="block_menu_blocked_content_blocked_view">

                        </ul>
                    </div>
                </div>
    */

    var blockedSitesNb = document.createElement("p");
    var blockedSitesNbText = document.createTextNode("Blocked (last 24h) : ");
    blockedSitesNb.appendChild(blockedSitesNbText);

    var listBlockedSitesNb = document.createElement("div");
    var listBlockedSitesNbText = document.createTextNode("Tried to view : ");
    listBlockedSitesNb.appendChild(listBlockedSitesNbText);

    main_content.innerHTML = "";
    main_content.appendChild(blockedSitesNb);
    main_content.appendChild(listBlockedSitesNb);
}

function updateNavigationMenuSelectedStyle(selectedMenuOn, unselectedMenu1, unselectedMenu2){
    selectedMenuOn.style.background = '#AAA';
    unselectedMenu1.style.background = '#333';
    unselectedMenu2.style.background = '#333';
}

document.addEventListener('DOMContentLoaded', function(event) {

    var navigation_menu_general_overview = document.getElementById('navigation_menu_general_overview');
    var navigation_menu_statistics = document.getElementById('navigation_menu_statistics');
    var navigation_menu_blocked_content = document.getElementById('navigation_menu_blocked_content');

    var main_content = document.getElementById('main_content');

    navigation_menu_general_overview.addEventListener('click', function(event_click){
        updateNavigationMenuSelectedStyle(navigation_menu_general_overview, navigation_menu_statistics, navigation_menu_blocked_content);
        getGeneralOverviewBoard(main_content)
    });

    navigation_menu_statistics.addEventListener('click', function(event_click){
        updateNavigationMenuSelectedStyle(navigation_menu_statistics, navigation_menu_general_overview, navigation_menu_blocked_content);
        getStatistics(main_content);
    });

    navigation_menu_blocked_content.addEventListener('click', function(event_click){
        updateNavigationMenuSelectedStyle(navigation_menu_blocked_content, navigation_menu_general_overview, navigation_menu_statistics);
        getBlockedContent(main_content);
    });

    updateNavigationMenuSelectedStyle(navigation_menu_general_overview, navigation_menu_statistics, navigation_menu_blocked_content);
    getGeneralOverviewBoard();
});
