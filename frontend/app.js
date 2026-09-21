// app.js
// =====================================================================
// Frontend entry point for the ci-demo project.
// Purpose:
//   - Demonstrates a lightweight Node.js frontend script.
//   - In a real project this would bundle React/Vue components or a
//     static site; here it simply prints a console message so the CI
//     pipeline's frontend steps have something deterministic to run.
//   - Kept dependency-free so `npm install` stays fast and fails only
//     if something is genuinely broken.
// =====================================================================

// Helper that returns a greeting string; easily asserted/testable later.
function getGreeting() {
  return "Hello from the ci-demo frontend!";
}

// Main entry: print the message to the console.
// During GitHub Actions this line appears in the job log so we can
// visually confirm the frontend step actually executed.
console.log(getGreeting());
console.log("Frontend build simulation: OK");

// Export for any future unit tests.
module.exports = { getGreeting };// CI demo
