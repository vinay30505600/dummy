// ============================================================
// OpenTelemetry Tracing Initialization
// ============================================================
// TODO: Install packages when ready:
//   npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node
//   npm install @opentelemetry/exporter-trace-otlp-http
//
// Then replace this file with the actual SDK setup:
//
// const { NodeSDK } = require("@opentelemetry/sdk-node");
// const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
// const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
//
// const sdk = new NodeSDK({
//   traceExporter: new OTLPTraceExporter({
//     url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318/v1/traces",
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });
//
// sdk.start();
// process.on("SIGTERM", () => sdk.shutdown());
//
// IMPORTANT: This file must be required BEFORE everything else in server.js:
//   require("./tracing/tracing");
// ============================================================

console.log("[Tracing] OpenTelemetry not yet configured. See /tracing/tracing.js for setup instructions.");
