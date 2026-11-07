---
id: executing-workflows
title: Workflows ausführen
sidebar_position: 3
---

# Workflows ausführen

Diese Anleitung beschreibt, wie du Workflows startest, verfolgst und während der Ausführung steuerst.

## Einen Workflow starten

### Voraussetzungen

Bevor du einen Workflow startest:
1. Steig in ein **passendes Fahrzeug** (muss Courseplay unterstützen – und AutoDrive, wenn der Workflow AutoDrive-, Parken-, Auftanken- oder Reparieren-Schritte enthält)
2. Stelle sicher, dass die nötigen **Geräte angehängt** sind
3. Auf dem Fahrzeug sollte kein anderer AD- oder CP-Auftrag laufen

### Start aus der Oberfläche

1. Drücke **Alt links + W**, um den Workflow Manager zu öffnen
2. Wähle einen Workflow aus der Liste
3. Klicke auf **Starten** (oder drücke **S**)

Workflows ohne Unterstützungsschritte starten sofort und der Dialog schließt sich.

### Rollenwahl (Workflows mit mehreren Fahrzeugen)

Enthält der Workflow Unterstützungsschritte, erscheint vor dem Start der Dialog **Rolle wählen**:

![Rollen-Dialog](/img/screenshots/mode-dialog.png)

- **Hauptfahrzeug** – dieses Fahrzeug führt den Workflow an. Es arbeitet die Hauptschritte der Reihe nach ab.
- **Hilfsfahrzeug** – dieses Fahrzeug hilft. Es führt die Unterstützungsschritte des Hauptschritts aus, bei dem das Hauptfahrzeug gerade ist.

So startest du einen Aufbau mit zwei Fahrzeugen:
1. Steig ins **Hauptfahrzeug** (z. B. den Drescher) → Workflow Manager öffnen → Starten → **Hauptfahrzeug**
2. Steig ins **Hilfsfahrzeug** (z. B. den Überladewagen) → Workflow Manager öffnen → Starten → **Hilfsfahrzeug**

Beide Fahrzeuge nutzen denselben Workflow. Der Hauptdialog zeigt `[+S]` neben Workflows, die Unterstützungsschritte haben.

Einzelheiten unter [Workflows mit mehreren Fahrzeugen](linked-workflows).

## Status eines Workflows

Ein Workflow kann vier Zustände haben:

| Status | Beschreibung |
|--------|-------------|
| **Bereit** | Der Workflow ist eingerichtet und startklar |
| **Läuft** | Der Workflow wird gerade ausgeführt |
| **Pausiert** | Der Workflow ist pausiert und wartet aufs Fortsetzen |
| **Abgeschlossen** | Alle Schritte sind erledigt |

## HUD im Fahrzeug

Läuft ein Workflow, erscheint ein HUD-Overlay mit:
- Name des aktuellen Workflows
- Einem farbigen Chip für das System des Schritts (AD, CP, WM, …), dem aktuellen Schritt und seinem Ziel (z. B. `Schritt 2/5: Field1_Harvest`)
- Einem Fortschrittsbalken für den ganzen Workflow
- Was das Fahrzeug gerade tut (CP aktiv, AD aktiv, Pausiert, Wartet auf Anführer, …)
- Steuertasten

Bei Hilfsfahrzeugen zeigt die Schrittzeile die Position des Unterstützungsschritts, z. B. `Schritt 2 · Unterstützung 1/2` (das Hauptfahrzeug ist bei Schritt 2, das Hilfsfahrzeug führt Unterstützungsschritt 1 von 2 aus). Alle Zeilen findest du unter [HUD-Steuerung](../ui/hud-controls).

![HUD während ein Workflow läuft](/img/screenshots/hud-running.png)

### HUD-Steuerung

| Taste | Symbol | Funktion |
|--------|------|----------|
| Zurück | `<<` | Zum vorherigen Schritt springen |
| Pausieren | `\|\|` | Den aktuellen Workflow pausieren |
| Fortsetzen | `>` | Einen pausierten Workflow fortsetzen |
| Stoppen | `□` | Den Workflow stoppen und zurücksetzen |
| Weiter | `>>` | Zum nächsten Schritt springen |

### Farben der Tasten

- **Weiß**: Normalzustand
- **Cyan**: Mauszeiger darüber
- **Grün**: Aktiv (z. B. Play, während er läuft)
- **Grau**: Deaktiviert

## Die Ausführung steuern

### Pausieren

