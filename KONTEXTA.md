# Kontexta Rules Reference v3.2.0

This project is registered with kontexta. Honor these rules to keep the index, history, and journal coherent — and to avoid burning tokens on workflows kontexta already solves. Tools live under the `kxta` MCP server.

## Core rules

**Print the session welcome as your first message.** On the very first turn of any new session, call `admin_refresh_session_context` and print a brief greeting to the user based on what it returns — today's date, their name from the profile, upcoming events / conflicts if any, a nudge if the profile is empty or stale. 1–3 lines, not a report. Two reasons: (1) if the client lazy-loads MCP servers, this is what actually triggers `initialize`; (2) the user sees kontexta is connected and knows what context you have. Skip if the user's first message is already a work request — do the work.

**Search before reading.** Use `files_search` (ranked matches with excerpts; add `include_bodies: true` only when you need several files at once, with a small `max_tokens`) or `files_regex_search` to find context first, then `files_read` the top hit. Skipping straight to `files_read` on a guessed path wastes tokens and often misses the right file.

**All KB writes go through kontexta.** Use `files_create` / `files_update` (pass `section` for a surgical single-heading edit) / `journal_write`. **Never** edit a KB file with raw filesystem tools (Edit/Write/cat) — the watcher and FTS index will diverge until `projects_refresh_index` runs, and subsequent searches will return stale results. **Never write context artifacts directly into the project repository.** All diagrams, event/timeline charts, specs, mockups, and notes belong in the KB via `files_create` (`destination: "knowledge"`). Never use agent filesystem tools (`write_to_file`, `create_file`, bash redirects) to create context or `.mmd` files in the project workspace — doing so pollutes the project repo and triggers unexpected git commits.

**Batch reads. Don't loop `files_read`.** Need ≥2 files? Call `files_read` with `ids: [...]` (one round-trip, up to 200 IDs) or `files_search` with `include_bodies: true` and a modest `max_tokens` (default 12000). Looping single-ID `files_read` calls wastes round-trips and inflates response overhead.

**Address `journal.suggested_action` before the next tool call.** Many tool responses include a `journal` envelope. If `journal.suggested_action` is set (e.g., `"journal_distill"`), call that tool before issuing your next tool. To dismiss for the rest of the session, pass `journal_acknowledge: true` on your next tool call.

**Relay `hooks` prompts once per session.** If a tool response carries a `hooks.prompt` (or the session welcome mentions hooks), tell the user once that kontexta can capture their conversation and shell commands for the agents they enabled. Only call `admin_onboard_agent` with `hooks: true` after they agree.

**Use `journal_write({kind: "note", text, tags})` for decisions and abandonments.** When you make a non-obvious call, try something that doesn't work, or capture a workaround, log it. Hands runs are auto-captured now.

**Use `journal_write({kind: "intent", summary})` when the user pivots.** One short sentence so the distillation step knows the topic shifted.

**Strict mode awareness.** If a project sets `journal.mode = "strict"` in its `kontexta.json`, the MCP server returns a `JOURNAL_BACKLOG` error on read tools (search/read_*/list_*) when undistilled events exist. The error includes `next_action: "journal_distill"`. Either run `journal_distill` first, OR pass `journal_bypass: true` on the read call to override (logged for audit).

**Confirm Hands tokens within 60 seconds.** When a Hands tool returns an approval token, do NOT chain a long question or another tool call before `hands_confirm`. Tokens expire; the user will have to re-issue the whole flow.

**Save specs to a canonical location.** When generating a spec, plan, or design doc, write it to the KB at `specs/<project-name>/<spec-name>.md` (use `files_create` with `destination: "knowledge"`, `folder: "specs/<project-name>"`). One folder per project keeps specs queryable.

**Tag new KB files at creation time.** Pass `tags` on `files_create`, or call `tags_add` immediately after. Untagged files are recoverable but invisible to `files_find_related`.

**`admin_overview({mode: "whats_new"})` early. `admin_commit_backup` late.** Run it at session start if you've been away — it returns files added/changed since a cutoff. End the session with `admin_commit_backup` if you mutated KB files and the project has a remote.

