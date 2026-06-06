---
id: step-types
title: Step Types
sidebar_position: 2
---

# Step Types

Workflow Manager supports two types of steps: **AutoDrive** for navigation and **Courseplay** for field work.

## AutoDrive Steps

AutoDrive handles all navigation and transport operations.

### Actions

| Action | Targets needed | Description |
|--------|---------------|-------------|
| **Drive To** | 1 | Simple point-to-point navigation |
| **Unload Combine** | 2 | Unload combine (follows combine, delivers grain) |
| **Pickup and Deliver** | 2 | Load at target, deliver to unload target |
| **Deliver** | 1 | Deliver current load to target |
| **Load** | 2 | Load at target, return to unload target |

### Target Selection

- **Target**: Primary destination (where to go first)
- **Unload Target**: Secondary destination (for multi-destination modes)
- Destinations come from your AutoDrive network markers

### Fill Type Selection

For cargo operations (Pickup and Deliver, Load), you can select one or more fill types:
- **Click** an entry to select it (replaces any previous selection)
- **Ctrl+Click** an entry to toggle it on or off (add or remove from a multi-type selection)
- Selected entries are shown with a **✓** prefix in green
- The label below the list shows the selected types: `Selected: Wheat, Barley` (up to 2 names), or `Selected: 3 selected` for larger selections
- Limits what the vehicle will pick up — useful when multiple fill types are available at one location
- Leave empty to accept any fill type

### Examples

![Step Dialog – AutoDrive](/img/screenshots/step-dialog-autodrive.png)

**Simple Navigation**
```
Type:    AutoDrive
Target:  Field1_Entrance
Action:  Drive To
```

**Grain Delivery**
```
Type:          AutoDrive
Target:        Farm/Silo
Action:        Pickup and Deliver
Unload Target: Sell/Mill
Fill Types:    Wheat, Barley   (Ctrl+Click to select multiple)
```

**Combine Unloader**
```
Type:          AutoDrive
Target:        Field1_Harvest
Action:        Unload Combine
Unload Target: Farm/Silo
```

## Courseplay Steps

Courseplay handles all field work operations.

### Actions

| Action | Description |
|--------|-------------|
| **Field Work** | Standard field operations (harvest, cultivate, seed, spray, etc.) |
| **Bale Collect** | Collect, load, and wrap bales |

### Course Selection

- Courses must be saved in Courseplay before they appear in the dropdown
- Courses are stored in: `modSettings/FS25_Courseplay/Courses/[MapId]/`
- The dropdown shows all available courses for the current map

### Course Requirements

Before starting a workflow, ensure:
1. The vehicle has the course loaded
2. The vehicle is configured correctly for the course (implements attached)
3. The course was created for the correct field

### Examples

![Step Dialog – Courseplay](/img/screenshots/step-dialog-courseplay.png)

**Wheat Harvest**
```
Type:    Courseplay
Target:  Field1_Wheat_Harvest
Action:  Field Work
```

**Bale Collection**
```
Type:    Courseplay
Target:  Meadow_Baling_Route
Action:  Bale Collect
```

## Sync Settings

Every step (AutoDrive and Courseplay) has two sync settings at the bottom of the Step Dialog. These are only relevant when using the [queue system](queue-system) with a leader vehicle.

| Setting | Default | Description |
|---------|---------|-------------|
| **Sync Target** | Yes | When set on a **leader** step: this step is a sync checkpoint that follower vehicles wait for |
| **Sync Source** | Yes | When set on a **follower** step: this step waits for its matching leader checkpoint |

Both default to **Yes** — no changes needed unless you want to exclude specific steps from synchronization. See [Per-Step Sync Control](queue-system#per-step-sync-control) for examples.

## Step Transitions

### AutoDrive to Courseplay

When an AutoDrive step finishes and the next step is Courseplay:
1. The Courseplay course is pre-loaded onto the vehicle
2. AutoDrive hands off to Courseplay automatically
3. Courseplay starts field work without any manual input

### Courseplay to AutoDrive

When a Courseplay step finishes and the next step is AutoDrive:
1. Workflow Manager detects that Courseplay has stopped
2. The next AutoDrive route starts automatically

### Internal Handoffs

During Courseplay field work, AutoDrive may be triggered internally (e.g., a harvester calling an unloader via AutoDrive). The mod handles this automatically - it waits for both AutoDrive and Courseplay to finish before moving to the next step.

## Step Order Considerations

### Start Position
- The first step should account for where the vehicle currently is
- Use an AutoDrive **Drive To** step to position the vehicle if needed

### End Position
- Consider where the vehicle will be after the last step
- You may want to add a final AutoDrive **Drive To** step to return home

### Course Prerequisites
- Ensure implements are attached before starting
- For multi-tool workflows, consider implement changes between steps

## Troubleshooting Steps

### AutoDrive Step Won't Start
- Check that the destination exists in AutoDrive
- Verify the vehicle has the AutoDrive spec
- Ensure no other AD/CP job is running

### Courseplay Step Won't Start
- Verify the course exists and is for the correct map
- Check that required implements are attached
- Ensure the vehicle supports the course type

See [Troubleshooting](../troubleshooting) for more solutions.
