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

Laufen ein oder mehrere Hilfsfahrzeuge im selben Workflow, zählt eine zusätzliche Zeile am unteren Rand sie nach Zustand auf:

![HUD des Hauptfahrzeugs mit Hilfsfahrzeugen](/img/screenshots/hud-support-main.png)

`Unterstützer: 1 aktiv · 1 wartet` – jeder Zustand hat seine eigene Farbe: **Grün** aktiv, **Orange** pausiert, **Gelb** wartet (auf das Hauptfahrzeug oder auf einen Anführer). Zustände, in denen sich kein Hilfsfahrzeug befindet, werden weggelassen.

### HUD des Hilfsfahrzeugs

Läuft das Fahrzeug als **Hilfsfahrzeug**, zeigt die Schrittzeile, welchem Hauptschritt es folgt und welcher Unterstützungsschritt gerade läuft:

![HUD des Hilfsfahrzeugs](/img/screenshots/hud-support-vehicle.png)

`Schritt 2 · Unterstützung 1/2` bedeutet: Das Hauptfahrzeug ist bei Schritt 2, und das Hilfsfahrzeug führt Unterstützungsschritt 1 von 2 Unterstützungsschritten dieses Hauptschritts aus. Hat es alle erledigt, wartet es, bis das Hauptfahrzeug weiterschaltet. Die untere Zeile lautet **Hauptfahrzeug:** gefolgt von dessen Namen – klicke auf den Namen, um in das Hauptfahrzeug zu wechseln.

## Position des HUD

Du kannst das HUD frei verschieben, indem du es ziehst:
- **Klicke auf die Kopfzeile und ziehe sie**, um das HUD an eine beliebige Stelle auf dem Bildschirm zu bewegen
- Die Position wird auf den Bildschirmrand begrenzt, sodass das HUD nicht aus dem Bild rutscht
- Während du ziehst, ändert die Kopfzeile ihre Farbe als visuelle Rückmeldung
- Standardposition: Bereich unten links

## Statusanzeige

### Kopfzeile
Die Kopfzeile zeigt **Workflow Manager** und rechts ein **X**. Das X schließt das HUD – genau wie **Alt links + H**. Die Zeile darunter zeigt den Workflow-Namen.

### Schrittzeile
Ein farbiger Chip nennt das System, das der Schritt verwendet, gefolgt vom Schrittzähler und dem Ziel:

| Chip | Farbe | Schritte |
|------|-------|----------|
| `AD` | Blau | AutoDrive-Schritte |
| `PARK`, `REFUEL`, `REPAIR` | Blau | Parken, Tanken, Reparieren (von AutoDrive gefahren) |
| `CP` | Grün | Courseplay-Schritte |
| `WM` | Bernstein | Auf Anführer warten, Folger freigeben |

Der Text lautet `Schritt 2/5: Field1_Harvest` bei einem Hauptfahrzeug und `Schritt 2 · Unterstützung 1/2: Silo` bei einem Hilfsfahrzeug. Courseplay-Kurse werden ohne den vorangestellten Ordner `Singleplayer/` angezeigt; Schritte ohne Ziel zeigen stattdessen ihren Typnamen.

### Fortschrittsbalken
Ein dünner Balken unter der Schrittzeile zeigt, wie viel vom Workflow erledigt ist: die abgeschlossenen Schritte plus, solange Courseplay arbeitet, dessen Fortschritt auf dem aktuellen Feld. Er hat die Farbe des Chips des aktuellen Schritts.

### Fahrzeugstatus
Die Zeile unter dem Balken zeigt, was das Fahrzeug gerade tut: **CP aktiv (42%)**, **AD aktiv**, **Pausiert** oder **Leerlauf**.

### Wartet auf Anführer / Wartet auf Hauptfahrzeug
Steht das Fahrzeug bei einem Schritt **Auf Anführer warten** oder ist es ein Hilfsfahrzeug, das seine Unterstützungsschritte erledigt hat, lautet die Statuszeile **Wartet auf Anführer** bzw. **Wartet auf Hauptfahrzeug**, gefolgt vom Namen dieses Fahrzeugs. Der Name ist anklickbar – ein Klick darauf bringt dich direkt in dieses Fahrzeug (genau wie die „Fahrzeug wechseln“-Links von AutoDrive und Courseplay). Fährst du mit der Maus darüber, erscheint *Klicken zum Fahrzeugwechsel*.

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

Drücke **Alt links + H**, um das HUD-Overlay ein- oder auszublenden, oder klicke auf das **X** in der Kopfzeile, um es zu schließen.

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
- Schrittzeile und Fortschrittsbalken aktualisieren sich bei jedem Schrittwechsel
- Die Zustände der Tasten aktualisieren sich bei jeder Änderung des Workflow-Status
- Die Zielinfo aktualisiert sich für jeden Schritt

## Anpassung

- Blende das HUD mit **Alt links + H** ein oder aus, oder schließe es mit dem **X** in der Kopfzeile
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
