---
id: leader-select-dialog
title: Leader Vehicle Select Dialog
sidebar_position: 6
---

# Leader Vehicle Select Dialog

This dialog picks which already-running vehicle the starting vehicle should treat as its
**leader** for the [queue system](../workflows/queue-system).

## When it appears

It appears on **Start** whenever at least one *other* vehicle is already running a workflow. If
nothing else is running there is no one to follow, so the dialog is skipped and the vehicle
starts immediately.

The vehicle you're starting is always excluded from the list — a vehicle cannot follow itself.

## The candidate list

Each row shows one running vehicle:

| Column | Description |
|--------|-------------|
| Vehicle name | The vehicle's in-game name |
| Workflow name | The workflow that vehicle is currently running |

The first entry is selected when the dialog opens. Double-clicking a row selects that vehicle and
confirms in one action.

## Buttons

| Button | Effect |
|--------|--------|
| **Select** | Links this vehicle to the highlighted leader, then starts the workflow |
| **No Leader** / **F** | Starts immediately with no leader link |
| **Cancel** / **Esc** | The workflow does not start |

**Select** is disabled when nothing is highlighted.

## Selecting a leader does not create waiting

This is the part worth internalizing: **picking a leader by itself changes nothing at runtime.**

The follower only actually holds where you have placed a **Wait for Leader** step in its own
workflow, and it is released when the leader reaches a matching **Unlock Follower** step. A
workflow with no marker steps runs start-to-finish exactly as if you had clicked **No Leader**.

If you selected a leader and the vehicle never waits anywhere, the usual cause is a follower
workflow with no **Wait for Leader** steps in it. See
[Queue System](../workflows/queue-system) for the ordinal pairing rules, and
[Console Commands](../api/console-commands#wmprintworkflow) — `wmPrintWorkflow` prints the
follower's and the leader's steps side by side with their pairing ordinals.

## After starting

The follower's HUD shows a *Waiting for leader* status with the leader's name whenever it is
parked at a checkpoint. The name is clickable and jumps you straight into that vehicle.

A follower can have only one leader at a time, but any number of vehicles may follow the same
leader. If the leader stops, finishes, or is restarted, every follower linked to it is freed
automatically and continues without waiting.
