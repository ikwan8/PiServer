# PiServer
server sided code for satellite pi's along with sample front end client side code for testing.


In this repo, main.js functions as the server code for the pi's that are hooked up to arduinos. Index.js functions as test server code for Nari's web app. The goal is for nari's web app to have code similar to index.js somewhere for the pi's to communicate. 
index.js also has code that will handle client interactions on the web page front end. index.html was used to test this communication.

basically, main.js functions as a server and index.js is a client to that server, and the web page front end is a client to the index.js server. The code in the repo has the ability to propagate a command from a text box on the web page down to the low level pi and log it there.

The code is set to run on localhost for now, there are instructions in each file on how to expose the server. clone the repo into a pi connected to the arduino and the web server pi. I suggest copy+pasting the relevant index.js and index.html into the web app.

To run the pi server, execute "node main.js" in the terminal. To run the Pi webserver, execute "node index.js". 

There is a bug in the current build where main.js will send multiple messages to index.js despite only having one emit command. Basically instead of sending one confirmation message it will send 2+. Will look into it in the future. 
