---
id: hud-controls
title: HUD-Steuerung
sidebar_position: 7
---

# HUD-Steuerung

Mit dem HUD im Fahrzeug steuerst du Workflows, ohne Menüs öffnen zu müssen.

## Das HUD im Überblick

Läuft ein Workflow, erscheint ein Overlay auf dem Bildschirm:

![HUD während ein Workflow läuft](/img/screenshots/hud-running.png)

Die Tasten **Pausieren** und **Fortsetzen** teilen sich denselben Platz. Solange der Workflow läuft, zeigt die Taste `||` (Pausieren); ist der Workflow pausiert, wechselt sie zu `▶` (Fortsetzen).

Fährst du mit der Maus über eine Taste, erscheint ein Tooltip: **Vorheriger Schritt**, **Pausieren**, **Fortsetzen**, **Stoppen** oder **Nächster Schritt**.

### Hauptfahrzeug mit Hilfsfahrzeugen {/* #main-vehicle-with-support-vehicles */}

Folgen ein oder mehrere Hilfsfahrzeuge demselben Workflow, erscheint in der Kopfzeile neben dem Workflow-Namen ein farbiges Abzeichen:

![HUD des Hauptfahrzeugs mit Hilfsfahrzeug-Abzeichen](/img/screenshots/hud-support-main.png)

Das Abzeichen `[NS]` zeigt die Anzahl der aktiven Hilfsfahrzeuge. Seine Farbe steht für ihren gemeinsamen Status: **Grün** (läuft), **Orange** (pausiert), **Grau** (untätig/wartet).

### HUD des Hilfsfahrzeugs

Läuft das Fahrzeug als **Hilfsfahrzeug**, zeigt das HUD, welchem Hauptschritt es folgt und welcher Unterstützungsschritt gerade ausgeführt wird:

![HUD des Hilfsfahrzeugs](/img/screenshots/hud-support-vehicle.png)

`Schritt 2.1/2` bedeutet: Das Hauptfahrzeug ist bei Schritt 2, und das Hilfsfahrzeug führt Unterstützungsschritt 1 von 2 Unterstützungsschritten dieses Hauptschritts aus. Hat das Hilfsfahrzeug alle Unterstützungsschritte erledigt, wartet es, bis das Hauptfahrzeug weiterschaltet.

## Position des HUD

Du kannst das HUD frei verschieben, indem du es ziehst:
- **Klicke auf die Kopfzeile und ziehe sie**, um das HUD an eine beliebige Stelle auf dem Bildschirm zu bewegen
- Die Position wird auf den Bildschirmrand begrenzt, sodass das HUD nicht aus dem Bild rutscht
- Während du ziehst, ändert die Kopfzeile ihre Farbe als visuelle Rückmeldung
- Standardposition: Bereich unten links

## Statusanzeige

### Kopfzeile / Workflow-Name
Die Kopfzeile zeigt nur **WorkflowManager** – welches Fahrzeug du steuerst, ist ja schon klar, weil du darin sitzt. Die Zeile darunter zeigt den Workflow-Namen, einschließlich des Hilfsfahrzeug-Abzeichens, wenn Hilfsfahrzeuge aktiv sind.

### Schrittzähler
Zeigt den aktuellen Schritt und die Gesamtzahl der Schritte (z. B. `Schritt 2/5`). Bei Hilfsfahrzeugen zeigt er den Zähler der Unterstützungsschritte (z. B. `Schritt 2.1/2`).

### Schrittziel
Zeigt vor dem Ziel oder Kursnamen ein kurzes Typ-Kürzel, z. B. `[AD] Field1_Harvest`, `[CP] Field1_Wheat_Harvest`, `[PARK]`, `[REFUEL]`, `[REPAIR]`. Marker-Schritte (Auf Anführer warten, Folger freigeben) zeigen `[WM]`.

### Wartet auf Anführer / Wartet auf Hauptfahrzeug
Steht das Fahrzeug bei einem Schritt **Auf Anführer warten** oder ist es ein Hilfsfahrzeug, das seine Unterstützungsschritte erledigt hat, lautet die Statuszeile **Wartet auf Anführer** bzw. **Wartet auf Hauptfahrzeug**, gefolgt vom Namen dieses Fahrzeugs. Der Name ist anklickbar – ein Klick darauf bringt dich direkt in dieses Fahrzeug (genau wie die „Fahrzeug wechseln“-Links von AutoDrive und Courseplay).

## Steuertasten

### Vorheriger Schritt (`<<`)

**Funktion**: Zum vorherigen Schritt springen

**Wann verwenden**:
- Einen Schritt wiederholen, der nicht richtig abgeschlossen wurde
- Zurückgehen, nachdem du versehentlich einen Schritt übersprungen hast

**Verhalten**:
- Stoppt den aktuellen Schritt
- Wechselt zum vorherigen Schritt
- Startet diesen Schritt

**Deaktiviert**: Bei Schritt 1 (kein vorheriger Schritt)

### Pausieren / Fortsetzen (`||` / `▶`)

**Funktion**: Schaltet die Pause des Workflows um. Die Taste zeigt **Pausieren** (`||`), solange der Workflow läuft, und wechselt zu **Fortsetzen** (`▶`), wenn er pausiert ist – es ist immer nur eine von beiden sichtbar.

