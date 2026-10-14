---
id: troubleshooting
title: Fehlerbehebung
sidebar_position: 8
---

# Fehlerbehebung

Häufige Probleme mit Workflow Manager und ihre Lösungen.

## Probleme bei der Installation

### Workflow Manager öffnet sich nicht

**Symptome**: **Alt links + W** bewirkt nichts

**Lösungen**:
1. Prüfe, ob die Mod in der Mod-Auswahl aktiviert ist
2. Prüfe, ob Courseplay (und AutoDrive, falls du es nutzt) ebenfalls aktiviert ist
3. Sieh in der Log-Datei des Spiels (`log.txt`) nach Fehlermeldungen
4. Stelle sicher, dass die ZIP-Datei nicht beschädigt ist

### AutoDrive-Schritttypen fehlen

**Symptome**: Der Schritt-Dialog bietet keinen Typ **AutoDrive**, **Parken**, **Auftanken** oder **Reparieren** an

**Ursache**: AutoDrive ist nicht installiert oder nicht aktiviert. AutoDrive ist optional, deshalb
blendet Workflow Manager die Schritttypen aus, die es brauchen. Schritte, die bereits einen dieser
Typen haben, behalten ihn.

**Lösungen**:
1. Installiere AutoDrive von GitHub oder dem ModHub
2. Aktiviere AutoDrive in der Mod-Auswahl
3. Starte das Spiel nach dem Aktivieren neu

### Fehler „Courseplay nicht gefunden“

**Symptome**: Fehlermeldung beim Öffnen des Workflow Managers

**Lösungen**:
1. Installiere Courseplay von GitHub oder dem ModHub
2. Aktiviere Courseplay in der Mod-Auswahl
3. Starte das Spiel nach dem Aktivieren neu

---

## Probleme beim Anlegen von Workflows

### Keine Ziele in der Auswahlliste

**Symptome**: Die Auswahlliste für AutoDrive-Ziele ist leer

**Lösungen**:
1. Lege zuerst mindestens einen Marker in AutoDrive an
2. Schließe den Workflow Manager und öffne ihn erneut
3. Prüfe, ob AutoDrive richtig eingerichtet ist

### Keine Kurse in der Auswahlliste

**Symptome**: Die Auswahlliste für Courseplay-Kurse ist leer

**Lösungen**:
1. Speichere mindestens einen Kurs in Courseplay
2. Kurse gelten pro Karte – stelle sicher, dass du auf der richtigen Karte bist
3. Prüfe den Kursordner: `modSettings/FS25_Courseplay/Courses/[Kartenname]/`

### Schritte lassen sich nicht hinzufügen

**Symptome**: Die Taste „Schritt hinzufügen“ funktioniert nicht

**Lösungen**:
1. Stelle sicher, dass im Editor ein Workflow geöffnet ist
2. Sieh in der Log-Datei des Spiels nach Fehlern
3. Versuche, einen neuen Workflow anzulegen

---

## Probleme bei der Ausführung

### Workflow startet nicht

**Symptome**: Ein Klick auf „Starten“ bewirkt nichts

**Lösungen**:
1. Steig zuerst in ein passendes Fahrzeug
2. Prüfe, ob das Fahrzeug Courseplay unterstützt – und AutoDrive, wenn der Workflow AutoDrive-,
   Parken-, Auftanken- oder Reparieren-Schritte enthält. Die Warnung *Fahrzeug '…' benötigt
   Courseplay* bzw. *…benötigt AutoDrive + Courseplay* sagt dir, was fehlt
3. Stelle sicher, dass kein anderer AD/CP-Auftrag läuft
4. Prüfe, ob der Workflow mindestens einen Schritt hat

### Überladewagen bewegt sich nicht, wenn der Drescher-abfahren-Schritt beginnt

**Symptome**: Das Hilfsfahrzeug (Überladewagen) steht nach dem Start seines Drescher-abfahren-Schritts still, statt zum Drescher zu fahren

**Ursache**: AutoDrives Modus **Drescher abfahren** reagiert nur – der Überladewagen wartet an Ort und Stelle, bis der Drescher meldet, dass er geleert werden muss. Steht der Überladewagen beim Start des Schritts schon auf oder nahe dem Feld, überspringt AutoDrive jede Anfahrt und schaltet ihn sofort an seiner aktuellen Position in den passiven Wartemodus. Dabei kann er dem Drescher im Weg stehen.

**Lösung**: Füge direkt vor dem Unterstützungsschritt **Drescher abfahren** einen Unterstützungsschritt **Fahren zu** in die Unterstützungsschritte dieses Feldarbeit-Schritts ein. So fährt der Überladewagen zuerst zu einem Marker nahe dem Feld und steht schon bereit, wenn der Drescher ruft.

Tipps zum Aufbau von Unterstützungsschritten unter [Workflows mit mehreren Fahrzeugen](workflows/linked-workflows).

---

### Schritt wird nicht abgeschlossen

**Symptome**: Der Workflow hängt bei einem Schritt