Pausiere einen Workflow, um:
- die Automatisierung kurz anzuhalten
- von Hand etwas anzupassen
- auf unerwartete Situationen zu reagieren

Im pausierten Zustand:
- bleibt der aktuelle Schritt aktiv, ist aber angehalten
- pausiert AutoDrive die Fahrt
- pausiert Courseplay die Feldarbeit
- pausieren beim Pausieren aus dem **Hauptfahrzeug** auch alle aktiven Hilfsfahrzeuge

### Fortsetzen

Einen pausierten Workflow fortsetzen:
- Klicke im HUD auf die Taste Fortsetzen (Play)
- Die Ausführung geht dort weiter, wo sie angehalten hat

### Schritte überspringen

Mit Zurück/Weiter navigierst du von Hand:
- **Weiter**: Zum nächsten Schritt springen (nützlich, wenn der aktuelle Schritt hängt)
- **Zurück**: Zurückgehen, um einen Schritt zu wiederholen

:::warning
Nach dem Überspringen von Schritten kann das Fahrzeug an einer unerwarteten Stelle stehen. Mit Bedacht verwenden.
:::

### Stoppen

Einen Workflow vollständig stoppen:
- Setzt den Workflow auf Schritt 1 zurück
- Setzt den Status wieder auf Bereit
- Stoppt laufende AutoDrive- oder Courseplay-Aufträge
- Stoppen des **Hauptfahrzeugs** stoppt auch alle aktiven Hilfsfahrzeuge

## Abschluss eines Schritts

### Abschluss eines AutoDrive-Schritts

Ein AutoDrive-Schritt ist erledigt, wenn:
- das Fahrzeug das Ziel erreicht
- das Ab- bzw. Beladen beendet ist (bei Lade-Modi)

### Abschluss eines Courseplay-Schritts

Ein Courseplay-Schritt ist erledigt, wenn der Feldarbeitskurs beendet ist.

### Ablauf der Unterstützungsschritte {/* #support-sub-step-sequencing */}

Als Hilfsfahrzeug:
1. Unterstützungsschritt 1 des aktuellen Hauptschritts ausführen
2. Unterstützungsschritt 2 ausführen … und so weiter durch alle Unterstützungsschritte
3. Nach dem letzten Unterstützungsschritt **warten**, bis das Hauptfahrzeug weitergeht
4. Geht das Hauptfahrzeug weiter, sofort Unterstützungsschritt 1 des neuen Schritts starten

Geht das Hauptfahrzeug zu einem Schritt ohne Unterstützungsschritte, wartet das Hilfsfahrzeug, bis das Hauptfahrzeug wieder weitergeht.

### Zyklische Abläufe

Bei manchen Ernteaufbauten ruft ein Drescher über AutoDrive einen Überladewagen, um das Korn abzuliefern, und drischt danach weiter. Workflow Manager erledigt das automatisch – er wartet, bis AutoDrive und Courseplay beide ganz fertig sind, bevor er zum nächsten Schritt geht. Dafür musst du nichts Besonderes einrichten.

## Fehlerbehandlung

### Schritt startet nicht

Kann ein Schritt nicht starten:
1. erscheint eine Fehlermeldung im HUD
2. pausiert der Workflow
3. behebst du das Problem und setzt fort

Häufige Ursachen:
- Fehlendes Ziel bzw. fehlender Kurs
- Fahrzeug nicht passend
- Ein anderer Auftrag läuft bereits

### Fahrzeug ist nicht mehr verfügbar

Wird das Fahrzeug während der Ausführung verkauft oder zurückgesetzt:
- stoppt der Workflow automatisch
- wird der Status auf Bereit gesetzt
- startest du ihn mit einem anderen Fahrzeug neu

## Mehrspieler

Im Mehrspieler:
- laufen Workflows auf dem Server
- sehen alle Spieler den Status der Workflows
- kann nur der steuernde Spieler die Ausführung ändern

## Fortsetzen nach dem Speichern {/* #resume-after-save */}

Speicherst du das Spiel, während ein Workflow läuft, bleibt der Zustand des Fahrzeugs automatisch erhalten – der aktuelle Schritt, die Rolle (Haupt- oder Hilfsfahrzeug) und der aktuelle Unterstützungsschritt. Ein Klick auf **Starten** im Hauptdialog beginnt den Workflow immer neu bei Schritt 1.

Nach dem Laden wird der Workflow **pausiert** wiederhergestellt, und in den ersten **10 Sekunden** beobachtet Workflow Manager das Fahrzeug:

