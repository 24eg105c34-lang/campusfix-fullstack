// Change this value when the backend is hosted at a different URL.
const API_BASE = window.CAMPUSFIX_API_URL || "http://localhost:8080/api";
const form = document.querySelector("#complaintForm");
const message = document.querySelector("#formMessage");
const list = document.querySelector("#complaints");

async function loadComplaints() {
  list.innerHTML = '<p class="muted">Loading complaints…</p>';
  try {
    const response = await fetch(`${API_BASE}/complaints`);
    if (!response.ok) throw new Error("Could not load complaints");
    const items = await response.json();
    document.querySelector("#total").textContent = items.length;
    document.querySelector("#resolved").textContent = items.filter(x => x.status === "RESOLVED").length;
    if (!items.length) { list.innerHTML = '<p class="muted">No complaints yet. Submit the first one.</p>'; return; }
    list.innerHTML = items.map(item => `<article class="complaint">
      <div class="complaint-top"><h3>${escapeHtml(item.title)}</h3><span class="pill ${item.status === "RESOLVED" ? "resolved" : ""}">${escapeHtml(item.status)}</span></div>
      <div class="meta">${escapeHtml(item.category)} · ${escapeHtml(item.priority)} priority<br>📍 ${escapeHtml(item.location)} · Ticket #${item.id}</div>
      <p class="desc">${escapeHtml(item.description)}</p>
    </article>`).join("");
  } catch (error) {
    list.innerHTML = `<p class="muted">Backend is not reachable. Start the Spring Boot API and refresh. (${escapeHtml(error.message)})</p>`;
    document.querySelector("#total").textContent = "—";
    document.querySelector("#resolved").textContent = "—";
  }
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  message.textContent = "Submitting…";
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch(`${API_BASE}/complaints`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Submission failed");
    message.textContent = `Complaint submitted successfully. Ticket #${result.id}`;
    form.reset();
    await loadComplaints();
  } catch (error) {
    message.textContent = `Unable to submit: ${error.message}. Check that the backend is running.`;
  }
});
document.querySelector("#refresh").addEventListener("click", loadComplaints);
loadComplaints();