**Lösungen**:
1. Prüfe, ob AD/CP tatsächlich läuft (achte auf ihre Anzeigen)
2. Der Schritt wartet eventuell auf eine Bedingung (z. B. Abladen)
3. Springe mit der Überspringen-Taste im HUD zum nächsten Schritt
4. Prüfe, ob das Ziel bzw. der Kurs existiert

### AutoDrive-Schritt schlägt fehl

**Symptome**: Der AD-Schritt meldet Fehler oder fährt nicht los

**Lösungen**:
1. Prüfe, ob das Ziel in AutoDrive existiert
2. Prüfe, ob es einen gültigen Weg zum Ziel gibt
3. Stelle sicher, dass das Fahrzeug auf oder nahe dem AD-Netz steht
4. Teste die Route zuerst von Hand in AutoDrive

### Courseplay-Schritt schlägt fehl

**Symptome**: Der CP-Schritt meldet Fehler oder startet nicht

**Lösungen**:
1. Prüfe, ob der Kurs auf das Fahrzeug geladen ist
2. Prüfe, ob die nötigen Geräte angehängt sind
3. Stelle sicher, dass der Kurs zur richtigen Karte bzw. zum richtigen Feld gehört
4. Teste den Kurs zuerst von Hand in Courseplay

### Falscher Courseplay-Kurs läuft

**Symptome**: Das Fahrzeug beginnt die Feldarbeit auf dem falschen Feld, mit einem Kurs, der
genauso heißt wie der gewählte

**Ursache**: Kursnamen werden als Pfade mit Ordner gespeichert (`Singleplayer/F34/Kalken`). Hast du
denselben Kursnamen in mehreren Ordnern – zum Beispiel einen pro Feld –, kann ein mit einer älteren
Version gespeicherter Workflow nur den kurzen Namen enthalten, der dann auf mehr als einen Kurs
passt.

**Lösungen**:
1. Öffne den Schritt im Editor und wähle den Kurs erneut aus der Liste – dadurch wird der volle
   Pfad mit Ordner gespeichert
2. Prüfe den aktuellen Namen mit `wmPrintWorkflow` (siehe [Konsolenbefehle](api/console-commands)) –
   die Spalte Target zeigt genau, wonach der Schritt sucht
