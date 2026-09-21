// test.js
// =====================================================================
// Unit tests for the server.js `add` function.
// Purpose:
//   - Uses Node.js built-in `assert` module (no extra dependencies).
//   - Verifies normal addition, handling of strings that JS coerces,
//     and negative numbers.
//   - This test file is executed by the `npm test` script and is the
//     step that actually runs inside the GitHub Actions CI pipeline.
// =====================================================================

// Import the built-in assertion library (zero-dependency testing).
const assert = require("assert");

// Import the add function exported by server.js.
const { add } = require("./server.js");

// --- Test cases -------------------------------------------------------
// Each test checks a specific behaviour. If any assertion throws,
// `npm test` exits with a non-zero status and the CI job fails, which
// is exactly how GitHub Actions reports a broken build.

// Test 1: basic addition of two positive integers.
assert.strictEqual(add(2, 3), 5, "add(2, 3) should equal 5");

// Test 2: addition involving zero.
assert.strictEqual(add(0, 0), 0, "add(0, 0) should equal 0");
assert.strictEqual(add(7, 0), 7, "add(7, 0) should equal 7");

// Test 3: addition of negative numbers.
assert.strictEqual(add(-1, -1), -2, "add(-1, -1) should equal -2");
assert.strictEqual(add(-5, 10), 5, "add(-5, 10) should equal 5");

// Test 4: large numbers stay accurate.
assert.strictEqual(add(999999, 1), 1000000, "add(999999, 1) should equal 1000000");

// Test 5: string coercion behaviour of the + operator.
assert.strictEqual(add("2", "3"), "23", "JS + concatenates strings -> '23'");

// ---------------------------------------------------------------------
// Summary printed to the console (also visible in the CI job log).
// If we reach this line, every assertion above passed.
// ---------------------------------------------------------------------
console.log("All add() tests passed. CI pipeline is happy :)");