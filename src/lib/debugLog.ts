// #region agent log
export function debugLog(
  location: string,
  message: string,
  data: Record<string, unknown>,
  hypothesisId: string,
  runId = "post-fix-v2"
) {
  const payload = JSON.stringify({
    sessionId: "ed1dc1",
    runId,
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  });
  fetch("/__debug_log", { method: "POST", body: payload }).catch(() => {});
  fetch("http://127.0.0.1:7383/ingest/00bdfd06-5d73-49a4-89d9-b54caa47d179", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "ed1dc1" },
    body: payload,
  }).catch(() => {});
}
// #endregion
