---
id: queue-system
title: Queue System (Leader-Follower)
sidebar_position: 5
---

# Queue System

The queue system lets one vehicle (the **follower**) hold at chosen points in its workflow until another vehicle (the **leader**) has reached a matching point in its own workflow. This is useful for staggering convoys or ensuring one vehicle clears a field location before the next begins.

Synchronization is **opt-in**: picking a leader by itself does nothing at runtime. The follower only actually waits where you've explicitly placed a **Wait for Leader** step, and it's released when the leader reaches a matching **Unlock Follower** step. A workflow with no marker steps runs completely independently of any leader, even if one was selected.

## How It Works

When you start a workflow on a vehicle that has **other vehicles already running workflows**, the
[Leader Vehicle Select Dialog](../ui/leader-select-dialog) appears:

| Choice | Effect |
|--------|--------|
| **Select** (pick a vehicle) | Your vehicle becomes a follower and is linked to the selected leader. Whether it actually waits anywhere depends entirely on the marker steps described below. |
| **No Leader** | Your vehicle starts immediately, with no synchronization. |
| **Cancel** | Workflow does not start. |

If no other vehicles are currently running a workflow, the dialog is skipped and the vehicle starts immediately.

## Adding the Sync Markers

**Wait for Leader** and **Unlock Follower** are step types like any other — add them via **Add Step** and select the type in the Step Dialog. Neither has a target or action to configure; they're pure checkpoints. See [Queue Sync Markers](step-types#queue-sync-markers) for the type reference.

- Add **Wait for Leader** to the **follower's** workflow at the point it should pause.
- Add **Unlock Follower** to the **leader's** workflow at the point that should release any followers waiting on it.

### How Pairing Works

Pairing is ordinal: the 1st Wait for Leader step in the follower's workflow is released once the leader reaches its 1st Unlock Follower step, the 2nd waits for the leader's 2nd, and so on. If the follower has more Wait for Leader steps than the leader has Unlock Follower steps, the extra wait blocks until the leader's workflow finishes entirely.

### Example — Mower and Windrower

A mower and a windrower need to work the same fields in sequence — the windrower can only start on a field after the mower has already finished and moved on.

```
Mower's workflow ("Mowing Route"):
Step 1: AutoDrive  → Field1_Entrance   Drive To
Step 2: Courseplay → Field1_Mow        Field Work
Step 3: Unlock Follower
Step 4: AutoDrive  → Field2_Entrance   Drive To
Step 5: Courseplay → Field2_Mow        Field Work
Step 6: Unlock Follower

Windrower's workflow ("Windrowing Route"):
Step 1: Wait for Leader
Step 2: AutoDrive  → Field1_Entrance   Drive To
Step 3: Courseplay → Field1_Windrow    Field Work
Step 4: Wait for Leader
Step 5: AutoDrive  → Field2_Entrance   Drive To
Step 6: Courseplay → Field2_Windrow    Field Work
```

- **Mower** starts first with no leader.
- **Windrower** starts second, selecting the Mower as leader, and immediately holds at its Step 1 (Wait for Leader).

Once the mower finishes Field 1 and reaches its Step 3 (Unlock Follower), the windrower is released and drives to Field 1 — the mower has already cleared it. The windrower then holds again at its Step 4 until the mower reaches its Step 6, and so on.

## Leader Stops or Finishes

If the leader vehicle's workflow is **stopped, completes, or is restarted**, any follower linked to it is automatically freed and continues running its own steps without waiting — including a follower that's mid-step rather than parked at a Wait for Leader checkpoint. This is checked continuously (~500ms), not just when the follower next hits a wait marker.

## How to Set Up

1. Add **Unlock Follower** steps to the workflow you'll run on the **leader** vehicle, at the points that should release followers.
2. Add **Wait for Leader** steps to the workflow you'll run on the **follower** vehicle, at the points it should pause.
3. Start the workflow on the **leader vehicle** first (no leader — it starts immediately).
4. Enter the **follower vehicle**, open Workflow Manager, select its workflow, and click **Start** — the leader selection dialog appears.
5. Pick the leader vehicle from the list and click **Select**.
6. The follower vehicle shows *Waiting for Leader* status in the HUD (with the leader's name, clickable to jump into it) whenever it's parked at a Wait for Leader step.

## Notes

- The leader and follower do **not** need to run the same workflow — any running vehicle can be chosen as leader, and its Unlock Follower steps are matched purely by ordinal position, not by step content.
- A follower can only have one leader at a time.
- There is no limit on how many vehicles can follow the same leader (each is checked independently).
- The queue system is separate from [support sub-steps](linked-workflows) — support vehicles execute *different* sub-steps alongside the main vehicle; follower vehicles execute their *own* workflow, only pausing at explicit checkpoints.
- Pause, Resume, and Stop on the follower vehicle work normally and do not affect the leader.