3. Wie Namen zugeordnet werden, steht unter [Kursauswahl](workflows/step-types#course-selection)

### Fahrzeug fährt im Kreis

**Symptome**: Das Fahrzeug wiederholt ein Verhalten, statt weiterzumachen

**Lösungen**:
1. Der Schritt kann zyklische Abläufe haben (dreschen + abladen)
2. Warte, bis AD und CP ganz fertig sind
3. Prüfe auf hängende KI oder Probleme bei der Wegfindung

### Parken- oder Reparieren-Schritt schlägt sofort fehl

**Symptome**: Der Schritt bricht gleich beim Start mit einem Fehler ab

**Lösungen**:
1. **Parken**: Richte zuerst in AutoDrive eine Parkposition für das Fahrzeug (oder ein angehängtes Gerät) ein
2. **Reparieren**: Setze einen per AutoDrive erreichbaren Werkstatt-Marker auf die Karte
3. Beide bestimmen ihr Ziel bei jedem Lauf neu – ein Marker, der seit dem Anlegen des Workflows gelöscht wurde, lässt den Schritt wieder fehlschlagen

### Auftanken-Schritt tut nichts

**Symptome**: Der Workflow geht direkt über einen Auftanken-Schritt hinweg, ohne dass das Fahrzeug irgendwohin fährt

**Ursache**: Das ist gewollt, kein Fehler – AutoDrive kann „das Fahrzeug braucht keinen Kraftstoff“ nicht von „keine passende Tankstelle erreichbar“ unterscheiden, deshalb gelten beide Fälle als sofortiger Erfolg und der Workflow geht direkt weiter.

### Folger hängt bei „Wartet auf Anführer“

**Symptome**: Ein Folger-Fahrzeug kommt nie über einen **Auf Anführer warten**-Schritt hinaus

**Lösungen**:
1. Prüfe, ob der Workflow des Anführers wirklich einen passenden **Folger freigeben**-Schritt enthält – ohne ihn wartet der Folger, bis der ganze Workflow des Anführers fertig ist
2. Prüfe, ob das Anführerfahrzeug noch läuft (ein gestoppter oder fertiger Anführer sollte den Folger innerhalb von ~1 Sekunde automatisch freigeben)
3. Wie Auf-Anführer-warten- und Folger-freigeben-Schritte zusammengehören, steht unter [Warteschlangen-System](workflows/queue-system)

---

## Probleme mit dem HUD

### HUD erscheint nicht

**Symptome**: Kein Workflow-HUD, während ein Workflow läuft

**Lösungen**:
1. Stelle sicher, dass wirklich ein Workflow läuft
2. Steig in das Fahrzeug, das den Workflow gestartet hat
3. Schließe offene Spielmenüs
4. Prüfe, ob das HUD hinter anderen Oberflächen verborgen ist

### HUD-Tasten reagieren nicht

**Symptome**: Klicks auf Tasten bewirken nichts

**Lösungen**:
1. Prüfe, ob die Taste nicht deaktiviert ist (graue Farbe)
2. Stelle sicher, dass der Mauszeiger über der Taste ist
3. Das Spielfenster muss den Fokus haben
4. Klicke in die Mitte der Taste

### HUD überdeckt andere Oberflächen

**Symptome**: Das HUD verdeckt wichtige Elemente des Spiels

**Lösungen**:
1. **Verschiebe das HUD** an eine bessere Stelle – klicke auf die Kopfzeile des HUD, halte sie gedrückt und ziehe es an eine beliebige Stelle
2. Überschneidung mit dem F1-Hilfefenster – schalte **Tasten im Hilfefenster anzeigen** unter **ESC → Einstellungen → Allgemein → Workflow Manager** aus, um die Workflow-Manager-Tasten daraus zu entfernen, oder schließe das Hilfefenster

---

## Probleme beim Speichern/Laden

### Workflows fehlen nach dem Neuladen

**Symptome**: Gespeicherte Workflows erscheinen nicht

**Lösungen**:
1. Stelle sicher, dass du das Spiel nach dem Anlegen der Workflows gespeichert hast
2. Prüfe, ob `workflowManager.xml` im Spielstand-Ordner existiert
3. Die Datei könnte beschädigt sein – sieh nach einer Sicherung

### Courseplay macht nach dem Laden nicht weiter

**Symptome**: Ein Workflow, der beim Speichern gerade Courseplay-Feldarbeit erledigte, bleibt nach
dem Laden pausiert

**Lösungen**:
1. Warte etwa 10 Sekunden – der Neustart passiert erst, wenn das Prüffenster nach dem Laden endet
2. Prüfe, ob **ESC → Einstellungen → Allgemein → Courseplay nach dem Laden fortsetzen** an ist.
   Ist es aus, drücke **Fortsetzen** im HUD – die Feldarbeit startet trotzdem am gespeicherten
   Wegpunkt neu
3. Bewirkt auch **Fortsetzen** nichts, wurde beim Speichern kein Wegpunkt aufgezeichnet. Der
   Workflow bleibt dann bewusst pausiert, statt das ganze Feld noch einmal abzufahren – geh mit den
   HUD-Tasten **Weiter** / **Zurück** weiter

Siehe [Fortsetzen nach dem Speichern](workflows/executing-workflows#resume-after-save).

### XML-Ladefehler

**Symptome**: Fehlermeldungen zu XML beim Laden

**Lösungen**:
1. Prüfe `workflowManager.xml` auf Syntaxfehler
2. Lösche die Datei, um zurückzusetzen (alle Workflows gehen verloren)
3. Stelle, falls vorhanden, eine Sicherung wieder her

---

## Leistungsprobleme

### Spiel ruckelt während eines Workflows

**Symptome**: Die FPS sinken, wenn ein Workflow läuft

**Lösungen**:
1. Prüfe, ob AD oder CP das Problem verursacht (getrennt testen)
2. Aufwendige Wege oder Kurse können Last erzeugen
3. Bleibt es dabei, melde das Problem mit Log-Datei

---

## Einen hängenden Workflow untersuchen

Wenn ein Fahrzeug nicht tut, was du erwartest, findest du den Grund am schnellsten, indem du es
direkt fragst. Öffne die Konsole mit **~** und führe aus:

| Befehl | Wann |
|---------|-------------|
| `wmPrintState` | Ein Fahrzeug hängt und du willst seinen vollständigen Ausführungszustand |
| `wmPrintStateAll` | Eine Kolonne ist durcheinander und du willst alle Fahrzeuge auf einmal sehen |
| `wmPrintWorkflow` | Ein Folger wird nie freigegeben – zeigt die Zuordnung von Warten/Freigeben nebeneinander |

Alle drei lesen nur und sind in einem laufenden Spielstand ungefährlich. Wie du die Ausgabe liest,
steht unter [Konsolenbefehle](api/console-commands).

---

## Fehler melden

Stößt du auf Probleme, die hier nicht behandelt werden:

1. **Debug-Protokoll einschalten**: **ESC → Einstellungen → Allgemein → Workflow Manager → Debug-Protokoll**, dann das Problem nachstellen – das Log enthält dann die ausführlichen Meldungen, die zur Analyse nötig sind
2. **Log-Datei des Spiels sammeln**: Die `log.txt` liegt im Hauptordner des Landwirtschafts-Simulators 25 (derselbe Ordner wie die ausführbare Datei des Spiels)
3. **Zustand festhalten**: Führe `wmPrintStateAll` in der Konsole aus, während das Problem auftritt, und kopiere die Ausgabe
4. **Schritte zum Nachstellen notieren**: Schreibe genau auf, wie sich das Problem auslösen lässt
5. **Auf GitHub melden**: [Issues-Seite](https://github.com/CSchoch/FS25_WorkflowManager/issues)

Gib Folgendes an:
- Version der Mod
- Versionen von AutoDrive/Courseplay
- Version des Spiels
- Schritte zum Nachstellen
- Passende Auszüge aus dem Log
- Ausgabe von `wmPrintStateAll`, falls ein Workflow lief
