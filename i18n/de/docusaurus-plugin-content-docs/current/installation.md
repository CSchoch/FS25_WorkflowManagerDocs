---
id: installation
title: Installation
sidebar_position: 3
---

# Installation

## Download

Lade die neueste Version des FS25 Workflow Manager herunter:
- [GitHub Releases](https://github.com/CSchoch/LS25_WorkflowManager/releases)
- Giants ModHub (folgt)

## Installationsschritte

### Standardinstallation

1. Lade `FS25_WorkflowManager.zip` herunter
2. Kopiere die ZIP-Datei in deinen Mods-Ordner:
   ```
   Documents/My Games/FarmingSimulator2025/mods/
   ```
3. Entpacke die ZIP-Datei **nicht** – das Spiel lädt Mods direkt aus der ZIP

### Abhängigkeiten

| Mod | Erforderlich? | Download | Beschreibung |
|-----|-----------|----------|-------------|
| **Courseplay** | **Ja** | [GitHub](https://github.com/Courseplay/Courseplay_FS25) | Automatisiert die Feldarbeit |
| **AutoDrive** | Optional | [GitHub](https://github.com/Stephan-S/FS25_AutoDrive) | Übernimmt die Fahrten zwischen Orten |

Courseplay ist als Abhängigkeit der Mod eingetragen, das Spiel meldet es also als fehlend, wenn es
nicht installiert ist. AutoDrive wird nur für Workflows gebraucht, die **AutoDrive**-, **Parken**-,
**Auftanken**- oder **Reparieren**-Schritte enthalten – ohne AutoDrive sind diese Schritttypen im
Schritt-Dialog ausgeblendet, und Workflows aus reinen Courseplay-Schritten laufen ganz normal.

### Installation prüfen

1. Starte den Landwirtschafts-Simulator 25
2. Stelle in der Mod-Auswahl sicher, dass diese Mods aktiviert sind:
   - FS25_WorkflowManager
   - FS25_Courseplay
   - FS25_AutoDrive (falls du AutoDrive-Schritte nutzt)
3. Lade einen Spielstand
4. Drücke **Alt links + W** – der Workflow Manager sollte sich öffnen

## Dateistruktur

Nach der Installation sollte dein Mods-Ordner Folgendes enthalten:

```
mods/
├── FS25_WorkflowManager.zip
├── FS25_Courseplay.zip
└── FS25_AutoDrive.zip        (optional)
```

## Spielstand-Daten

Workflows werden pro Spielstand gespeichert in:
```
Documents/My Games/FarmingSimulator2025/savegame[X]/workflowManager.xml
```

Diese Datei wird automatisch angelegt, sobald du deinen ersten Workflow speicherst.

## Aktualisieren

So aktualisierst du Workflow Manager:

1. Lade die neue Version herunter
2. Ersetze die alte ZIP-Datei in deinem Mods-Ordner
3. Deine Workflows bleiben erhalten (sie liegen im Spielstand, nicht in der Mod)

## Deinstallation

So entfernst du Workflow Manager:

1. Lösche `FS25_WorkflowManager.zip` aus deinem Mods-Ordner
2. Lösche bei Bedarf `workflowManager.xml` aus jedem Spielstand-Ordner

## Probleme bei der Installation

### Mod erscheint nicht im Menü

- Prüfe, ob die ZIP-Datei im richtigen Mods-Ordner liegt
- Prüfe, ob Courseplay (und AutoDrive, falls du es nutzt) ebenfalls aktiviert ist
- Sieh in der Log-Datei des Spiels nach Fehlermeldungen

### Abhängigkeiten nicht gefunden

Wird Courseplay als fehlend gemeldet oder fehlen die AutoDrive-Schritttypen im Schritt-Dialog:
- Stelle sicher, dass Courseplay – und AutoDrive, falls du seine Schritttypen brauchst – installiert und aktiviert ist
- Lade den Spielstand nach dem Aktivieren der Mods erneut

Weitere häufige Probleme unter [Fehlerbehebung](./troubleshooting).
