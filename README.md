instructions how to run the code:
in order to install node_modules folder:
      1. open client folder and on terminal: npm install
      2. on main folder and on terminal: npm install

in order to start the application:
      1. on main folder terminal : npm run dev ( this will run both server and client (server on localhost:5002 and client on localhost:3000)



brief overview:
i have used Express in order to create the server, which contains one route that uses axios in order to fetch the data from the api and send back to the client


on the client i have Redux dispatch, which send GET request with the search parameter.
the search words will be saved on the local storage and will be rerender to update 
the search history list.
click on the search history will repeat the API request.

i have implemented paging so there will be only 5 result on page.

search box for matches will paint in yellow all match and couner will show the number of number of occurrences.


