<!--
  kontexta rules for Aider — ijelly
  To enable, add this to your .aider.conf.yml:
  read:
    - .aider/kontexta.md
-->

<!-- BEGIN kontexta:rules v3.2.0 -->
## Working with kontexta

This project uses kontexta for context, knowledge, and journal management. Tools live under the `kxta` MCP server.

**Core constraints:**
- **Session start:** Call `admin_refresh_session_context` on turn 1; print a 1–3 line greeting (date, profile, conflicts). Skip if the user's first message is a task.
- **User profile:** Call `admin_get_profile` to read user context, role, preferences, and goals.
- **All KB writes go through kontexta.** Use `files_create` / `files_update` / `journal_write`. Never edit KB files with raw filesystem tools. Never write context artifacts (diagrams, specs, notes, `.mmd` files) directly into the project repo — use `files_create` with `destination: "knowledge"`.
- **Search before reading.** Use `files_search` (no bodies first; `include_bodies` only for several files at once, with a small `max_tokens`) or `files_regex_search`, then `files_read` the top hit, not a guessed path.
- **Act on `journal.suggested_action`** before your next tool call, or pass `journal_acknowledge: true` to dismiss.
- **Tag new KB files** at creation time via `tags` on `files_create` or `tags_add`.
- **Use `.mmd` for diagrams** via `files_create` with `format: "mmd"`, `destination: "knowledge"`. Never fenced mermaid in `.md`, never `.mmd` files in the project repo.
- **Confirm Hands tokens within 60 seconds.** Tokens expire.
- **Log decisions** with `journal_write({kind: "note"})` and **topic pivots** with `journal_write({kind: "intent"})`.
- **Relay `hooks` prompts** once per session when present in tool responses.

**Strict folder structure in Knowledge Base:**
All context artifacts must strictly follow this folder hierarchy inside the Knowledge Base (`destination: "knowledge"`):
- **HTML reports:** `html/` (use `files_create` with `format: "html"`, `destination: "knowledge"`)
- **Mermaid diagrams (`.mmd`):** `mermaid/` (use `files_create` with `format: "mmd"`, `destination: "knowledge"`)
- **Journals:** `journal/` (managed via `journal_write` / `journal_distill`)
- **Knowledge Base files:** `knowledge/dictionary/` (`kind: "dictionary"` for sources of truth) or `knowledge/notes/` (`kind: "note"` for working notes & snapshots)
Never write context or diagram files directly into the project repository.

**Full rules, tool routing matrix, and workflow guidance:** See [KONTEXTA.md](./KONTEXTA.md).
<!-- END kontexta:rules v3.2.0 -->
