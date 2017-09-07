var manifest = chrome.runtime.getManifest();
var args = ["%c GriesmayerNoFlash%c v" + manifest.version + "%c by%c " + manifest.author + " %c " + manifest.homepage_url, "background: #222;color: #bada55", "background: #222;color: #c0ffee", "background: #222;color: #bada55", "background: #222;color: #c0ffee", ""];
console.log.apply(console, args);

var elementExists = document.getElementById("flashcontent");
if(elementExists) {
    console.log("element exists");
    
    var lastPart = window.location.href.split("/").pop();
    var lastPartWithoutHtml = lastPart.replace(".html", "");
    
    var xmlurl = window.location.href.replace(lastPart, lastPartWithoutHtml + "_config.xml");
    console.log(xmlurl);

    jQuery.get(xmlurl, function(data) {
        console.log(data);
        var flvfilename = $("playlist > array > fileset > video1 > uri", data).text();
        
        console.log(flvfilename);
        var flvurl = window.location.href.replace(lastPart, flvfilename);
        
        var button = $("<button>", {type: "button", onclick: "location.href='"+flvurl+"'"}).text("Download FLV");
        $("#cs_flashBody").append(button);
    });
}
