var REDIRECTION_LINK = 'https://www.google.com/';
// Initialize IndexedDB with blocked websites

function init_main(){
    chrome.storage.sync.set({"totalvbsites": "0"}, function() {});
    chrome.storage.sync.set({"totalvbsitessuspected": "0"}, function() {});
    var lastVisitedWebsite = {'lastblockedsitename': 'no site', 
                                  'lastblockedsitedate' : 'no accessed site'};
    chrome.storage.sync.set({['lastaccessedsite'] : lastVisitedWebsite}, function() {});
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
        /* Premium websites */
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
        /* Vintage wesites */
        { id: "00038", site: "theclassicporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00039", site: "vcaxxx.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00040", site: "tubepornclassic.com", dateLastAccess: "00", nbAccessTime : 0},
        /* French Pro wesites */
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
        { id: "00058", site: "tvsexe.com", dateLastAccess: "00", nbAccessTime : 0},
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
         /* French amateur wesites */
        { id: "00069", site: "sexyloo.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00070", site: "bobvoyeur.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00071", site: "rabbitfinder.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00072", site: "jexhib.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00073", site: "amateurdesexefrancais.com", dateLastAccess: "00", nbAccessTime : 0},
        /* VR */
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
        /* Live Cam */
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
        { id: "00112", site: "voissa.com", dateLastAccess: "00", nbAccessTime : 0},
        /* Amateur */
        { id: "00113", site: "tacamateur.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00114", site: "myamateurwebsite.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00115", site: "watchmygf.me", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00116", site: "xtube.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00117", site: "yourfreeporn.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00118", site: "yuvutu.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00119", site: "fantasti.cc", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00120", site: "pornxs.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00121", site: "realgfporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00122", site: "hclips.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00123", site: "youramateurporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00124", site: "mylust.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00125", site: "dreamamateurs.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00126", site: "girlfriendvideos.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00127", site: "hmotherless.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00128", site: "submityourflicks.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00129", site: "anon-v.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00130", site: "camwhores.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00131", site: "girlfriendgalleries.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00132", site: "homemoviestube.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00133", site: "myxvids.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00134", site: "dump.xxx", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00135", site: "porn18sex.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00136", site: "amateurs-gone-wild.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00137", site: "kodiefiles.nl", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00138", site: "amateurcool.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00139", site: "swapsmut.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00140", site: "hotscope.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00141", site: "pornformance.com", dateLastAccess: "00", nbAccessTime : 0},
        /* Arabic website */
        { id: "00142", site: "porn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00143", site: "pornhub.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00144", site: "xhamster.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00145", site: "aflamneek.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00146", site: "3arabporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00147", site: "motherless.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00148", site: "arabianchicks.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00149", site: "arxhamster.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00150", site: "sexaraby.info", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00151", site: "xbnat.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00152", site: "sex2arab.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00153", site: "hesporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00154", site: "sa7you.com", dateLastAccess: "00", nbAccessTime : 0},
        /* Young women website */
        { id: "00155", site: "tiny4k.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00156", site: "18yearsold.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00157", site: "just18.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00158", site: "18eighteen.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00159", site: "myveryfirsttime.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00160", site: "teenbff.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00161", site: "nineteen.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00162", site: "nannyspy.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00163", site: "brokenteens.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00164", site: "disgraced18.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00165", site: "teensloveblackcocks.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00166", site: "exxxtrasmall.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00167", site: "teenmegaworld.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00168", site: "brutalclips.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00169", site: "defloration.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00170", site: "virginmassage.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00171", site: "18stream.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00172", site: "rough18.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00173", site: "teenburg.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00174", site: "teendorf.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00175", site: "teensexreality.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00176", site: "flexyteens.com", dateLastAccess: "00", nbAccessTime : 0},
        /* Assian website */
        { id: "00177", site: "javhd.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00178", site: "littleasians.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00179", site: "japanhdv.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00180", site: "watchmyexgf.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00181", site: "asiangfvideos.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00182", site: "asiansexdiary.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00183", site: "alljapanesepass.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00184", site: "tuktukpatrol.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00185", site: "asia18.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00186", site: "thaigirlswild.com", dateLastAccess: "00", nbAccessTime : 0},
        /* Milf website */
        { id: "00187", site: "milf.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00188", site: "laceystarr.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00189", site: "sexymomma.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00190", site: "realmomexposed.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00191", site: "40somethingmag.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00192", site: "plusmilfs.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00193", site: "allmomsex.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00194", site: "milfporn.tv", dateLastAccess: "00", nbAccessTime : 0},
       
        { id: "00195", site: "toonpass.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00196", site: "hentaipassport.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00197", site: "javhd.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00198", site: "hentai.tv", dateLastAccess: "00", nbAccessTime : 0},
         /* Assian website */
        { id: "00199", site: "javtasty.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00200", site: "vjav.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00201", site: "xonline.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00202", site: "watchjavonline.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00203", site: "javhd3x.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00204", site: "hpjav.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00205", site: "javmobile.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00206", site: "sexloading.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00207", site: "javhd.today", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00208", site: "leechporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00209", site: "avseesee.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00210", site: "top1porn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00211", site: "vpondo.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00212", site: "youav.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00213", site: "javstreams.me", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00214", site: "javbraze.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00215", site: "ffkk.me", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00216", site: "meetav.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00217", site: "korean720.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00218", site: "jav-720p.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00219", site: "javleak.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00220", site: "jav247.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00221", site: "tube8x.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00222", site: "javdude.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00223", site: "showjav.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00224", site: "kaplog.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00225", site: "iyottube.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00226", site: "sextop1.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00227", site: "91porn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00228", site: "thisav.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00229", site: "85porn.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00230", site: "cherry-porn.com", dateLastAccess: "00", nbAccessTime : 0},

        { id: "00231", site: "desixnxx2.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00232", site: "freehdx.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00233", site: "indianpornvideo.org", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00234", site: "freesexyindians.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00235", site: "ooodesi.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00236", site: "xvideos.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00237", site: "xnxx.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00238", site: "masalaseen.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00239", site: "desiplay.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00240", site: "antarvasnaclips.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00241", site: "mydirtyhobby.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00242", site: "arousr.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00243", site: "camdole.com", dateLastAccess: "00", nbAccessTime : 0},

        { id: "00244", site: "pornrewind.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00245", site: "xnxxhamster.net", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00246", site: "clicporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00247", site: "xkeezmovies.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00248", site: "sexymassageoil.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00249", site: "porn-portal.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00250", site: "fkbae.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00251", site: "bestwifeporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00252", site: "xxbrits.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00253", site: "watchporninpublic.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00254", site: "pornopizza.it", dateLastAccess: "00", nbAccessTime : 0},

        { id: "00255", site: "reallesbianexposed.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00256", site: "madporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00257", site: "steplesbians.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00258", site: "trueanal.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00259", site: "teensloveanal.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00260", site: "assparade.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00261", site: "analized.com", dateLastAccess: "00", nbAccessTime : 0},

        { id: "00262", site: "brokenbabes.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00263", site: "hackedaccount.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00264", site: "kaotic.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00265", site: "theync.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00266", site: "crazyshit.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00267", site: "inhumanity.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00268", site: "nothingtoxic.com", dateLastAccess: "00", nbAccessTime : 0},

        { id: "00269", site: "filf.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00270", site: "twistedfamilies.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00271", site: "sexymomma.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00272", site: "familysinners.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00273", site: "familystrokes.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00274", site: "badmilfs.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00275", site: "perversefamily.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00276", site: "family.xxx", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00277", site: "sislovesme.com", dateLastAccess: "00", nbAccessTime : 0},
        
        { id: "00278", site: "spyfam.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00279", site: "shadypi.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00280", site: "voyeur-house.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00281", site: "watchersweb.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00282", site: "reallifecam.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00283", site: "voyeurweb.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00284", site: "hiddenvoyeurspy.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00285", site: "voyeurhit.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00286", site: "voyeurstyle.com", dateLastAccess: "00", nbAccessTime : 0},

        { id: "00287", site: "spyfam.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00288", site: "shadypi.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00289", site: "voyeur-house.tv", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00290", site: "watchersweb.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00291", site: "reallifecam.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00292", site: "voyeurweb.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00293", site: "hiddenvoyeurspy.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00294", site: "voyeurhit.com", dateLastAccess: "00", nbAccessTime : 0},

        { id: "00296", site: "daftporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00297", site: "humoron.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00298", site: "wtfpeople.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00299", site: "newsfilter.org", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00300", site: "joyreactor.com", dateLastAccess: "00", nbAccessTime : 0},

        { id: "00301", site: "mennetwork.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00302", site: "bromonetwork.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00303", site: "gayhorrorporn.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00304", site: "adultsearch.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00305", site: "bedpage.com", dateLastAccess: "00", nbAccessTime : 0},
        { id: "00306", site: "rubmaps.ch", dateLastAccess: "00", nbAccessTime : 0}
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

function updateStats(){
    chrome.storage.sync.get("totalvbsites",function(items) {
                var visitedWebSites = parseInt(items.totalvbsites) + 1;
                chrome.storage.sync.set({"totalvbsites":visitedWebSites}, function() {
                });
            });
}


function registerTabTrackingEvent(){
    chrome.tabs.onUpdated.addListener( function( tabId,  changeInfo,  tab) {

        if(tab.url != REDIRECTION_LINK && changeInfo.status == "loading"){
            var db;
            var suspectedLink = false;
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
                            chrome.storage.sync.get("totalvbsitessuspected",function(items) {
                            var visitedWebSitesBlocked = parseInt(items.totalvbsitessuspected) + 1;
                            chrome.storage.sync.set({"totalvbsitessuspected":visitedWebSitesBlocked.toString()}, function() {

                            var currentdate = new Date(); 
                            var datetime =  currentdate.getDate() + "/"
                                            + (currentdate.getMonth()+1)  + "/" 
                                            + currentdate.getFullYear() + " @ "  
                                            + currentdate.getHours() + ":"  
                                            + currentdate.getMinutes() + ":" 
                                            + currentdate.getSeconds();

                            var lastVisitedWebsite = {'lastblockedsitename': tab.url, 
                                  'lastblockedsitedate' : datetime};
                            chrome.storage.sync.set({['lastaccessedsite'] : lastVisitedWebsite}, function() {});
                            
                            });
                        });
                            
                            chrome.tabs.update(tab.id, {url: REDIRECTION_LINK});
                        } else
                            cursor.continue();
                   } else {
                      console.log("No more entries!");
                   }

                };

             };
        } else if(changeInfo.status == "complete"){
            updateStats();
        }
    });

}

registerTabTrackingEvent();