**Use `.mmd` for diagrams, not fenced code in `.md`.** When creating an architecture / flow / sequence diagram, or visualizing calendar events/timelines, call `files_create` with `format: "mmd"` and `destination: "knowledge"`, putting the raw mermaid source as the body (no ```` ```mermaid ```` fence). Never write `.mmd` files directly into the project repo. The web UI renders `.mmd` files as live diagrams with SVG/PNG export; mermaid embedded in markdown is just text. Default folder: `mermaid/` (or `<project>/mermaid/` for project-scoped diagrams).


## Knowledge Items (KI)

KIs are curated, distilled KB files — the highest-signal context in the vault. 
They save tokens and prevent redundant research when used correctly.

**Check KIs before independent research.** At the start of any task, run 
`files_search` over the KB for the task topic (no bodies first; `files_read` the best hit). If a matching KI 
exists, read it before writing code, designing architecture, or forming a plan. 
Skipping this step is the single most common source of duplicated work.

**KIs are starting points, not ground truth.** KIs are snapshots. Always 
cross-reference a KI's API patterns, file paths, and config values against the 
*current* source on disk before acting on them. KIs can lag behind code.

**Close the loop: update the KI after significant changes.** When you ship a 
meaningful change (new API, config schema change, architecture shift), update 
the relevant KI via `files_update` (whole file or, with `section`, one heading). If no KI exists 
yet, create one with `files_create` under `knowledge/` with appropriate tags. 
A KI that isn't maintained becomes noise — which is worse than no KI.

**Use `admin_overview({mode: "whats_new"})` at session start after a gap.** If you haven't touched the 
project in a while, run it with `since: "7d"` to surface recently changed 
files — including KIs updated by other agents or the user.

## Content class

`files_create` requires `kind` for KB writes (single file or `files` array, both):
- **`dictionary`** = source of truth (mappings, glossaries, runbooks, PR templates, architecture docs)
- **`note`** = snapshot (meeting notes, PR findings, sprint reviews, post-mortems, working thoughts)

Test: *if this file disagreed with the code, who wins?* File wins → dictionary; file loses → note. Search ranks dictionary hits above everything else; filter with `kind` on any read tool for one class. `journal`/`project` are auto-assigned — don't pass them to `files_create`.

## Folder structure

All files and context artifacts created through kontexta must strictly follow this folder hierarchy inside the Knowledge Base (`destination: "knowledge"`):
- **HTML reports:** `html/` (use `files_create` with `format: "html"`, `destination: "knowledge"`)
- **Mermaid diagrams (`.mmd`):** `mermaid/` (use `files_create` with `format: "mmd"`, `destination: "knowledge"`)
- **Journals:** `journal/` (managed via `journal_write` / `journal_distill`)
- **Knowledge Base files:** `knowledge/dictionary/` (`kind: "dictionary"` for authoritative sources of truth) or `knowledge/notes/` (`kind: "note"` for working notes, meeting notes, and snapshots)

Never create context or diagram files directly in the project workspace or outside these designated folders.

## Tool reference

The matrix below is grouped by intent. For each tool: when to reach for it, the most common wrong context, and the better sibling tool when wrong.

### Find

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `files_search` | Natural-language keyword across KB (FTS); `include_bodies: true` returns a bundle of hits + bodies capped at `max_tokens` (default 12000); use it sparingly | Substrings, URLs, code idents | `files_regex_search` |
| `files_regex_search` | Substrings, URLs, code identifiers across files; pass `file_id` to scan just one known file | Natural-language queries | `files_search` |
| `files_find_related` | Discover siblings via tag overlap | Text content matching | `files_search` |
| `tags_suggest` | Propose tags for an existing file | Finding files by tag | `files_find_related` |

### Read

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `files_read` | One file (`id` or `path`), a batch (`ids`), or a partial read (`section` or `lines`) | Only metadata needed | `files_describe` |
| `files_read_outline` | Triaging an unfamiliar file's structure | Structure already known | `files_describe` |
| `files_describe` | Metadata only (size, tags, mtime) | Need content | `files_read` |
| `admin_get_profile` | Read user profile/context at session start | Reading normal files | `files_read` |

### Write

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `files_create` | One new file, or a `files` array for bulk-creating ≥2 (md, mmd, or html via `format`) | File already exists | `files_update` |
| `files_update` | Replacing the whole body, or a surgical edit at a known heading via `section` | File doesn't exist yet | `files_create` |
| `files_delete` | One file, or an `ids` array for bulk delete | Want to keep the file but hide it | `tags_remove` / `tags_set_favorite` |
| `files_move` | Rename or relocate a file | File content needs changing | `files_update` |

### Organize

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `tags_add` | Tag an existing file | Tagging at creation time | `files_create` (with `tags` param) |
| `tags_remove` | Untag a file | Want to delete the file | `files_delete` |
| `tags_list` | Enumerate all tags in the vault | Want files for a given tag | `files_find_related` |
| `tags_set_favorite` | Pin / unpin a file | Semantic categorization | `tags_add` |
| `tags_search` | Bulk-tag every hit from a search | Tagging a single file | `tags_add` |
| `journal_write` | Log an event: `kind: "note"` (decision/workaround), `kind: "intent"` (topic pivot), or `kind: "append"` (timestamped daily journal entry) | Summarizing accumulated events | `journal_distill` |
| `journal_distill` | Summarize accumulated journal events | Individual events | `journal_write` |
| `journal_status` | Check backlog size and high-water mark before distilling | Need the raw events themselves | `journal_distill` |
| `journal_commit_upgrades` | Mark journal entries upgraded after a subagent rewrites them | Running the initial distillation | `journal_distill` |
| `journal_housekeep` | Prune old raw journal files and archive cold tasks | Need to distill new events first | `journal_distill` |
| `resources_clip_url` | Capture a web URL into the KB | Saving a local file | `files_create` |
| `folders_list` | Enumerate folders in the project | Finding files | `files_list` |
| `folders_create` | Create a new (possibly nested) folder | Files don't need explicit folders | |
| `folders_delete` | Remove an empty folder | Folder still has files | `files_delete` (bulk) first |

### Reports

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `resources_add_report` | Add an image to the shared `reports/resources/` pool | Embedding data URIs | |
| `resources_list_reports` | List all shared report resources | Need full file list | `files_list` |
| `resources_delete_report` | Delete a shared resource by name | Deleting a report file | `files_delete` |
| `resources_export_report` | Export an HTML report as PDF or PNG | Exporting markdown | |

### History & recovery

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `files_get_history` | List a file's revisions | Want a diff between two revisions | `files_get_diff` |
| `files_get_diff` | Compare two specific revisions | Want full content of one | `files_restore` |
| `files_restore` | Roll back a KB file to an earlier revision | Want to use raw `git` | |
| `files_diff_against_disk` | Find drift after raw filesystem edits | Normal search staleness | `projects_refresh_index` |
| `projects_refresh_index` | Rescan after out-of-band changes | Normal in-app edits | |
| `admin_commit_backup` | Push KB changes to remote git | Local-only work | |

### Discover

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `projects_list` | Enumerate registered projects | Files within one project | `files_list` |
| `files_list` | Files in a project (filterable) | Full-text content matters | `files_search` |
| `projects_map` | Folder/file tree for a project | Flat file list | `files_list` |
| `admin_overview` | `mode: "stats"` for counts/health, `mode: "whats_new"` for files changed since a cutoff | Per-file detail or full-text search | `files_describe` / `files_search` |
| `admin_refresh_session_context` | Re-fetch profile + upcoming events after mid-session edits | Reading a single profile field | `admin_get_profile` |

### Calendar

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `calendar_entities_add` | Register a new thing to track (server, vehicle, location, etc.) | Entity already exists | `calendar_entities_update` |
| `calendar_entities_update` | Rename, retag, or retire (`active:false`) an entity | Entity doesn't exist yet | `calendar_entities_add` |
| `calendar_entities_delete` | Permanently remove an entity, cascading its events/links | Just want to stop scheduling against it | `calendar_entities_update` |
| `calendar_entities_list` | Enumerate entities with their dependency links | Need conflict or event data | `calendar_events_conflicts` |
| `calendar_entities_link` | Record or remove a dependency edge for conflict detection | Want to see existing links | `calendar_entities_list` |
| `calendar_events_add` | Schedule a one-off event (downtime, maintenance, delivery, etc.) | Editing an existing event | `calendar_events_update` |
| `calendar_events_update` | Move, retitle, or re-home an existing event | Event doesn't exist yet | `calendar_events_add` |
| `calendar_events_delete` | Remove one event permanently | Want to just move it | `calendar_events_update` |
| `calendar_events_list` | List/filter events in a time window | Only need the conflict report | `calendar_events_conflicts` |
| `calendar_events_conflicts` | Find overlapping or too-close-together events in a window | Just need the raw event list | `calendar_events_list` |
| `calendar_export_ics` | Export a window as an ICS file for calendar apps | Need machine-readable event data | `calendar_events_list` |

### Hands (project tools)

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `hands_list` | Enumerate Hands tools; pass `schema: true` for the `kontexta.json` authoring reference | Neither list nor schema needed | |
| `hands_confirm` | Approve a Hands token within 60s of issue | Normal MCP tool calls | |
| `hands_reload` | Re-read `hands.yaml` after editing it | First-time use (auto-loads) | |

### Onboarding

| Tool | When | Not when | Use instead |
|---|---|---|---|
| `projects_register` | Register a new project root with kontexta | Already registered | `projects_list` |
| `admin_onboard_agent` | Write/update the rules block in CLAUDE.md / AGENTS.md / etc. | Editing regular project content | `files_update` |
| `admin_transfer_agent_context` | Copy CLAUDE.md / AGENTS.md / `.cursor/rules/*.mdc` etc. from the project repo into Kontexta's KB. Originals are NEVER deleted by this tool. | User wants files to stay in the repo (default) | `projects_register` (which keeps files in place) |
