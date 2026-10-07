---
id: web-editor
title: Web Editor
sidebar_position: 4
---

# Web Editor

**[Open the Web Editor →](https://cschoch.github.io/FS25_WorkflowManagerWebeditor/)**

![The FS25 Workflow Manager Web Editor](/img/screenshots/web-editor.png)

The Web Editor is a standalone browser app for building Workflow Manager workflows without the
game running. It produces a game-ready `workflowManager.xml` that you drop into your savegame
folder — useful for planning long workflows on a second monitor, or editing them comfortably with
a real keyboard instead of the in-game dialogs.

It's a static page with no server, no account, and no build step. Everything stays in your
browser.

## What it can do

The editor mirrors the in-game editor feature for feature:

- **Workflows** — create, rename, duplicate, delete, and search (duplicate and delete sit next to
  each workflow in the list)
- **All seven step types** — AutoDrive, Courseplay, the sync markers *Wait for Leader* and
  *Unlock Follower*, and the targetless *Park* / *Refuel* / *Repair* steps (quick-add buttons,
  no dialog needed)
- **AutoDrive modes** — Drive To, Pickup & Deliver, Deliver, Load, Unload, with the same dynamic
  target and second-target labels as the [Step Dialog](workflows/step-types#autodrive-steps)
- **Courseplay actions** — Field Work (with an optional seed type) and Bale Collect
- **Fill types** — multi-select with search; the full FS25 base list is built in, and custom mod
  fill type IDs can be typed in by hand
- **Support sub-steps** — nest, reorder, edit, and duplicate support-vehicle steps under any main
  step (see [Multi-Vehicle Workflows](workflows/linked-workflows))
- **AD/CP settings** per workflow — Unload Fill Level (%), Pipe Offset (m), Pre-Call Level (%)
- **Reordering** — move buttons and drag & drop
- **Autosave** to browser local storage, **light/dark mode**, and an **English/German** interface

:::note
Sync markers are deliberately not offered inside support sub-steps — exactly as in-game,
leader/follower pairing is built from main steps only. See [Queue System](workflows/queue-system).
:::

:::info
The editor always offers all seven types — a browser can't tell whether AutoDrive is installed.
In-game, AutoDrive is optional: a workflow with **AutoDrive**, **Park**, **Refuel**, or **Repair**
steps needs it to start, while a Courseplay-only workflow runs without it.
:::

## Reading the step list

A workflow is drawn as a route, top to bottom, the order the vehicle runs it:

- A **blue dot** is an AutoDrive step, a **green dot** a Courseplay step. A **ringed blue dot** is
  Park, Refuel, or Repair — AutoDrive picks the spot itself.
- **Wait for Leader** and **Unlock Follower** are drawn as dashed gates across the route.
- **Support steps** branch off to the right of the main step they belong to (numbered `3.1`,
  `3.2`, …).
- Destinations show the AutoDrive group or Courseplay folder dimmed and the marker or course in
  full. Two destinations are listed in driving order — a **Load** step shows *Load At* first, then
  *Return To*.
- A step with no target is marked in red.

Click a step to edit it. Hovering a step (or tabbing to it) shows its buttons: add a support step,
move up/down, duplicate, and delete. On a phone they're always shown.

![Editing a Load step: the job picker on the left, the stops in driving order on the right](/img/screenshots/web-editor-step-dialog.png)

The step dialog has one choice for what the vehicle does, grouped by the mod that runs it, and the
fields that job needs. Its ‹ › arrows move to the previous or next step and keep your changes, like
Save.

## Round-tripping your savegame

### Edit the savegame directly (Chrome, Edge)

1. Click **Open savegame** and pick the `.../My Games/FarmingSimulator2025/` folder, then choose
   the savegame from the list (map, savegame name, last saved; newest first). Picking that folder
   instead of a single `savegameN` also finds Courseplay's courses (see
   [Target suggestions](#target-suggestions)). A `savegameN` folder works too, and either folder can
   be dragged from Explorer onto the page. The savegame's `workflowManager.xml` is loaded and the
   browser asks once to allow editing files in that folder (for a dropped folder, on the first
   save).
2. Build or edit your workflows.
3. Click **Save to savegameN** — the file is written straight into the folder. The game can keep
   running: it reads the file again every time you open the Workflow Manager window.

The folder stays linked across page reloads; after a reload the browser asks for permission again
on the first save. If the game changed the file since the editor loaded it (an in-game edit or a
game save), Save asks before overwriting — click **Reload** to load the newer file instead.

**Reload** reads the linked savegame again: its `workflowManager.xml`, its AutoDrive destinations
and its Courseplay courses (see [Target suggestions](#target-suggestions)). It only asks first if
you changed something in the editor that you haven't saved to the savegame yet, and it keeps the
workflow you're editing open.

### Import / Export (any browser)

Firefox and Safari don't let web pages write into folders, so there the **Open savegame** buttons
(in the toolbar and on the welcome page) are hidden:

1. **Import** your existing `workflowManager.xml` — use the file picker or just drop the file
   anywhere on the page.
2. Build or edit your workflows.
3. **Export XML**, then replace `workflowManager.xml` in your savegame folder
   (`.../My Games/FarmingSimulator2025/savegameN/`). The game can keep running: it reads the file
   again every time you open the Workflow Manager window.

Older save formats — linked-workflow pairs and per-step sync flags — are migrated on import using
the same rules as `WorkflowStorage.lua` in-game, so an old file imports cleanly and exports as
current `formatVersion 2`. The exported file holds workflows only: the mod's settings and the HUD
position are stored per player by the game (see [XML Format](api/xml-format#settings-separate-file)).

:::warning
Export replaces the whole file. Workflows you removed in the editor are **stopped** in-game the
next time the file is read, and a workflow that is running continues with its new steps, matched
by step number. Keep a backup of the original file until you've confirmed the workflows load
correctly.
:::

## Target suggestions

![The Targets dialog: AutoDrive destinations and Courseplay courses, grouped as in-game](/img/screenshots/web-editor-targets.png)

Target fields are free text, and they autocomplete from the lists under **Targets**. **Each
savegame has its own lists**, so switching savegames never offers another map's markers or
courses.

With a linked savegame (Chrome, Edge), the lists fill themselves on **Open savegame** and
**Reload**:

- **AutoDrive destinations** are read from the savegame's `AutoDrive_config.xml`.
- **Courseplay courses** live outside the savegame, per map
  (`.../FarmingSimulator2025/modSettings/FS25_Courseplay/Courses/<map>/`). When you open the
  `FarmingSimulator2025` folder, that `Courses` folder is found and linked automatically. From then
  on the editor reads the courses of whichever map the open savegame uses, even when you later
  open a `savegameN` folder directly.

If something can't be found automatically, **Targets** opens by itself, and the half that's
missing tells you why, next to the button that fixes it:

| What's missing | Why | What to do |
|---|---|---|
| Courseplay courses | You opened a `savegameN` folder and no `Courses` folder is linked yet. A browser can't look outside the folder you picked. | **Link folder** and pick `Courses` or the `FarmingSimulator2025` folder, or open the `FarmingSimulator2025` folder next time. |
| Courseplay courses | The linked folder is one map's folder, and this savegame plays another map. | **Change folder** and pick `Courses` itself, which covers every map. |
| Courseplay courses | After a page reload, the browser needs your permission again. | **Allow access**. |
| Courseplay courses | The linked folder can't be read (moved or deleted). | **Change folder**. |
| AutoDrive destinations | The savegame has no `AutoDrive_config.xml`, but your workflows use AutoDrive steps. AutoDrive writes it when the game is saved. | **Import file**, or type destinations by hand. |

You're only asked about a mod your workflows use: AutoDrive is optional, so a Courseplay-only
workflow never asks for `AutoDrive_config.xml`.

Picking one map's folder inside `Courses` with **Link folder** works too, but then only savegames
on that map get their courses.

Each list is grouped the way the game groups it — destinations by AutoDrive group, courses by
field folder — and the field above it filters the list as you type; press Enter to add the typed
name. Click a group to fold it; its ✕ removes the whole group with its entries, and **Clear**
removes everything listed (only the matches while you filter). Without a linked savegame or
Courseplay folder, **Import file** reads the marker names of
an `AutoDrive_config.xml` and **Import folder** reads the course names of your map's folder inside
`Courses`. Names that your workflows already use are always listed.

AutoDrive destinations are listed the way the game's step dialog shows them: `group/marker`
(for example `Felder 41-60/Feld 41`), or just the marker name for AutoDrive's default group.

:::tip
Courseplay course names are stored as **folder-qualified paths** (for example
`Singleplayer/F34/Kalken`). When importing course names, keep the folder structure intact — a bare
course name can match the wrong field if the same name exists in more than one folder. See
[Course Selection](workflows/step-types#course-selection).
:::

## Running it locally

The editor is a plain `index.html` — download the repository and open the file directly in a
browser. No web server needed.

Source and issues: [FS25_WorkflowManagerWebeditor](https://github.com/CSchoch/FS25_WorkflowManagerWebeditor)
