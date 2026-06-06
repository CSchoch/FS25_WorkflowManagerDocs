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

## Per-Step Sync Control

By default every step participates in synchronization, keeping the follower exactly one step behind the leader at all times. You can adjust this per step using two settings in the **Step Dialog**:

| Setting | Who sets it | Default | Effect |
|---------|-------------|---------|--------|
| **Sync Target** | Leader step | Yes | This step is a sync checkpoint — followers must wait until the leader has moved past it |
| **Sync Source** | Follower step | Yes | This step waits for its matching leader checkpoint before starting |

Both settings default to **Yes**, so existing workflows behave exactly as before with no changes needed.

### How Pairing Works

Pairing is ordinal — the 1st Sync Source step waits for the 1st Sync Target step, the 2nd source for the 2nd target, and so on. Steps marked **No** are skipped when counting ordinals.

```
Leader steps (Sync Target):  Yes  No   Yes  Yes
                             ↑1       ↑2   ↑3   ← ordinal targets

Follower steps (Sync Source): Yes  Yes  No   Yes
                              ↑1   ↑2        ↑3  ← ordinal sources

Pairing:
  Follower step 1 (1st source) → waits for leader step 1 (1st target)
  Follower step 2 (2nd source) → waits for leader step 3 (2nd target)
  Follower step 3 (source=No)  → runs freely, no wait
  Follower step 4 (3rd source) → waits for leader step 4 (3rd target)
```

If a source has no matching target (more sources than targets), that follower step also runs freely.

### Example — Skipping Transit from Sync

A mower and windrower share a 4-step workflow:

```
Step 1: AutoDrive  → Field1_Entrance   Drive To
Step 2: Courseplay → Field1            Field Work
Step 3: AutoDrive  → Field2_Entrance   Drive To
Step 4: Courseplay → Field2            Field Work
```

Default behavior: windrower starts step N only after mower is on step N+1 — they are always one step apart, including transit.

With transit excluded from sync:

| | Step 1 (transit) | Step 2 (fieldwork) | Step 3 (transit) | Step 4 (fieldwork) |
|-|---|----|---|---|
| **Mower** Sync Target | **No** | Yes | **No** | Yes |
| **Windrower** Sync Source | Yes | Yes | Yes | Yes |

Result:
- Windrower step 1 (1st source) waits for mower step 2 (1st target) — windrower only starts driving to Field 1 **after the mower has already finished Field 1 and left**
- Windrower step 2 (2nd source) waits for mower step 4 (2nd target) — windrower only starts windrowing Field 1 after the mower has finished Field 2

This creates a larger gap that can be useful when the follower needs the field completely clear, not just started.

### How to Configure

Open the **Step Dialog** for any step (Add Step or Edit Step). The **Sync Target** and **Sync Source** dropdowns appear at the bottom. Set either to **No** to exclude that step from the sync sequence.

- Set **Sync Target = No** on a leader step to skip it as a checkpoint (followers count past it)
- Set **Sync Source = No** on a follower step to let it run freely regardless of leader position

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