| Situation | Was nach dem Laden passiert |
|-----------|----------------------------|
| AutoDrive oder Courseplay fährt innerhalb der 10 Sekunden von selbst wieder los | Der Workflow läuft automatisch weiter |
| Das Fahrzeug erledigte beim Speichern **Courseplay-Feldarbeit** | Nach den 10 Sekunden startet Workflow Manager Courseplay **an dem Wegpunkt neu, an dem gespeichert wurde** |
| Alles andere | Der Workflow bleibt pausiert – drücke die **Fortsetzen-Taste im HUD** (`>`), um weiterzumachen |

Fahrzeuge, die auf einen Anführer oder auf ihr Hauptfahrzeug gewartet haben, werden stattdessen in diesem Wartezustand wiederhergestellt und machen weiter, sobald die Bedingung erfüllt ist.

### Courseplay nach dem Laden fortsetzen

Courseplay startet nach dem Laden eines Spielstands nie von selbst neu, und ein einfacher Neustart würde das Feld wieder bei Wegpunkt 1 beginnen. Workflow Manager zeichnet deshalb beim Speichern den Wegpunkt auf und startet von dort neu. Den automatischen Neustart kannst du in den Einstellungen unten abschalten.

## Einstellungen {/* #settings */}

Der Abschnitt **Workflow Manager** unter **ESC → Einstellungen → Allgemein**:

| Einstellung | Standard | Wirkung |
|---------|---------|--------|
| **Courseplay nach dem Laden fortsetzen** | An | Aus = der Workflow bleibt nach dem Laden pausiert; **Fortsetzen** startet die Feldarbeit trotzdem am gespeicherten Wegpunkt neu |
| **Tasten im Hilfefenster anzeigen** | An | Aus = die Workflow-Manager-Tasten stehen nicht im F1-Hilfefenster. Die Tasten funktionieren weiter |
| **Debug-Protokoll** | Aus | Schreibt ausführliche Meldungen in die `log.txt` – schalte es ein, bevor du ein Problem für einen Fehlerbericht nachstellst |

Die Einstellungen werden auf deinem Computer gespeichert (`modSettings/FS25_WorkflowManager.xml`) und gelten für jeden Spielstand. Im Mehrspieler entscheidet der Host über **Courseplay nach dem Laden fortsetzen**, für andere Spieler ist die Einstellung daher nur lesbar; die anderen beiden wählt jeder Spieler selbst.

## Fehlermeldungen

Kann ein Schritt wegen seiner Einrichtung nicht laufen – ein AutoDrive-Ziel oder Courseplay-Kurs, den es nicht gibt, keine Parkposition, keine Werkstatt in Reichweite, ein Saatgut, das die angehängte Sämaschine nicht säen kann –, stoppt der Workflow, und jeder Spieler des Betriebs, dem das Fahrzeug gehört, bekommt eine Meldung mit Fahrzeug und Problem. Warnungen, die den Workflow nicht stoppen (ein unbekanntes Abladeziel, mehrere Kurse mit demselben Namen), werden genauso gemeldet. Ist gerade ein Fenster des Workflow Managers offen, erscheinen Meldungen in seiner Statuszeile unten statt in den Benachrichtigungen des Spiels.

:::note
Konnte beim Speichern kein Wegpunkt aufgezeichnet werden, bleibt der Workflow pausiert – weder der automatische Neustart noch **Fortsetzen** fahren das ganze Feld noch einmal von vorn ab. Geh mit den HUD-Tasten **Weiter** / **Zurück** weiter.
:::

## Leistung

Workflows werden über die Update-Schleife des Spiels überwacht:
- Kaum Auswirkung auf die Leistung
- Statusprüfung alle 500 ms, solange einer läuft
- Keine Abfragen im Leerlauf

## Empfehlungen

1. **Vor dem Ausführen testen**: Prüfe, ob AD-Routen und CP-Kurse für sich funktionieren
2. **Mit einfachen Workflows anfangen**: Beginne mit 2–3 Schritten
3. **Erste Läufe beobachten**: Sieh beim ersten Durchlauf zu, um Probleme zu erkennen
4. **Für Eingriffe pausieren**: Pausiere, wenn du eingreifen musst
5. **Position des Fahrzeugs prüfen**: Stelle sicher, dass das Fahrzeug vor dem Start passend steht
6. **Hauptfahrzeug zuerst starten**: Starte bei Aufbauten mit mehreren Fahrzeugen das Hauptfahrzeug vor dem Hilfsfahrzeug, damit das Hilfsfahrzeug beim richtigen Schritt einsteigt
