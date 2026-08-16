---
id: console-commands
title: Console Commands
sidebar_position: 4
---

# Console Commands

Workflow Manager registers three read-only console commands for inspecting what a workflow is
actually doing. They print to the game console and `log.txt` — none of them change state, so
they're safe to run on a live save.

Open the console with **~** (tilde). If nothing happens, console commands need to be enabled in
`game.xml` (set `<development><controls>true</controls></development>`).

| Command | Scope |
|---------|-------|
| `wmPrintState` | The vehicle you're currently sitting in |
| `wmPrintStateAll` | Every vehicle with an active Workflow Manager execution |
| `wmPrintWorkflow` | Annotated step table for the controlled vehicle **and its leader** |

## `wmPrintState`

Dumps the full execution state of the controlled vehicle. If you aren't in a vehicle, it prints
`no controlled vehicle`; if the vehicle has no workflow running, it prints `(no active workflow)`.

```
----------------------------------------
[WM] John Deere S790
  workflow:          [wf_2] Harvest Route
  status:            RUNNING
  step:              3 / 6  (courseplay)
  isMainVehicle:     true
  leaderVehicle:     (none)
  waitForCompletion: true
  pendingADStart:    false
  pendingCPStart:    false
  cpToCpTransition:  false
  cpHandedOffToAD:   false
  pauseState:        (none)
  waitForMainStep:   nil
  leaderStep:        nil
  syncRequired:      nil
  blockedByLeader:   nil
----------------------------------------
```

### Reading the output

| Field | Meaning |
|-------|---------|
| `workflow` | `[id] name` of the running workflow |
| `status` | Execution status (Running, Paused, Waiting for leader, …) |
| `step` | Current step / total, with the step's type in parentheses |
| `isMainVehicle` | `true` for a main vehicle, `false` for a support vehicle |
| `leaderVehicle` | The [queue system](../workflows/queue-system) leader, or `(none)` |
| `waitForCompletion` | The executor is waiting for the current AD/CP job to report done |
| `pendingADStart` / `pendingCPStart` | A deferred AutoDrive/Courseplay start is queued (transitions defer a cycle or two on purpose) |
| `cpToCpTransition` | A Courseplay→Courseplay handover is being deferred |
| `cpHandedOffToAD` | Courseplay handed control to AutoDrive mid-step (e.g. a harvester calling an unloader) |
| `pauseState` | Tracking flags captured when the workflow was paused, restored on resume |
| `waitForMainStep` | Support vehicle only — the main step index it's waiting on |
| `leaderStep` | The leader's current step index, as seen by this follower |
| `syncRequired` | The leader step this follower needs before it can continue |
| `blockedByLeader` | Set when the follower is actually held right now, with both step numbers |

`pendingLeaderIdx`, `pendingLeaderWF`, and `pendingLeaderUid` appear when a leader link was
restored from a savegame but the leader vehicle hasn't been resolved yet — normal for a few
seconds after loading a save.

:::note
`blockedByLeader` is asked of the executor directly rather than recomputed by the command, so it
always reflects the real gate. If `syncRequired` is set but `blockedByLeader` is `nil`, the
follower has already been released and is free to move.
:::

## `wmPrintStateAll`

Runs the same dump for every vehicle the executor is tracking. This is the quickest way to see a
whole convoy at once — who's leading, who's blocked, and on which step. Prints
`no WM vehicles found` when nothing is running.

## `wmPrintWorkflow`

Prints the controlled vehicle's steps as a table, with the active step marked `[>]`, alongside
the **leader's** workflow so you can see both sides of a queue pairing at the same time.

```
------------------------------------------------------------
[WM WORKFLOWS] Krone BiG X 1180  status=WAITING_FOR_LEADER
  FOLLOWER  workflow:[wf_4] Windrowing Route  (6 steps)
    Idx  Type  Target                           Sync
    [>]  1  WAIT  (none)                            wait #1
         2  AD    Field1_Entrance                   -
         3  CP    Field1_Windrow                    -
         4  WAIT  (none)                            wait #2
         5  AD    Field2_Entrance                   -
         6  CP    Field2_Windrow                    -
  LEADER  (Claas Disco 9200)  workflow:[wf_3] Mowing Route  (6 steps)
    Idx  Type  Target                           Sync
         1  AD    Field1_Entrance                   -
    [>]  2  CP    Field1_Mow                        -
         3  UNLK  (none)                            unlock ←#1
         4  AD    Field2_Entrance                   -
         5  CP    Field2_Mow                        -
         6  UNLK  (none)                            unlock ←#2
```

Types are abbreviated: `AD` (AutoDrive), `CP` (Courseplay), `WAIT` (Wait for Leader),
`UNLK` (Unlock Follower).

The **Sync** column is what makes queue problems obvious. `wait #1` on the follower pairs with
`unlock ←#1` on the leader — the ordinal is the pairing, not the step number. In the example
above the windrower is holding at its `wait #1`, and the mower hasn't reached its
`unlock ←#1` (step 3) yet, so the hold is correct.

If a follower's `wait #N` has no matching `unlock ←#N` in the leader's table, that wait will only
release when the leader's whole workflow finishes. See
[Queue System](../workflows/queue-system) for the pairing rules.

## When to use these

- **A vehicle is stuck** → `wmPrintState`. Check `blockedByLeader` first, then
  `waitForCompletion` and the `pending*` flags.
- **A follower never moves** → `wmPrintWorkflow`. Compare the `wait #N` / `unlock ←#N` ordinals.
- **A convoy is out of order** → `wmPrintStateAll` to see every vehicle's step at once.
- **Reporting a bug** → paste the output of `wmPrintStateAll` into the issue along with
  `log.txt`. It's usually enough to reconstruct what the executor was doing.
