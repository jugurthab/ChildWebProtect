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
        { id: "00001", site: "brazzers.com"},
        { id: "00002", site: "pornhubpremium.com"},
        { id: "00003", site: "rk.com"},
        { id: "00004", site: "czechav.com"},
        { id: "00005", site: "mofosnetwork.com"},
        { id: "00006", site: "babes.com"},
        { id: "00007", site: "fantasyhd.com"},
        { id: "00008", site: "exotic4k.com"},
        { id: "00009", site: "met-art.com"},
        { id: "00010", site: "digitalplaygroundnetwork.com"},
        { id: "00011", site: "punishtube.com"},
        { id: "00012", site: "swankpass.com"},
        { id: "00013", site: "pascalssubsluts.com"},
        { id: "00014", site: "twistysnetwork.com"},
        { id: "00015", site: "passion-hd.com"},
        { id: "00016", site: "povd.com"},
        { id: "00017", site: "fakehub.com"},
        { id: "00018", site: "pornprosnetwork.com"},
        { id: "00019", site: "vivid.com"},
        { id: "00020", site: "naughtyamerica.com"},
        { id: "00021", site: "teamskeet.com"},
        { id: "00022", site: "clubseventeen.com"},
        { id: "00023", site: "videobox.com"},
        { id: "00024", site: "nubilefilms.com"},
        { id: "00025", site: "bang.com"},
        { id: "00026", site: "dogfartnetwork.com"},
        { id: "00027", site: "hustler.com"},
        { id: "00028", site: "wickedpictures.com"},
        { id: "00029", site: "x-art.com"},
        { id: "00030", site: "vixen.com"},
        { id: "00031", site: "xxxpawn.com"},
        { id: "00032", site: "tushy.com"},
        { id: "00033", site: "ftvgirls.com"},
        { id: "00034", site: "gamelink.com"},
        { id: "00035", site: "playboy.com"},
        { id: "00036", site: "met-art.com"},
        { id: "00037", site: "julesjordan.com"},
        /* Vintage XXX wesites */
        { id: "00038", site: "theclassicporn.com"},
        { id: "00039", site: "vcaxxx.com"},
        { id: "00040", site: "tubepornclassic.com"},
        /* French XXX Pro wesites */
        { id: "00041", site: "tukif.com"},
        { id: "00042", site: "coqnu.com"},
        { id: "00043", site: "pornodingue.com"},
        { id: "00044", site: "roadsexe.com"},
        { id: "00045", site: "mypornmotion.com"},
        { id: "00046", site: "pornovore.fr"},
        { id: "00047", site: "citronnemoi.com"},
        { id: "00048", site: "mrsexe.com"},
        { id: "00049", site: "bonporn.com"},
        { id: "00050", site: "sexetag.com"},
        { id: "00051", site: "pegasproduction.com"},
        { id: "00052", site: "aphroditeporntube.com"},
        { id: "00053", site: "absoluporn.com"},
        { id: "00054", site: "coqporno.net"},
        { id: "00055", site: "luxuretv.com"},
        { id: "00056", site: "pornodrome.tv"},
        { id: "00057", site: "jacquieetmicheltv.net"},
        { id: "00058", site: "tvsexe.com/"},
        { id: "00059", site: "bestamat.com"},
        { id: "00060", site: "porc.com"},
        { id: "00061", site: "sexe911.com"},
        { id: "00062", site: "absolugirl.com"},
        { id: "00063", site: "crapuk.com"},
        { id: "00064", site: "francexe.com"},
        { id: "00065", site: "vporno.tv"},
        { id: "00066", site: "dailyplaisir.com"},
        { id: "00067", site: "v2q.com"},
        { id: "00068", site: "p0rno.com"},
         /* French XXX amateur wesites */
        { id: "00069", site: "sexyloo.com"},
        { id: "00070", site: "bobvoyeur.com"},
        { id: "00071", site: "rabbitfinder.com"},
        { id: "00072", site: "jexhib.com"},
        { id: "00073", site: "amateurdesexefrancais.com"},
        /* VR porn */
        { id: "00074", site: "virtualrealporn.com"},
        { id: "00075", site: "vrbangers.com"},
        { id: "00076", site: "realjamvr.com"},
        { id: "00077", site: "jexhib.com"},
        { id: "00078", site: "realitylovers.com"},
        { id: "00079", site: "badoinkvr.com"},
        { id: "00080", site: "wankzvr.com"},
        { id: "00081", site: "vrlatina.com"},
        { id: "00082", site: "wetvr.com"},
        { id: "00083", site: "naughtyamericavr.com"},
        /* Live Sex Cam */
        { id: "00086", site: "stripchat.com"},
        { id: "00087", site: "imlive.com"},
        { id: "00088", site: "Jerkmate.com"},
        { id: "00089", site: "livejasmin.com"},
        { id: "00090", site: "xlovecam.com"},
        { id: "00091", site: "myfreecams.com"},
        { id: "00092", site: "chaturbate.com"},
        { id: "00093", site: "bongacams.com"},
        { id: "00094", site: "cam4.com"},
        { id: "00095", site: "cams.com"},
        { id: "00096", site: "camster.com"},
        { id: "00097", site: "vividcams.com"},
        { id: "00098", site: "slutroulette.com"},
        /* Paied amateur websites */
        { id: "00099", site: "ouramateursluts.com"},
        { id: "00100", site: "tacamateurs.com"},
        { id: "00101", site: "watchmygf.net"},
        { id: "00102", site: "realexgirlfriends.com"},
        { id: "00103", site: "mysexmobile.com"},
        { id: "00104", site: "castingcouch-x.com"},
        { id: "00105", site: "yourfreeporn.tv"},
        { id: "00106", site: "thegfnetwork.com"},
        { id: "00107", site: "daredorm.com"},
        { id: "00108", site: "lovehomeporn.com"},
        { id: "00109", site: "homegrownvideo.com"},
        { id: "00110", site: "bffs.com"},
        { id: "00111", site: "zoig.com"},
        { id: "00112", site: "voissa.com"}
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
            var objectStore = db.transaction("prohibitweb").objectStore("prohibitweb");
               
            objectStore.openCursor().onsuccess = function(event) {
               var cursor = event.target.result;
               
               if (cursor) {
                    var testCaseSites = new RegExp(cursor.value.site);
                        //if(suspectedLink==false)
                            suspectedLink = testCaseSites.exec(tab.url);
                        if(suspectedLink){
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
