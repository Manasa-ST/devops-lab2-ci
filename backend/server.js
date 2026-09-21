// server.js
// =====================================================================
// Backend entry point for the ci-demo project.
// Purpose:
//   - Demonstrates a simple Node.js module that can be unit tested.
//   - Exposes an `add(a, b)` function that returns the sum of two numbers.
//   - This file is deliberately minimal so the CI pipeline can verify
//     the code compiles, runs, and passes tests without any external
//     services or databases.
// =====================================================================

/**
 * Adds two numbers together.
 *
 * This is the core logic covered by the unit tests in test.js.
 * Keeping the function exported (module.exports) makes it easy to
 * import inside tests using require().
 *
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} The sum of a and b.
 */
function add(a, b) {
  return a + b;
}

// A quick standalone demonstration that runs when the file is executed
// directly (e.g. `node server.js` or `npm start`).
// The text below is what appears in the CI job log during a build.
console.log("ci-demo backend server started.");
console.log("Demo: add(10, 5) =", add(10, 5));

// Export the function so test.js (and CI test step) can consume it.
module.exports = { add };