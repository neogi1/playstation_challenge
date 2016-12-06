/* Global: PageManager
 *
 * Object that manages behavior of the UI elements on the page
 *
 * Params: none
 * 
 * Returns: list of methods that can be called from outside the function
 *
*/

var PageManager = (function() {

    // Private variables
    var currentPage = 1,
        totalPages,
        responseObj = {};

    /* Private: generateStreamMarkup
     *
     * Create the html for each individual stream from the response.
     *
     * Params:
     * [req][obj] el: the response object from API call
     *
     * Returns: HTML as HTML node.
     *
    */
    var generateStreamMarkup = function(el) {
        var tmpl = document.createElement('template');
            imgWidth = '100',
            imgHeight = '91',
            previewImgSrc = el.preview.template.replace('{width}', imgWidth).replace('{height}', imgHeight);

        tmpl.innerHTML = `<section class="stream"><div class="previewImg"><img src="${  previewImgSrc }" /></div><div class="streamInfo"><h2>${ el.channel.display_name }</h2><p>${ el.game } - ${ el.viewers } viewers</p><p>${ el.status || "" }</p></div></section>`;
        return tmpl.content.firstChild;
    }


    /* Private: setTotals
     *
     * Updates the total streams and total pages values on the page.
     *
     * Params:
     * [req][int] total: total number of streams that match the query
     *
     * Returns: Nothing
     *
    */
    var setTotals = function(total) {
        var totalResults = document.getElementById("totalResults"),
            totalPagesEl = document.getElementById("totalPages"),
            pageSize = GetStreamData.getPageSize();
            totalPages = Math.ceil(total / pageSize);

        if(totalResults.textContent) {
            totalResults.textContent = total;
            totalPagesEl.textContent = totalPages;
        }  else if(totalResults.innerText) {
            totalResults.innerText = total;
            totalPagesEl.innerText = totalPages;
        }
    }


    /* Private: getPaginationUrl
     *
     * Return the appropriate pagination URL given in the response object.
     *
     * Params:
     * [req][enum str] direction: Values can be either "prev" or "next"
     *
     * Returns: pagination URL as string
     *
    */
    var getPaginationUrl = function(direction) {
        if(direction === "next") {
            return responseObj._links.next;
        } else {
            return responseObj._links.prev;
        }
    }


    /* Privileged: paginate
     *
     * Handles paginating through the results
     *
     * Params:
     * [req][obj] evt: The event object passed from the event listener. Required for pagination.
     *
     * Returns: Nothing
     *
     */
    var paginate = function(evt) {
        var currentPageNumEl = document.getElementById("currentPage");
            searchTerm = GetStreamData.getSearchTerm(),
            pageSize = GetStreamData.getPageSize();

        if(evt && evt.target) {
            if(evt.target.id === "prev") {
                if((currentPage - 1) > 0) {
                    currentPage--;
                    GetStreamData.getData(evt, getPaginationUrl("prev"));
                }
            } else if(evt.target.id === "next") {
                if((currentPage + 1) <= totalPages) {
                    currentPage++;
                    GetStreamData.getData(evt, getPaginationUrl("next"));    
                }
            }
        }

        if(currentPageNumEl.textContent) {
            currentPageNumEl.textContent = currentPage;
        }  else if(currentPageNumEl.innerText) {
            currentPageNumEl.innerText = currentPage;
        }
    }


    /* Privileged: createPage
     *
     * Create the html for the main section of the page.
     *
     * Params: 
     * [req][obj]: the object in the response from the JSONP call to the Twitch API
     *
     * Returns: Nothing
     *
    */
    var createPage = function(obj) {

        var streamsRoot = document.getElementById("streamsContainer"),
            tagMain = document.getElementsByTagName("main")[0];
            responseObj = obj;

        if(streamsRoot) {
            streamsRoot.parentNode.removeChild(streamsRoot);
        }

        if(responseObj && responseObj.streams && responseObj.streams.length > 0) {
            streamsRoot = document.createElement("div");
            streamsRoot.id = "streamsContainer";

            /* Generate template string, convert it to a HTML element and append it to streamscontainer */
            responseObj.streams.forEach(function(el) {
                streamsRoot.appendChild(generateStreamMarkup(el));
            });

            setTotals(responseObj._total);
            tagMain.classList.remove("hide");
            tagMain.appendChild(streamsRoot);
        }
    }


    return {
        createPage: createPage,
        paginate: paginate
    }
})();