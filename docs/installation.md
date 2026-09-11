---
id: installation
title: Installation
sidebar_position: 3
---

# Installation

## Download

Download the latest version of FS25 Workflow Manager from:
- [GitHub Releases](https://github.com/CSchoch/LS25_WorkflowManager/releases)
- Giants ModHub (coming soon)

## Installation Steps

### Standard Installation

1. Download `FS25_WorkflowManager.zip`
2. Copy the ZIP file to your mods folder:
   ```
   Documents/My Games/FarmingSimulator2025/mods/
   ```
3. Do **not** extract the ZIP file - the game loads mods directly from ZIP

### Dependencies

| Mod | Required? | Download | Description |
|-----|-----------|----------|-------------|
| **Courseplay** | **Yes** | [GitHub](https://github.com/Courseplay/Courseplay_FS25) | Handles field work automation |
| **AutoDrive** | Optional | [GitHub](https://github.com/Stephan-S/FS25_AutoDrive) | Handles navigation between locations |

Courseplay is declared as a dependency of the mod, so the game reports it as missing if it isn't
installed. AutoDrive is only needed for workflows that contain **AutoDrive**, **Park**, **Refuel**,
or **Repair** steps — without it those step types are hidden in the Step Dialog, and workflows
made only of Courseplay steps run normally.

### Verifying Installation

1. Start Farming Simulator 25
2. In the mod selection screen, ensure these mods are enabled:
   - FS25_WorkflowManager
   - FS25_Courseplay
   - FS25_AutoDrive (if you use AutoDrive steps)
3. Load a savegame
4. Press **Left Alt + W** — the Workflow Manager should open

## File Structure

After installation, your mods folder should contain:

```
mods/
├── FS25_WorkflowManager.zip
├── FS25_Courseplay.zip
└── FS25_AutoDrive.zip        (optional)
```

## Savegame Data

Workflows are stored per savegame in:
```
Documents/My Games/FarmingSimulator2025/savegame[X]/workflowManager.xml
```

This file is created automatically when you save your first workflow.

## Updating

To update Workflow Manager:

1. Download the new version
2. Replace the old ZIP file in your mods folder
3. Your workflows are preserved (stored in savegame, not mod)

## Uninstallation

To remove Workflow Manager:

1. Delete `FS25_WorkflowManager.zip` from your mods folder
2. Optionally delete `workflowManager.xml` from each savegame folder

## Troubleshooting Installation

### Mod Not Showing in Menu

- Verify the ZIP file is in the correct mods folder
- Check that Courseplay (and AutoDrive, if you use it) is also enabled
- Look at the game log for error messages

### Dependencies Not Found

If Courseplay is reported missing, or the AutoDrive step types are missing from the Step Dialog:
- Ensure Courseplay — and AutoDrive, if you need its step types — is installed and enabled
- Load the savegame again after enabling the mods

See [Troubleshooting](./troubleshooting) for more common issues.
