var MAX_DB_RETURNED_RESULTS = 5;

function getGeneralOverviewBoard(main_content){
    var db;
    var nbBlockedSites = 0;
    var request = window.indexedDB.open("childWebProtect", 1);

    request.onerror = function(event) {
        console.log("error: ");
    };

    request.onsuccess = function(event) {
        db = request.result;
        console.log("success: "+ db);
        var objectStore = db.transaction(["prohibitweb"], "readonly").objectStore("prohibitweb");

        objectStore.openCursor().onsuccess = function(event) {
           var cursor = event.target.result;

           if (cursor) {
                nbBlockedSites += parseInt(cursor.value.nbAccessTime);    
                cursor.continue();
           } else {
                console.log("No more entries!");
                chrome.storage.sync.get("totalvbsites",function(items) {
                   
                    var visitedSitesNb = document.createElement("p");
                    var visitedSitesNbText = document.createTextNode("Nb. Visited sites (last 24h) : " + items.totalvbsites);
                    visitedSitesNb.appendChild(visitedSitesNbText);

                    var suspectedSitesNb = document.createElement("p");
                    var suspectedSitesNbText = document.createTextNode("Suspected (last 24h) : "  + nbBlockedSites.toString());
                    suspectedSitesNb.appendChild(suspectedSitesNbText);
                        

                    main_content.innerHTML = "";
                    main_content.appendChild(visitedSitesNb);
                    main_content.appendChild(suspectedSitesNb);
                });
                
           }

        };
        
    };
}


function getStatistics(main_content){
    var db;
    var i = 0;
    var dbData = [];
    var dbDataSites = [];
    var request = window.indexedDB.open("childWebProtect", 1);

    request.onerror = function(event) {
        console.log("error: ");
    };

    request.onsuccess = function(event) {
        db = request.result;
        console.log("success: "+ db);
        var objectStore = db.transaction(["prohibitweb"], "readonly").objectStore("prohibitweb");

        objectStore.index('nbAccessTime').openCursor(null, "prev").onsuccess = function(event) {
           var cursor = event.target.result;

           if (cursor && i < MAX_DB_RETURNED_RESULTS) {
                dbData.push(parseInt(cursor.value.nbAccessTime));
                dbDataSites.push(cursor.value.site);
                i += 1;    
                cursor.continue();
           } else {
              console.log("No more entries!");
           }

        };
        
        var statCanvas = document.createElement("canvas");

        var ctx = statCanvas.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: dbDataSites,
                datasets: [{
                    label: '# of visits',
                    data: dbData,
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
    };


}


function getBlockedContent(main_content){
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
        getGeneralOverviewBoard(main_content);
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
    getGeneralOverviewBoard(main_content);
});
