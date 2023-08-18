# 03 Exercise - Express Middleware

Implement an error handler middleware.

## Brief

During the testing of the Todo API it was discovered that no errors are sent when the database it not running. Your tech lead has asked you to fix this bug.

## Instructions

You have to [write middleware](https://expressjs.com/en/guide/writing-middleware.html) for use in your Express app.

Implement an [error handler middleware](https://expressjs.com/en/guide/error-handling.html), catch all errors that occur in asynchronous code invoked by route handlers or middleware and pass them to the custom error handler middleware for processing.

`TODO` comments have been added to the server-side code to help you with the implementation.

**User Story:**

- **As** a developer
- **I want** to receive information about any errors
- **So that** I can debug and fix any issues.

**Acceptance Criteria:**

- [ ] GIVEN that the database is not running, WHEN I make a network request to any of the API routes, THEN I receive an error message.
- [ ] All `TODO` comments have been addressed.
- [ ] The exercise has been submitted.