**Pausieren (`||`)** – sichtbar, solange der Workflow läuft:
- Hält den aktuellen Schritt an
- AutoDrive pausiert die Navigation
- Courseplay pausiert die Feldarbeit
- Hilfsfahrzeuge laufen unabhängig davon weiter

**Fortsetzen (`▶`)** – sichtbar, solange der Workflow pausiert ist:
- Macht dort weiter, wo er angehalten wurde

**Wann verwenden**:
- Du musst etwas von Hand anpassen
- Vorübergehender Halt ohne Zurücksetzen

### Stoppen (□)

**Funktion**: Den Workflow vollständig stoppen

**Verhalten**:
- Stoppt den aktuellen Schritt
- Setzt den Workflow auf Schritt 1 zurück
- Setzt den Status auf Bereit
- Stoppt alle laufenden AD/CP-Aufträge
- Hilfsfahrzeuge laufen unabhängig davon weiter

**Wann verwenden**:
- Den Workflow abbrechen
- Etwas ist schiefgelaufen
- Du willst von vorn beginnen

### Nächster Schritt (`>>`)

**Funktion**: Zum nächsten Schritt springen

**Wann verwenden**:
- Der aktuelle Schritt hängt fest
- Du willst einen Schritt von Hand überspringen
- Den Ablauf des Workflows testen

**Verhalten**:
- Stoppt den aktuellen Schritt
- Wechselt zum nächsten Schritt
- Startet diesen Schritt

**Deaktiviert**: Beim letzten Schritt (kein nächster Schritt)

## Zustände der Tasten

### Visuelle Rückmeldung

| Zustand | Farbe | Beschreibung |
|-------|-------|-------------|
| Normal | Weiß | Standardzustand |
| Hover | Cyan | Die Maus ist über der Taste |
| Aktiv | Grün | Gerade aktiv (z. B. läuft) |
| Deaktiviert | Grau | Aktion nicht verfügbar |

## Bedienung

### Maussteuerung
- Fahre mit der Maus über die Tasten, um den Hover-Effekt zu sehen
- Klicke, um die Taste auszulösen

### Umgang mit dem Mauszeiger

Das HUD schaltet den Mauszeiger ein, solange es die Fläche ist, mit der du gerade arbeitest, und gibt
ihn an das Spiel zurück, wenn es fertig ist. Es schaltet immer nur einen Zeiger aus, den es selbst
eingeschaltet hat – ein Zeiger, den Workflow Manager nicht angefordert hat (etwa von AutoDrive,
Courseplay oder einem Spielmenü), bleibt unangetastet.

Das ist wichtig, sobald Dialoge im Spiel sind: Die Dialoge des Workflow Managers, der Schritt-Dialog,
der Dialog zur Anführerwahl usw. übernehmen alle den Zeiger, solange sie offen sind. Schließt du den
letzten davon, kehrt der Zeiger in den Zustand zurück, den das HUD gerade braucht. Wird ein Workflow
aus einer Kette von Dialogen heraus gestartet, wartet die Zeigerfreigabe, bis diese Kette vollständig
geschlossen ist, statt zwischen den Dialogen an- und auszuflackern.

Bleibt der Zeiger einmal hängen, setzt ihn Aus- und Wiedereinschalten des HUD mit **Alt links + H** zurück.

### HUD umschalten

Drücke **Alt links + H**, um das HUD-Overlay ein- oder auszublenden.

## Wann das HUD erscheint

Das HUD ist sichtbar, wenn:
- ein Workflow läuft oder pausiert ist
- du in dem Fahrzeug sitzt, das den Workflow gestartet hat

Das HUD verschwindet, wenn:
- der Workflow gestoppt oder abgeschlossen ist
- du das Fahrzeug verlässt
- das Spielmenü geöffnet ist

## Aktualisierung des HUD

Das HUD aktualisiert sich in Echtzeit:
- Der Schrittzähler aktualisiert sich bei jedem Schrittwechsel
- Die Zustände der Tasten aktualisieren sich bei jeder Änderung des Workflow-Status
- Die Zielinfo aktualisiert sich für jeden Schritt

## Anpassung

- Blende das HUD mit **Alt links + H** ein oder aus
- Verschiebe das HUD an eine beliebige Stelle auf dem Bildschirm, indem du die Kopfzeile ziehst

## Fehlerbehebung

### HUD erscheint nicht
- Stelle sicher, dass ein Workflow läuft
- Prüfe, ob du im richtigen Fahrzeug sitzt
- Prüfe, ob der Workflow Schritte hat

### Tasten reagieren nicht
- Prüfe, ob die Taste deaktiviert ist (grau)
- Stelle sicher, dass du auf den Tastenbereich klickst
- Das Spiel braucht eventuell den Fokus

### HUD überdeckt andere Oberflächen
- Zieh das HUD an eine andere Position, indem du die Kopfzeile anklickst und festhältst
- Das F1-Hilfefenster kann sich überschneiden – schalte in den [Einstellungen](../workflows/executing-workflows#settings) **Tasten im Hilfefenster anzeigen** aus, um die Tasten des Workflow Managers daraus zu entfernen
