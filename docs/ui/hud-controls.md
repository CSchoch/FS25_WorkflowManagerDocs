---
id: hud-controls
title: HUD Controls
sidebar_position: 7
---

# HUD Controls

The in-vehicle HUD provides workflow control without opening menus.

## HUD Overview

When a workflow is running, an overlay appears on screen:

![HUD while workflow is running](/img/screenshots/hud-running.png)

The **Pause** and **Resume** buttons share the same slot. The button shows `||` (Pause) while the workflow is running, and switches to `▶` (Resume) when the workflow is paused.

Hovering over any button shows a tooltip label: **Previous Step**, **Pause**, **Resume**, **Stop**, or **Next Step**.

### Main Vehicle with Support Vehicles

If one or more support vehicles are running the same workflow, an extra line at the bottom
counts them by state:

![Main vehicle HUD with support vehicles](/img/screenshots/hud-support-main.png)

`Supporters: 1 working · 1 waiting` — each state is coloured: **green** working, **orange**
paused, **yellow** waiting (for the main vehicle or for a leader). States no support vehicle is in
are left out.

### Support Vehicle HUD

When running as a **support vehicle**, the step line shows which main step is being followed and
which sub-step is running:

![Support vehicle HUD](/img/screenshots/hud-support-vehicle.png)

`Step 2 · support 1/2` means: the main vehicle is on step 2, and the support vehicle is running
sub-step 1 of the 2 sub-steps of that main step. When it has finished all of them it waits until
the main vehicle advances. The bottom line reads **Main vehicle:** followed by its name — click
the name to switch into the main vehicle.

## HUD Position

The HUD can be freely repositioned by dragging:
- **Click and drag the header** to move the HUD anywhere on screen
- Position is clamped to screen bounds so it won't go off-screen
- The header changes color while dragging for visual feedback
- Default position: lower-left area

## Status Display

### Header
The header shows **Workflow Manager** and an **X** on the right. The X closes the HUD — the same
as **Left Alt + H**. The line below shows the workflow name.

### Step Line
A coloured chip names the system the step uses, followed by the step counter and the target:

| Chip | Colour | Steps |
|------|--------|-------|
| `AD` | Blue | AutoDrive steps |
| `PARK`, `REFUEL`, `REPAIR` | Blue | Park, Refuel, Repair (driven by AutoDrive) |
| `CP` | Green | Courseplay steps |
| `WM` | Amber | Wait for Leader, Unlock Follower |

The text reads `Step 2/5: Field1_Harvest` on a main vehicle and `Step 2 · support 1/2: Silo` on a
support vehicle. Courseplay courses are shown without the leading `Singleplayer/` folder; steps
without a target show their type name instead.

### Progress Bar
A thin bar under the step line shows how much of the workflow is done: the finished steps plus,
while Courseplay is working, its progress on the current field. It has the colour of the current
step's chip.

### Vehicle Status
The line below the bar shows what the vehicle is doing right now: **CP active (42%)**,
**AD active**, **Paused**, or **Idle**.

### Waiting for Leader / Waiting for Main
When the vehicle is parked at a **Wait for Leader** step, or is a support vehicle that has finished its sub-steps, the status line reads **Waiting for leader** or **Waiting for main vehicle** followed by that vehicle's name. The name is clickable — click it to jump straight into that vehicle (same as AutoDrive's and Courseplay's own "switch vehicle" links). Hovering it shows *Click to switch to this vehicle*.

## Control Buttons

### Previous Step (`<<`)

**Function**: Jump to the previous step

**When to use**:
- Repeat a step that didn't complete correctly
- Go back after accidentally skipping

**Behavior**:
- Stops current step
- Moves to previous step
- Starts that step

**Disabled when**: On step 1 (no previous step)

### Pause / Resume (`||` / `▶`)

**Function**: Toggle workflow pause state. The button shows **Pause** (`||`) while running and switches to **Resume** (`▶`) when paused — only one is visible at a time.

**Pause (`||`)** — shown while the workflow is running:
- Suspends the current step
- AutoDrive pauses navigation
- Courseplay pauses field work
- Support vehicles continue running independently

**Resume (`▶`)** — shown while the workflow is paused:
- Continues from where it stopped

**When to use**:
- Need to make manual adjustments
- Temporary stop without resetting

### Stop (□)

**Function**: Completely stop the workflow

**Behavior**:
- Stops current step
- Resets workflow to step 1
- Sets status to Ready
- Stops any running AD/CP jobs
- Support vehicles continue running independently

**When to use**:
- Abort the workflow
- Something went wrong
- Want to restart from beginning

### Next Step (`>>`)

**Function**: Skip to the next step

**When to use**:
- Current step is stuck
- Want to skip a step manually
- Testing workflow progression

**Behavior**:
- Stops current step
- Moves to next step
- Starts that step

**Disabled when**: On last step (no next step)

## Button States

### Visual Feedback

| State | Color | Description |
|-------|-------|-------------|
| Normal | White | Default state |
| Hover | Cyan | Mouse is over button |
| Active | Green | Currently active (e.g., running) |
| Disabled | Gray | Action not available |

## Interaction

### Mouse Control
- Move mouse over buttons to see hover effect
- Click to activate the button

### Mouse Cursor Handling

The HUD turns the mouse cursor on while it's the surface you're interacting with, and hands it
back to the game when it's done. It only ever switches off a cursor it turned on itself, so a
cursor that Workflow Manager didn't request — one belonging to AutoDrive, Courseplay, or a game
menu — is left alone.

This matters when dialogs are involved: opening the Workflow Manager dialogs, the Step Dialog, the
leader selection dialog, and so on all take the cursor while they're open. Closing the last one
returns the cursor to whatever state the HUD needs. If a workflow is started from a chain of
dialogs, the cursor grant waits until that chain finishes closing rather than flickering on and
off between dialogs.

If the cursor ever gets stuck on, toggling the HUD off and on with **Left Alt + H** resets it.

### Toggle HUD

Press **Left Alt + H** to show or hide the HUD overlay, or click the **X** in the header to close it.

## When HUD Appears

The HUD is visible when:
- A workflow is running or paused
- You are in the vehicle that started the workflow

The HUD hides when:
- Workflow is stopped or completed
- You exit the vehicle
- Game menu is open

## HUD Updates

The HUD updates in real-time:
- Step line and progress bar update on step change
- Button states update on workflow state change
- Target info updates for each step

## Customization

- Toggle the HUD with **Left Alt + H**, or close it with the **X** in its header
- Reposition the HUD by dragging the header to any location on screen

## Troubleshooting

### HUD Not Appearing
- Ensure a workflow is running
- Check you're in the correct vehicle
- Verify the workflow has steps

### Buttons Not Responding
- Check button is not disabled (gray)
- Ensure mouse is clicking the button area
- Game may need focus

### HUD Overlapping Other UI
- Drag the HUD to a different position by clicking and holding the header
- The F1 help window can overlap — switch off **Show keys in the help window** in the [settings](../workflows/executing-workflows#settings) to drop the Workflow Manager keys from it
