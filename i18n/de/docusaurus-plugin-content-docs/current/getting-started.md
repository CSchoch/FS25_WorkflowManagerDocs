---
id: getting-started
title: Erste Schritte
sidebar_position: 2
---

# Erste Schritte

Diese Anleitung hilft dir, deinen ersten automatischen Workflow im Landwirtschafts-Simulator 25 anzulegen.

## Voraussetzungen

Bevor du Workflow Manager nutzt, stelle sicher, dass:

1. **Courseplay** installiert ist und mindestens einen gespeicherten Kurs hat
2. **AutoDrive** installiert und mit mindestens einem Ziel eingerichtet ist – *optional*, nur nötig für AutoDrive-, Parken-, Auftanken- und Reparieren-Schritte
3. du ein Fahrzeug hast, das Courseplay unterstützt (und AutoDrive, falls dein Workflow AutoDrive-Schritte nutzt)

## Tastenkürzel

Diese Kürzel funktionieren zu Fuß und im Fahrzeug:

| Kürzel | Aktion |
|----------|--------|
| **Alt links + W** | Workflow Manager öffnen/schließen |
| **Alt links + H** | HUD-Overlay ein-/ausblenden |

## Deinen ersten Workflow anlegen

### Schritt 1: Workflow Manager öffnen

Drücke **Alt links + W**, um den Workflow Manager zu öffnen.

Der Hauptdialog zeigt deine Liste von Workflows (anfangs leer).

### Schritt 2: Neuen Workflow anlegen

1. Klicke auf **Neu**
2. Gib einen Namen für deinen Workflow ein (z. B. „Feld 1 dreschen“)
3. Der Workflow-Editor öffnet sich

### Schritt 3: Schritte hinzufügen

1. Klicke auf **+** (Schritt hinzufügen), um einen neuen Schritt anzulegen
2. Wähle den Schritttyp:
   - **AutoDrive** – für Fahrten zwischen Orten (nur angeboten, wenn AutoDrive installiert ist)
   - **Courseplay** – für Feldarbeit
3. Richte den Schritt ein:
   - Für AutoDrive: ein Ziel und eine Aktion wählen (Fahren zu, Abholen und Liefern usw.)
   - Für Courseplay: einen gespeicherten Kurs und eine Aktion wählen (Feldarbeit, Ballen sammeln)
4. Mit dem Suchfeld findest du Ziele oder Kurse schnell
5. Klicke auf **OK**, um den Schritt hinzuzufügen

### Schritt 4: Editor schließen

Schließe den Editor, wenn du alle Schritte hinzugefügt hast. Dein Workflow wird automatisch gespeichert.

## Einen Workflow ausführen

### Workflow starten

1. **Steig in ein Fahrzeug**, das Courseplay unterstützt – und AutoDrive, falls der Workflow AutoDrive-Schritte hat
2. Drücke **Alt links + W**, um den Workflow Manager zu öffnen
3. Wähle deinen Workflow in der Liste
4. Klicke auf **Starten** (oder drücke **S**)

Der Workflow wird Schritt für Schritt ausgeführt. Der Dialog schließt sich und das HUD erscheint.

### Fortschritt verfolgen

Das **HUD im Fahrzeug** zeigt den aktuellen Status des Workflows. Mit den HUD-Tasten kannst du:
- den Workflow **pausieren/fortsetzen**
- zum nächsten oder vorherigen Schritt **springen**
- den Workflow **stoppen**

![HUD während ein Workflow läuft](/img/screenshots/hud-running.png)

### Fortsetzen nach dem Speichern

Speicherst du das Spiel, während ein Workflow läuft, bleibt der Zustand des Fahrzeugs automatisch erhalten. Nach dem Laden wird der Workflow pausiert wiederhergestellt und läuft, wo möglich, von selbst weiter – Courseplay-Feldarbeit startet etwa 10 Sekunden nach dem Laden an dem Wegpunkt neu, an dem gespeichert wurde. Bleibt er pausiert, setzt du ihn mit der **Fortsetzen-Taste im HUD** fort. Einzelheiten unter [Fortsetzen nach dem Speichern](./workflows/executing-workflows#resume-after-save).

Ein Klick auf **Starten** im Hauptdialog beginnt immer neu bei Schritt 1.

### Workflow abgeschlossen

Sind alle Schritte erledigt, ist der Workflow fertig. Du kannst ihn jederzeit von vorn starten, indem du ihn auswählst und auf **Starten** klickst.

## Beispiel: Einfacher Ernte-Workflow

Ein praktisches Beispiel für einen Weizenernte-Workflow:

| Schritt | Typ        | Ziel             | Aktion      |
|------|------------|------------------|-------------|
| 1    | AutoDrive  | Feld 1 Einfahrt  | Fahren zu   |
| 2    | Courseplay | Weizenernte F1   | Feldarbeit  |
| 3    | AutoDrive  | Hofsilo          | Fahren zu   |

Dieser Workflow:
1. fährt den Drescher zu Feld 1
2. arbeitet den Courseplay-Kurs ab und drischt das Feld
3. kehrt zum Hofsilo zurück

## Wie geht es weiter?

- Mehr Automatisierungsmöglichkeiten unter [Schritttypen](./workflows/step-types)
- Die [Benutzeroberfläche](./ui/main-dialog) im Detail
- Bei Problemen hilft die [Fehlerbehebung](./troubleshooting)
