var REDIRECTION_LINK = 'https://www.google.com/';
// Initialize IndexedDB with blocked websites

function init_main(){
    var db;
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || 
    window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || 
    window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
         
    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }

    const prohibitedWebsites = [
        /* Premium PORN websites */
        { id: "00001", site: "brazzers.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00002", site: "pornhubpremium.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00003", site: "rk.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00004", site: "czechav.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00005", site: "mofosnetwork.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00006", site: "babes.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00007", site: "fantasyhd.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00008", site: "exotic4k.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00009", site: "met-art.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00010", site: "digitalplaygroundnetwork.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00011", site: "punishtube.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00012", site: "swankpass.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00013", site: "pascalssubsluts.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00014", site: "twistysnetwork.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00015", site: "passion-hd.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00016", site: "povd.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00017", site: "fakehub.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00018", site: "pornprosnetwork.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00019", site: "vivid.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00020", site: "naughtyamerica.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00021", site: "teamskeet.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00022", site: "clubseventeen.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00023", site: "videobox.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00024", site: "nubilefilms.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00025", site: "bang.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00026", site: "dogfartnetwork.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00027", site: "hustler.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00028", site: "wickedpictures.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00029", site: "x-art.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00030", site: "vixen.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00031", site: "xxxpawn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00032", site: "tushy.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00033", site: "ftvgirls.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00034", site: "gamelink.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00035", site: "playboy.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00036", site: "met-art.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00037", site: "julesjordan.com", dateLastAccess: "00", nbAccessTime : 0},
        /* Vintage XXX wesites */
        { id: "00038", site: "theclassicporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00039", site: "vcaxxx.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00040", site: "tubepornclassic.com", dateLastAccess: "00", nbAccessTime : 0},
        /* French XXX Pro wesites */
        { id: "00041", site: "tukif.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00042", site: "coqnu.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00043", site: "pornodingue.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00044", site: "roadsexe.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00045", site: "mypornmotion.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00046", site: "pornovore.fr", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00047", site: "citronnemoi.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00048", site: "mrsexe.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00049", site: "bonporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00050", site: "sexetag.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00051", site: "pegasproduction.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00052", site: "aphroditeporntube.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00053", site: "absoluporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00054", site: "coqporno.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00055", site: "luxuretv.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00056", site: "pornodrome.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00057", site: "jacquieetmicheltv.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00058", site: "tvsexe.com/", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00059", site: "bestamat.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00060", site: "porc.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00061", site: "sexe911.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00062", site: "absolugirl.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00063", site: "crapuk.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00064", site: "francexe.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00065", site: "vporno.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00066", site: "dailyplaisir.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00067", site: "v2q.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00068", site: "p0rno.com", dateLastAccess: "00", nbAccessTime : 0},
         /* French XXX amateur wesites */
        { id: "00069", site: "sexyloo.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00070", site: "bobvoyeur.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00071", site: "rabbitfinder.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00072", site: "jexhib.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00073", site: "amateurdesexefrancais.com", dateLastAccess: "00", nbAccessTime : 0},
        /* VR porn */
        { id: "00074", site: "virtualrealporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00075", site: "vrbangers.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00076", site: "realjamvr.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00077", site: "jexhib.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00078", site: "realitylovers.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00079", site: "badoinkvr.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00080", site: "wankzvr.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00081", site: "vrlatina.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00082", site: "wetvr.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00083", site: "naughtyamericavr.com", dateLastAccess: "00", nbAccessTime : 0},
        /* Live Sex Cam */
        { id: "00086", site: "stripchat.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00087", site: "imlive.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00088", site: "Jerkmate.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00089", site: "livejasmin.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00090", site: "xlovecam.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00091", site: "myfreecams.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00092", site: "chaturbate.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00093", site: "bongacams.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00094", site: "cam4.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00095", site: "cams.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00096", site: "camster.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00097", site: "vividcams.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00098", site: "slutroulette.com", dateLastAccess: "00", nbAccessTime : 0},
        /* Paied amateur websites */
        { id: "00099", site: "ouramateursluts.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00100", site: "tacamateurs.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00101", site: "watchmygf.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00102", site: "realexgirlfriends.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00103", site: "mysexmobile.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00104", site: "castingcouch-x.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00105", site: "yourfreeporn.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00106", site: "thegfnetwork.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00107", site: "daredorm.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00108", site: "lovehomeporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00109", site: "homegrownvideo.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00110", site: "bffs.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00111", site: "zoig.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00112", site: "voissa.com", dateLastAccess: "00", nbAccessTime : 0}
    ];
    var request = window.indexedDB.open("childWebProtect", 1);

    request.onerror = function(event) {
        console.log("error: ");
    };

    request.onsuccess = function(event) {
        db = request.result;
        console.log("success: "+ db);
    };

    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("prohibitweb", {keyPath: "id"});
        objectStore.createIndex("nbAccessTime", "nbAccessTime", { unique: false });
        for (var i in prohibitedWebsites) {
           objectStore.add(prohibitedWebsites[i]);
        }
    }
}

init_main();

function registerTabTrackingEvent(){
    chrome.tabs.onUpdated.addListener( function( tabId,  changeInfo,  tab) {

        var suspectedLink = false;
         
        if(tab.url != REDIRECTION_LINK){
             var db;
             var request = window.indexedDB.open("childWebProtect", 1);
             
             request.onerror = function(event) {
                console.log("error: ");
             };
             
             request.onsuccess = function(event) {
                db = request.result;
                console.log("success: "+ db);
                var objectStore = db.transaction(["prohibitweb"], "readwrite").objectStore("prohibitweb");
                   
                objectStore.openCursor().onsuccess = function(event) {
                   var cursor = event.target.result;
                   
                   if (cursor) {
                        var testCaseSites = new RegExp(cursor.value.site);
                        suspectedLink = testCaseSites.exec(tab.url);
                        if(suspectedLink){
                            cursor.value.dateLastAccess = Date.now();
                            cursor.value.nbAccessTime = parseInt(cursor.value.nbAccessTime) + 1;
                            cursor.update(cursor.value);
                            chrome.tabs.update(tab.id, {url: REDIRECTION_LINK});
                        } else
                            cursor.continue();
                   } else {
                      console.log("No more entries!");
                   }

                };

             };
                
        }

    });

}

registerTabTrackingEvent();
