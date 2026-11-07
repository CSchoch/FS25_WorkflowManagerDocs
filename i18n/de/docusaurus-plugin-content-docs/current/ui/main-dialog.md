---
id: main-dialog
title: Hauptdialog
sidebar_position: 1
---

# Hauptdialog

Der Hauptdialog ist der Einstiegspunkt, von dem aus du alle deine Workflows verwaltest.

## Den Dialog öffnen

- Drücke **Alt links + W** – egal wo du gerade bist (zu Fuß oder im Fahrzeug)

## Überblick über die Oberfläche

![Hauptdialog](/img/screenshots/main-dialog.png)

## Workflow-Liste

Der Hauptbereich zeigt alle gespeicherten Workflows mit:

| Spalte | Beschreibung |
|--------|-------------|
| Workflow-Name | Name des Workflows – auf dem aktuellen Fahrzeug **grün** (läuft), **orange** (pausiert) oder **weiß** (inaktiv) eingefärbt |
| Unterstützung | **Ja**, wenn der Workflow Unterstützungsschritte enthält – beim Starten wird dann nach der Rolle gefragt (siehe [Rollen-Dialog](mode-dialog)) |
| Schritte | Gesamtzahl der Schritte oder, solange der Workflow auf dem aktuellen Fahrzeug aktiv ist, der Fortschritt als `aktuell/gesamt` (z. B. `2/6`) |

### Auswahl

- **Einfachklick**: Workflow auswählen
- **Doppelklick**: Workflow im Editor öffnen

## Schaltflächen

### Neuer Workflow

Legt einen neuen Workflow an:
1. Klicke auf **Neu**
2. Der [Editor-Dialog](editor-dialog) öffnet sich sofort mit einem leeren Workflow
3. Trag im Feld **Name** des Editors den Namen ein und füge Schritte hinzu
4. Klicke auf **Speichern**, um ihn zu übernehmen

Der neue Workflow landet erst in der Liste, wenn du auf **Speichern** klickst – brichst du den Editor ab,
bleibt kein leerer Eintrag zurück.

### Workflow bearbeiten

Öffnet den ausgewählten Workflow zum Bearbeiten:
1. Wähle einen Workflow aus der Liste
2. Klicke auf **Bearbeiten** (oder doppelklicke auf den Workflow)
3. Der Editor-Dialog öffnet sich

### Workflow löschen

Entfernt den ausgewählten Workflow:
1. Wähle einen Workflow aus der Liste
2. Klicke auf **Löschen**
3. Bestätige das Löschen

:::warning
Gelöschte Workflows lassen sich nicht wiederherstellen.
:::

### Workflow starten

Startet die Ausführung des ausgewählten Workflows:
1. Stelle sicher, dass du in einem passenden Fahrzeug sitzt
2. Wähle einen Workflow
3. Klicke auf **Starten**

Voraussetzungen:
- Das Fahrzeug muss Courseplay unterstützen – und AutoDrive, wenn der Workflow AutoDrive-, Parken-, Auftanken- oder Reparieren-Schritte enthält
- Der Workflow muss mindestens einen Schritt haben
- Es darf kein anderer AD- oder CP-Auftrag laufen

### Workflow stoppen

Stoppt einen laufenden Workflow:
1. Wähle den laufenden Workflow
2. Klicke auf **Stoppen**

Dadurch wird der Workflow auf Schritt 1 zurückgesetzt und sein Status auf „Bereit“ gesetzt.

### AD/CP Einstellungen

Öffnet für den ausgewählten Workflow den Dialog, mit dem du AutoDrive-Einstellungen überschreibst:
1. Wähle einen Workflow aus der Liste
2. Klicke auf **AD/CP Einstellungen**
3. Passe die Werte an und klicke auf **OK**

Diese Einstellungen werden bei jedem Start des Workflows automatisch angewendet. Alle Felder im
Einzelnen findest du unter [Dialog „AD/CP Einstellungen“](ad-settings-dialog).

### Schließen

Schließt den Dialog. Beim Schließen des Dialogs werden die Workflows gespeichert.

## Dialoge beim Start

Ein Klick auf **Starten** kann ein oder zwei weitere Dialoge öffnen, bevor der Workflow tatsächlich beginnt:

| Dialog | Erscheint, wenn |
|--------|--------------|
| [Rollen-Dialog](mode-dialog) | der Workflow Unterstützungsschritte enthält – wähle **Hauptfahrzeug** oder **Hilfsfahrzeug** |
| [Dialog „Anführerfahrzeug wählen“](leader-select-dialog) | andere Fahrzeuge bereits Workflows ausführen – wähle einen Anführer oder keinen |

Trifft keine der beiden Bedingungen zu, startet der Workflow sofort ohne Rückfrage.

## Tastenkürzel {/* #keyboard-shortcuts */}

### Global (funktionieren überall)

| Tastenkürzel | Aktion |
|----------|--------|
| **Alt links + W** | Workflow Manager öffnen |

### Im Dialog

| Taste | Aktion |
|-----|--------|
| **N** | Neuer Workflow |
| **T** | Ausgewählten Workflow bearbeiten |
| **R** | Ausgewählten Workflow löschen |
| **S** | Ausgewählten Workflow starten |
| **K** | Ausgewählten Workflow stoppen |
| **B** | AD/CP Einstellungen des ausgewählten Workflows |
| **↑ / ↓** | Durch die Workflow-Liste navigieren |
| Doppelklick | Workflow bearbeiten |

Pausieren und Fortsetzen findest du im [HUD](hud-controls). Alle Tasten lassen sich in den
Spieleinstellungen unter **Steuerung** neu belegen – eine dort gespeicherte Belegung hat Vorrang vor diesen Standards.

## Fortsetzen nach dem Speichern

Speicherst du das Spiel, während ein Workflow läuft, bleibt der Zustand des Fahrzeugs automatisch erhalten. Nach dem Laden wird der Workflow pausiert auf dem Fahrzeug wiederhergestellt und läuft, wo möglich, von selbst weiter – siehe [Fortsetzen nach dem Speichern](../workflows/executing-workflows#resume-after-save). Was dann noch pausiert ist, setzt du über das **HUD** fort.

Ein Klick auf **Starten** im Hauptdialog startet den Workflow immer neu ab Schritt 1.

## Statuszeile

Fehler und Hinweise, während der Dialog offen ist – zum Beispiel *Steig in ein Fahrzeug, um den Workflow zu starten*
nach **Starten** oder *Workflow gestoppt* –, erscheinen in der Statuszeile unten im Dialog
(Fehler in Rot) statt in den Benachrichtigungen des Spiels, die hinter dem Dialog verborgen wären.

## Speicherung

- Jede Änderung (Speichern im Editor, Löschen, AD/CP Einstellungen) wird sofort in
  `savegame[X]/workflowManager.xml` geschrieben
- Die Datei wird **bei jedem Öffnen des Dialogs neu eingelesen**, sodass Änderungen, die du daran
  bei laufendem Spiel vornimmst (zum Beispiel mit dem [Web-Editor](../web-editor)), in der Liste auftauchen – siehe
  [Die Datei bei laufendem Spiel bearbeiten](../api/xml-format#editing-the-file-while-the-game-runs)
- Workflows bleiben zwischen Spielsitzungen erhalten
