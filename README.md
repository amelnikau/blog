# blog
Simple Express app blog

To signup for new user send POST request to **/signup**
```javascript
{
	"username":"test",
	"password":"test"
}
```

To get JWT token for existing user send POST to **/login**
```javascript
{
	"username":"test",
	"password":"test"
}
```
As a response you will get something like that:
```javascript
{
    "message": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1MTc3NjgzOTl9.eG0hgRqnN7mz96phxdnQPpI3GrmPR6Ja0-fkL0cw69A"
}
```

Received token should be used in all requests to /blog* API

Use it in "Authorization" header in format "JWT <TOKEN_VALUE>"

To run tests:
* npm install
* npm test (executes all unit tests)
* npm run coverage (shows coverage for tested files)
* npm run coverage_all (shows coverage for all files in the project)