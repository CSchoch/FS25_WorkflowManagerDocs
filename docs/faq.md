---
id: faq
title: FAQ
sidebar_position: 7
---

# Frequently Asked Questions

## General

### What is Workflow Manager?

Workflow Manager is a mod that connects AutoDrive and Courseplay, allowing you to create automated sequences of navigation and field work.

### Do I need both AutoDrive and Courseplay?

Yes, both mods are required. Workflow Manager acts as a bridge between them.

### Does it work in multiplayer?

Yes, workflows execute on the server and all players can see workflow status.

### Are my workflows saved?

Yes, workflows are saved automatically in your savegame folder and persist between sessions.

---

## Workflows

### How many steps can a workflow have?

There is no hard limit. However, very long workflows may be harder to manage.

### Can I copy a workflow?

Not currently. This feature is planned for a future update.

### Can I share workflows with others?

You can manually copy the `workflowManager.xml` file between savegames, but target names must match.

### Why can't I see my AutoDrive destinations?

Ensure AutoDrive is installed and you have created at least one map marker/destination.

### Why can't I see my Courseplay courses?

Courses must be saved in Courseplay before they appear. Check:
- `modSettings/FS25_Courseplay/Courses/[MapName]/`

### What are the Park, Refuel, and Repair step types?

They're AutoDrive utility stops with no target to configure — AutoDrive picks the destination itself each time the step runs (the vehicle's configured park spot, the nearest matching refuel station, or the nearest reachable repair marker). Useful for inserting automatic top-ups into a long-running workflow. See [Step Types](workflows/step-types#autodrive-utility-steps).

---

## Execution

### How do I open the Workflow Manager?

Press **Left Alt + W** from anywhere (on foot or in a vehicle).

### What are the keyboard shortcuts?

| Shortcut | Action |
|----------|--------|
| **Left Alt + W** | Open/close the Workflow Manager |
| **Left Alt + H** | Toggle the HUD overlay |

### Why won't my workflow start?

Check:
1. You're in a compatible vehicle (has both AD and CP support)
2. The workflow has at least one step
3. No other AD or CP job is running

### Can I use any vehicle?

The vehicle must have both AutoDrive and Courseplay specializations. Most tractors, harvesters, and trucks support both.

### What happens if I exit the vehicle during a workflow?

The workflow continues running. You can re-enter the vehicle to see the HUD.

### Can I run multiple workflows simultaneously?

One workflow per vehicle. Multiple vehicles can each run their own workflow. To coordinate two vehicles together on a single workflow, use [support sub-steps](workflows/linked-workflows).

### What happens after I reload a savegame?

Workflows that were running are set to paused. Open the Workflow Manager and resume them to continue from the saved step.

### What if a step fails?

The workflow stops and shows an error. Fix the issue, then restart or use the HUD to skip the step.

---

## Multi-Vehicle Workflows

### How do I coordinate two vehicles on one workflow?

Use **support sub-steps**. Each main step can have nested sub-steps that a helper vehicle (e.g., an unloader) executes while the main vehicle (e.g., a combine) stays on its step. Both vehicles start the same workflow — one picks **Run as Main**, the other picks **Run as Support**.

### Do both vehicles need separate workflows?

No. There is a single workflow. Both vehicles start it from the Workflow Manager and choose a role in the mode dialog.

### Does pausing the main also pause the support?

No. Support vehicles run independently — pausing or stopping the main vehicle does not affect them. Each vehicle is controlled from its own HUD.

### Can I manually control the support vehicle's steps?

Yes. The HUD's Previous/Next, Pause, and Stop buttons work on the support vehicle independently. Stop on the support does not affect the main.

### Can multiple support vehicles follow the same workflow?

Yes. Each support vehicle has its own independent sub-step counter and runs through the sub-steps at its own pace.

---

## Technical

### Where are workflows stored?

```
Documents/My Games/FarmingSimulator2025/savegame[X]/workflowManager.xml
```

### Can I edit workflows manually?

Yes, you can edit the XML file directly when the game is not running.

### Does Workflow Manager affect performance?

Impact is minimal. The mod checks workflow state twice per second (every 500ms) when a workflow is running.

### Something went wrong — where do I find error details?

The game writes errors to `log.txt` in your Farming Simulator 25 root folder. If you're reporting a bug, include relevant lines from this file.

---

### Can I select multiple fill types for a step?

Yes. For AutoDrive **Pickup and Deliver** and **Load** steps, the fill type list supports multi-select:
- **Click** an entry to select it (single selection)
- **Ctrl+Click** an entry to add or remove it from the selection
- Leave empty to accept any fill type

### Is there a queue system for multiple vehicles?

Yes. When you start a workflow and other vehicles are already running workflows, a **Leader Vehicle Select** dialog appears. Picking a leader alone doesn't make anything wait, though — synchronization is opt-in. Add explicit **Wait for Leader** steps to the follower's workflow, and matching **Unlock Follower** steps to the leader's workflow, to control exactly where the follower pauses. See [Queue System](workflows/queue-system) for details.

### Can I control which steps trigger the leader wait?

Yes — that's the entire point of the **Wait for Leader** / **Unlock Follower** step types. Add a Wait for Leader step to the follower's workflow at each point it should pause, and a matching Unlock Follower step to the leader's workflow at each point that should release it. Pairing is ordinal (1st waits for 1st, 2nd for 2nd, etc.), and a workflow with no marker steps never waits at all. See [Queue Sync Markers](workflows/step-types#queue-sync-markers).

---

## Future Plans

### Will conditions be supported?

Basic conditioning is available today via the **Wait for Leader** / **Unlock Follower** marker steps, letting you choose exactly which points in a workflow participate in leader-follower synchronization. More advanced conditions (if/then, external triggers) are planned for future updates.

### Will there be visual route planning?

This is being considered for future development.
