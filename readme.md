Notes on this challenge.

1) Even with the limit in the JSONP URL querystring is set to 5, intermittently, fewer than 5 streams are being returned. I have inspected the request and response. The request URL and headers are correct yet the response intermittently has less than 5 streams. I looked into it starting with my own code and the Twitch documentation, it seems that when the limit is set to some value, the API will return no more than that number of streams, but may return fewer on some requests.

This can be resolved by requesting larger data sets, here the maximum is 100. With the data in memory, pagination can be handled with far fewer requests tot he API and it will be much faster as any network lag is no longer an issue. Ths would take a little more more time to implement but is very doable.


2) In a real-world app code would be organized more modularly. I have organized the javascript files as 'classes' for clarity in code organizaion. I did not modularize the html or CSS because there is not a lot of that code and can easily be managed in a single HTML file and a single CSS file.