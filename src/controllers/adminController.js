// ============================================================
// CHAOS ENGINEERING ENDPOINTS
// These endpoints intentionally cause failures, latency spikes,
// CPU stress, and memory pressure to test observability agents.
// DO NOT expose in production without auth protection.
// ============================================================

// POST /api/admin/simulate-error
const simulateError = (req, res, next) => {
  console.error("[CHAOS] Intentional 500 error triggered by admin.");
  const err = new Error("Intentional server error for chaos testing");
  err.statusCode = 500;
  next(err);
};

// POST /api/admin/simulate-delay
const simulateDelay = async (req, res) => {
  const delay = Math.floor(Math.random() * 5000) + 5000; // 5–10 seconds
  console.warn(`[CHAOS] Simulating slow API — delay: ${delay}ms`);
  await new Promise((resolve) => setTimeout(resolve, delay));
  res.json({ success: true, message: `Response delayed by ${delay}ms`, delay });
};

// POST /api/admin/simulate-cpu
const simulateCPU = (req, res) => {
  console.warn("[CHAOS] Simulating CPU spike — starting intensive computation...");
  const start = Date.now();
  const duration = 5000; // 5 seconds of busy work

  // Intentionally block the event loop (that's the point — to spike CPU)
  let result = 0;
  while (Date.now() - start < duration) {
    for (let i = 0; i < 1e6; i++) {
      result += Math.sqrt(i);
    }
  }

  const elapsed = Date.now() - start;
  console.warn(`[CHAOS] CPU spike completed in ${elapsed}ms`);
  res.json({ success: true, message: `CPU stress completed in ${elapsed}ms`, result: result.toFixed(2) });
};

// POST /api/admin/simulate-memory
const simulateMemory = (req, res) => {
  // ⚠️  WARNING: This intentionally allocates large arrays.
  // Memory will be GC'd eventually, but will spike RSS/heap metrics.
  // Do not call repeatedly without monitoring memory usage.
  console.warn("[CHAOS] Simulating memory pressure — allocating large arrays...");

  const leakBucket = [];
  const MB = 1024 * 1024;
  const targetMB = 100; // allocate ~100MB

  for (let i = 0; i < targetMB; i++) {
    leakBucket.push(Buffer.alloc(MB, "x")); // 1MB per iteration
  }

  const allocated = leakBucket.length;
  console.warn(`[CHAOS] Memory allocated: ~${allocated}MB. Will be GC'd after response.`);

  res.json({
    success: true,
    message: `Allocated ~${allocated}MB of memory for testing. Will be released by GC.`,
    warning: "Monitor heap metrics in your observability tool.",
  });
  // leakBucket goes out of scope → eligible for GC
};

module.exports = { simulateError, simulateDelay, simulateCPU, simulateMemory };
