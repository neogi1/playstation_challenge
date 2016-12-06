/* Global: GetStreamData
 *
 * Object that manages data URLs and fetches data from the server via a JSONP request.
 *
 * Params: none
 *
 * Returns: Exposed methods to provide data about the streams.
 *
*/

var GetStreamData = (function() {

    var searchTerm,
        pageSize;

    /* Privileged: getData
     *
     * Fetch the data from the server using JSONP
     *
     * Params:
     * [req][obj] evt: The event object from the event the triggered this method
     * [opt][str] url: URL string for paginating
     *
     * Returns: HTML as HTML node.
     *
    */
    function getData(evt, url) {

        var clientId = "4m8k9zdez43w7nj2gk58yio2ybdg58z";

        // Create the script tag for JSONP request
        scr = document.createElement("script");
        scr.type = "text/javascript";

        // Set JSONP URL for new searches and pagination
        if(url && url.length > 0)  {
            scr.src = url + "&callback=cb&client_id=" + clientId;
        } else {
            scr.src = "https://api.twitch.tv/kraken/search/streams?limit=" + getPageSize()  + "&q=" + getSearchTerm() + "&callback=cb" + "&client_id=" + clientId;
        }

        // Add script tag to the DOM
        document.getElementsByTagName("head")[0].appendChild(scr);
    }


    /* Privileged: getSearchTerm
     *
     * Provide the last keyword(s) used for searching the streams. If no no keyword is passed in, the text entered in the form input field will be used.
     *
     * Params:
     * [opt][str] searchTerm: The private variable `searchTerm`.
     *
     * Returns:[str]Search keyword
     *
    */
    function getSearchTerm(searchTerm) {
        return searchTerm || document.getElementById("input_query").value;
    }


    /* Privileged: getPageSize
     *
     * Provide the last keyword(s) used for searching the streams. If no no keyword is passed in, the text entered in the form input field will be used.
     *
     * Params:
     * [opt][str] pageSize: The page size as any type as long as it can be cast to integer
     *
     * Returns:[int] The maximum page size;
     *
    */
    function getPageSize(pageSize) {
        return parseInt(pageSize,10) || 5;
    }

    return {
        getData: getData,
        getSearchTerm: getSearchTerm,
        getPageSize: getPageSize
    }

})();