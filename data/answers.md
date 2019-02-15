 1. Mention two parts of Express that you learned about this week.

 Express is a framework that allows us to create backend servers using node.js. It receives requests and sends responses. We can also use middleware to enhance functionality.

 2. Describe Middleware?

 Middleware is a function or functions that get in between other functions. Control is diverted to the middleware, it does something, and then diverts control to the next piece of middleware, or back to whence it came. We were told of 3 types of middleware: a) built-in, included with express. example would be express.json(). b) Third party. Example would be helmet(), used for security. c) Custom. Something we write ourselves

 3. Describe a Resource?

  In the context of Express, a program that uses the Express API running on the Node.js platform. Might also refer to an app object. (Had to look that one up)

 4. What can the API return to help clients know if a request was successful?

 An API can return a status message (such as 200, 404 or 500) to let the user know that the attempted action was successful or not, and an indicator why not if it wasn't. It can also return a message with more details. It could also return whatever the user was requesting.

 5. How can we partition our application into sub-applications?

 By using the router portion of express. I got hung up on this today and had to stick everything in one file. But for larger applications, it would be much better to segregate routers by the services that need them. This makes them easier to find, update and debug. It also makes the code much cleaner, and easier to read.