---
id: changelog
title: Changelog
---

# Changelog

What changed in each release of Workflow Manager. The same list is part of the mod's description in the game.

## v1.3.0 (2026-11-07)

- New support step option "Finish before switching": the support vehicle completes its current task before it follows the main vehicle to the next step
- Workflows can now be edited while they are running
- Changes made in the web editor while the game is running are picked up when you open Workflow Manager
- Mod options are now saved per player instead of in the savegame
- New options in the General settings: show the Workflow Manager keys in the F1 help window, and debug logging for bug reports
- Errors and hints are shown directly in the open dialog; configuration errors are reported to every player of the farm
- Refreshed dialogs and HUD: coloured AD / CP step markers, support vehicle info, and on a support vehicle a click on the main vehicle name switches to it
- Fixed: workflows could be lost when saving twice in one session
- Fixed: deleting a workflow now stops every vehicle running it
- Fixed: AutoDrive, Refuel and Repair steps did not restart after loading a savegame
- Fixed: a step was skipped after loading when the game was saved right between two steps
- Fixed: the step dialog sometimes showed the previous step's destinations or reset the fill types

## v1.2.0 (2026-09-23)

- New step types: Park, Refuel and Repair (via AutoDrive)
- Leader and follower vehicles: a follower waits at a "Wait for Leader" step until its leader releases it with "Unlock Follower"
- Seed type per Courseplay field work step - the seeder is switched automatically
- AutoDrive is now optional: pure Courseplay workflows run without it
- Courseplay field work now continues from the last waypoint after loading a savegame instead of restarting the whole field
- New mod option in the General settings: turn automatic Courseplay resume after loading on or off
- HUD: click the leader or main vehicle name to switch to that vehicle
- Keyboard shortcuts in all dialogs; Edit is now T and Stop is K so they no longer clash with the game's menu keys
- Many multiplayer and save / load fixes

## v1.1.0 (2026-05-20)

- Support vehicles that work alongside the main vehicle (e.g. a grain cart following a combine)
- Choose your role (Main or Support) when starting a workflow that has support tasks
- Workflow progress for support vehicles is saved and restored correctly
- Pausing now works correctly when the main vehicle moves to a new step
- HUD can be dragged to any position on screen
- Multiplayer improvements: all vehicles stay in sync across all players
- Support vehicles continue running when the main vehicle is paused
- Per-workflow AutoDrive settings: set Unload Fill Level, Pipe Offset, and Pre-Call Level individually for each workflow via the new AD/CP Settings button

## v1.0.0 (2026-03-11)

- Initial release
