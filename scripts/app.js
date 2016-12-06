/* Global: Init
 *
 * Object that initializes the page here. In this case all this involves is setting event listeners.
 *
 * Params: none
 * 
 * Returns: 
 *
*/

var Init = (function() {
    var searchButton = document.getElementById("btn_BeginSearch"),
        pageCounter = document.getElementById("pageCounter");

    searchButton.addEventListener("click", function(evt) { GetStreamData.getData(evt); return false; }, false); 
    pageCounter.addEventListener("click", function(evt) { PageManager.paginate(evt); return false; }, false); 
})();

// Callback for JSONP request
var cb = function(obj) {
    PageManager.createPage(obj);
}

