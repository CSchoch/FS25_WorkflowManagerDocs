---
id: queue-system
title: Queue System (Leader-Follower)
sidebar_position: 5
---

# Queue System

The queue system lets multiple vehicles run the same route in sequence — a **follower** vehicle waits at each step until a **leader** vehicle has already moved past it, then starts that step itself. This is useful for staggering convoys or ensuring one vehicle clears a field location before the next begins.

## How It Works

When you start a workflow on a vehicle that has **other vehicles already running workflows**, a dialog appears:

![Leader vehicle select dialog](/img/screenshots/leader-select-dialog.png)

| Choice | Effect |
|--------|--------|
| **Select** (pick a vehicle) | Your vehicle becomes a follower. It waits at each step until the selected leader has advanced past it. |
| **No Leader** | Your vehicle starts immediately, with no synchronization. |
| **Cancel** | Workflow does not start. |

If no other vehicles are currently running a workflow, the dialog is skipped and the vehicle starts immediately.

## Follower Behavior

The follower vehicle checks the leader's current step on each update cycle (~500ms):

- If the **leader is on the same step or behind**: the follower waits (status: *Waiting for Leader*)
- If the **leader has advanced past the follower's current step**: the follower starts its step

This means the follower starts step N only after the leader is already on step N+1 or later — keeping the two vehicles exactly one step apart.

### Example — Mower and Windrower

A mower and a windrower need to work the same fields in sequence — the windrower can only start on a field after the mower has already finished and moved on.

```
Workflow: "Mowing Route"

Step 1: AutoDrive  → Field1_Entrance   Drive To
Step 2: Courseplay → Field1_Mow        Field Work
Step 3: AutoDrive  → Field2_Entrance   Drive To
Step 4: Courseplay → Field2_Mow        Field Work
```

- **Mower** starts first with no leader.
- **Windrower** starts second, selecting the Mower as leader.

The windrower waits at Step 1 while the mower is still driving to Field 1. Once the mower begins field work (Step 2), the windrower drives to Field 1. The windrower then waits at Step 2 until the mower finishes Field 1 and moves to Step 3. Only then does the windrower start field work on Field 1 — the mower has already cleared the field and is en route to Field 2. The two vehicles stay one step apart at all times.

## Leader Stops or Finishes

If the leader vehicle's workflow is **stopped or completes**, the follower is automatically freed and resumes running its own steps without waiting.

## How to Set Up

1. Start the workflow on the **first vehicle** (no leader — it starts immediately).
2. Enter the **second vehicle**, open Workflow Manager, select the same or a different workflow.
3. Click **Start** — the leader selection dialog appears.
4. Pick the first vehicle from the list and click **Select**.
5. The second vehicle enters *Waiting for Leader* status until the leader advances.

## Notes

- The leader and follower do **not** need to run the same workflow — any running vehicle can be chosen as leader.
- A follower can only have one leader at a time.
- There is no limit on how many vehicles can follow the same leader (each is checked independently).
- The queue system is separate from [support sub-steps](linked-workflows) — support vehicles execute *different* sub-steps alongside the main vehicle; follower vehicles execute the *same* steps in sequence.
- Pause, Resume, and Stop on the follower vehicle work normally and do not affect the leader.
