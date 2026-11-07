---
id: step-types
title: Schritttypen
sidebar_position: 2
---

# Schritttypen

Workflow Manager kennt sieben Schritttypen, auszuwählen in der Liste **Typ** im
[Schritt-Dialog](../ui/step-dialog):

| Typ | Kategorie | Braucht ein Ziel? |
|------|----------|-----------------|
| **AutoDrive** | Fahrt | Ja |
| **Courseplay** | Feldarbeit | Ja |
| **Auf Anführer warten** | Marker für das [Warteschlangen-System](queue-system) | Nein |
| **Folger freigeben** | Marker für das [Warteschlangen-System](queue-system) | Nein |
| **Parken** | AutoDrive-Hilfsschritt | Nein |
| **Auftanken** | AutoDrive-Hilfsschritt | Nein |
| **Reparieren** | AutoDrive-Hilfsschritt | Nein |

Die fünf Typen ohne Ziel haben im Schritt-Dialog keine Felder für Ziel, Aktion oder Fülltyp – einfach den Typ wählen und auf **OK** klicken.

**AutoDrive**, **Parken**, **Auftanken** und **Reparieren** brauchen ein installiertes AutoDrive; ohne es sind sie im Schritt-Dialog ausgeblendet. **Courseplay**-Schritte und die Warteschlangen-Marker funktionieren mit Courseplay allein.

## AutoDrive-Schritte {/* #autodrive-steps */}

AutoDrive übernimmt alle Fahrten und Transporte.

### Aktionen

| Aktion | Benötigte Ziele | Beschreibung |
|--------|---------------|-------------|
| **Fahren zu** | 1 | Einfache Fahrt von Punkt zu Punkt |
| **Drescher abfahren** | 2 | Mähdrescher abfahren (folgt dem Drescher, liefert das Korn ab) |
| **Abholen und Liefern** | 2 | Am Ziel beladen, zum Abladeziel liefern |
| **Abladen** | 1 | Aktuelle Ladung am Ziel abliefern |
| **Abholen** | 2 | Am Ziel beladen, zum Abladeziel zurückkehren |

### Zielauswahl

- **Ziel**: Erstes Ziel (wohin zuerst gefahren wird)
- **Abladeziel**: Zweites Ziel (bei Modi mit mehreren Zielen)
- Die Ziele stammen aus den Markern deines AutoDrive-Netzes

### Fülltypauswahl

Bei Ladevorgängen (Abholen und Liefern, Abholen) kannst du einen oder mehrere Fülltypen wählen:
- **Klick** auf einen Eintrag wählt ihn aus (ersetzt die bisherige Auswahl)
- **Strg+Klick** auf einen Eintrag schaltet ihn um (fügt ihn einer Mehrfachauswahl hinzu oder entfernt ihn)
- Ausgewählte Einträge sind grün mit einem **»** davor markiert
- Die Zeile unter der Liste zeigt die gewählten Typen: `Ausgewählt: Weizen, Gerste` (bis zu 2 Namen) oder bei größeren Auswahlen die Anzahl
- Begrenzt, was das Fahrzeug aufnimmt – praktisch, wenn an einem Ort mehrere Fülltypen verfügbar sind
- Leer lassen, um jeden Fülltyp zu akzeptieren

### Beispiele

![Schritt-Dialog – AutoDrive](/img/screenshots/step-dialog-autodrive.png)

**Einfache Fahrt**
```
Typ:     AutoDrive
Ziel:    Feld1_Einfahrt
Aktion:  Fahren zu
```

**Korn liefern**
```
Typ:          AutoDrive
Ziel:         Hof/Silo
Aktion:       Abholen und Liefern
Abladeziel:   Verkauf/Mühle
Fülltypen:    Weizen, Gerste   (Strg+Klick für Mehrfachauswahl)
```

**Drescher abfahren**
```
Typ:          AutoDrive
Ziel:         Feld1_Ernte
Aktion:       Drescher abfahren
Abladeziel:   Hof/Silo
```

## Courseplay-Schritte

Courseplay übernimmt alle Feldarbeiten.

### Aktionen

| Aktion | Beschreibung |
|--------|-------------|
| **Feldarbeit** | Normale Feldarbeiten (Dreschen, Grubbern, Säen, Spritzen usw.) |
| **Ballen sammeln** | Ballen sammeln, laden und wickeln |

### Kursauswahl {/* #course-selection */}

- Kurse müssen in Courseplay gespeichert sein, bevor sie in der Liste erscheinen
- Kurse liegen in: `modSettings/FS25_Courseplay/Courses/[MapId]/`
- Die Liste zeigt alle verfügbaren Kurse der aktuellen Karte, **auch Kurse in Ordnern** – sie wird
  aus dem Hauptordner von Courseplay aufgebaut, nicht aus dem Ordner, der gerade in Courseplays
  eigener Oberfläche geöffnet ist

Kursnamen werden als **Pfade mit Ordner** gespeichert statt als nackte Namen, z. B.
`Singleplayer/F34/Kalken` statt nur `Kalken`. Das ist wichtig, wenn derselbe Kursname in mehreren
Ordnern vorkommt: Ein Schritt, der `F34/Kalken` verlangt, darf nicht `F09/Kalken` laden.
Dialoge und das HUD lassen das vorangestellte `Singleplayer/` weg und zeigen `F34/Kalken`; der
Schritt speichert weiterhin den vollen Pfad.

:::note Kurse aus älteren Versionen
Workflows, die vor der Einführung der Namen mit Ordner angelegt wurden, haben kürzere Pfade
gespeichert (z. B. `F34/Kalken`). Diese werden weiterhin gefunden – die Suche vergleicht dann das
**Ende** des gespeicherten Pfads mit den verfügbaren Kursen. Alte Workflows musst du nicht neu
anlegen, aber jeder Schritt, den du jetzt hinzufügst, speichert den vollen Pfad.
:::

### Saatgut {/* #seed-type */}

Feldarbeit-Schritte können das Saatgut festlegen, das die Sämaschine nutzen soll. So kann ein
Workflow auf verschiedenen Feldern verschiedene Früchte säen, ohne dass du dazwischen von Hand das
Saatgut wechselst.

- Wähle eine Frucht in der Liste **Saatgut** oder lass sie auf **(keins)**, um das Saatgut zu
  behalten, das die Maschine gerade eingestellt hat
- Das Saatgut wird an jeder angehängten Sämaschine eingestellt, die es säen kann, direkt bevor
  Courseplay die Feldarbeit startet
- Ist keine Sämaschine angehängt, wird die Einstellung einfach ignoriert – du kannst sie an einem
  Schritt setzen und den Workflow trotzdem mit einem anderen Fahrzeug fahren
- Ist eine Sämaschine **angehängt**, aber keine kann die gewählte Frucht säen, schlägt der Schritt
  fehl und der Workflow stoppt – so säst du nie aus Versehen die falsche Frucht
- Hat ein Auftrag das Saatgut auf seine eigene Frucht festgelegt, gewinnt diese Sperre und der
  Workflow macht mit dem Saatgut des Auftrags weiter

### Anforderungen an den Kurs

Stelle vor dem Start eines Workflows sicher:
1. Der Kurs ist auf das Fahrzeug geladen
2. Das Fahrzeug ist für den Kurs richtig ausgerüstet (Geräte angehängt)
3. Der Kurs wurde für das richtige Feld angelegt

### Beispiele

![Schritt-Dialog – Courseplay](/img/screenshots/step-dialog-courseplay.png)

**Weizenernte**
```
Typ:     Courseplay
Ziel:    Feld1_Weizen_Ernte
Aktion:  Feldarbeit
```

**Ballen sammeln**
```
Typ:     Courseplay
Ziel:    Wiese_Pressen_Route
Aktion:  Ballen sammeln
```

## AutoDrive-Hilfsschritte {/* #autodrive-utility-steps */}

Parken, Auftanken und Reparieren sind Schritte, die AutoDrive fährt, ohne einstellbares Ziel – AutoDrive bestimmt das Ziel bei jedem Ausführen des Schritts selbst.

| Typ | Ziel | Verhalten, wenn nichts zu tun ist |
|------|-------------|----------------------------------|
| **Parken** | Die AutoDrive-Parkposition des Fahrzeugs oder (falls angehängt) die Parkposition seines hinteren Geräts | Keine Parkposition eingestellt → Schritt **schlägt fehl** |
| **Auftanken** | Die nächste AutoDrive-Tankstelle für einen Fülltyp, den das Fahrzeug braucht | Kein Tanken nötig oder keine passende Tankstelle erreichbar → Schritt **ist sofort erledigt** (kein Fehler) |
| **Reparieren** | Der nächste per AutoDrive erreichbare Werkstatt-Trigger | Keine Werkstatt erreichbar → Schritt **schlägt fehl** |

:::note
Beim Auftanken gilt „nichts zu tun“ als Erfolg statt als Fehler, weil AutoDrive „schon betankt“ nicht von „keine passende Tankstelle in der Nähe“ unterscheidet – in beiden Fällen bleibt für den Schritt nichts zu tun, also geht der Workflow weiter. Parken und Reparieren schlagen dagegen fehl, weil ein unerreichbares Ziel dort meist bedeutet, dass etwas zu beheben ist (keine Parkposition eingestellt, kein Werkstatt-Marker gesetzt).
:::

Füge sie wie jeden anderen Schritt hinzu – Typ im Schritt-Dialog wählen und auf **OK** klicken. Am nützlichsten sind sie zwischen AutoDrive-/Courseplay-Schritten in einem lange laufenden Workflow, damit ein Fahrzeug automatisch nachtankt oder repariert wird, statt mitten auf der Strecke liegen zu bleiben.

## Sync-Marker für die Warteschlange {/* #queue-sync-markers */}

**Auf Anführer warten** und **Folger freigeben** sind Marker-Schritte, mit denen das [Warteschlangen-System](queue-system) zwei Fahrzeuge synchronisiert, die denselben oder verschiedene Workflows ausführen. Sie starten keinen AD/CP-Auftrag – sie sind reine Kontrollpunkte:

- **Auf Anführer warten**: kommt in den Workflow eines **Folgers**. Der Folger hält hier an, bis der Anführer seinen passenden **Folger freigeben**-Schritt erreicht hat.
- **Folger freigeben**: kommt in den Workflow eines **Anführers**. Erreicht er diesen Schritt, werden alle Folger freigegeben, die am passenden **Auf Anführer warten**-Kontrollpunkt warten.

Die Synchronisierung muss **ausdrücklich eingebaut** werden – ein Workflow ohne Marker-Schritte wartet nie auf einen Anführer, egal ob beim Start einer gewählt wurde. Die vollständigen Zuordnungsregeln und Beispiele stehen unter [Warteschlangen-System](queue-system).

## Übergänge zwischen Schritten

### Von AutoDrive zu Courseplay

Endet ein AutoDrive-Schritt und der nächste Schritt ist Courseplay:
1. Der Courseplay-Kurs wird vorab auf das Fahrzeug geladen
2. AutoDrive übergibt automatisch an Courseplay
3. Courseplay beginnt die Feldarbeit ohne jedes Zutun

### Von Courseplay zu AutoDrive

Endet ein Courseplay-Schritt und der nächste Schritt ist AutoDrive:
1. Workflow Manager erkennt, dass Courseplay gestoppt hat
2. Die nächste AutoDrive-Route startet automatisch

### Interne Übergaben

Während der Courseplay-Feldarbeit kann AutoDrive intern ausgelöst werden (z. B. wenn ein Drescher über AutoDrive einen Überladewagen ruft). Die Mod erledigt das automatisch – sie wartet, bis AutoDrive und Courseplay beide fertig sind, bevor sie zum nächsten Schritt geht.

## Worauf bei der Reihenfolge zu achten ist

### Startposition
- Der erste Schritt sollte berücksichtigen, wo das Fahrzeug gerade steht
- Positioniere das Fahrzeug bei Bedarf mit einem AutoDrive-Schritt **Fahren zu**

### Endposition
- Bedenke, wo das Fahrzeug nach dem letzten Schritt steht
- Eventuell willst du zum Schluss einen AutoDrive-Schritt **Fahren zu** einfügen, der nach Hause fährt

### Voraussetzungen für Kurse
- Stelle sicher, dass vor dem Start die Geräte angehängt sind
- Bei Workflows mit mehreren Geräten an Gerätewechsel zwischen den Schritten denken

## Probleme mit Schritten

### AutoDrive-Schritt startet nicht
- Prüfe, ob AutoDrive installiert und aktiviert ist – ein Workflow mit AutoDrive-Schritten startet ohne es nicht
- Prüfe, ob das Ziel in AutoDrive existiert
- Prüfe, ob das Fahrzeug die AutoDrive-Spezialisierung hat
- Stelle sicher, dass kein anderer AD/CP-Auftrag läuft

### Courseplay-Schritt startet nicht
- Prüfe, ob der Kurs existiert und zur richtigen Karte gehört
- Prüfe, ob die nötigen Geräte angehängt sind
- Stelle sicher, dass das Fahrzeug den Kurstyp unterstützt
- Legt der Schritt ein **Saatgut** fest, prüfe, ob die angehängte Sämaschine diese Frucht
  überhaupt säen kann – sonst stoppt der Workflow mit einem Fehler

### Parken- / Reparieren-Schritt schlägt sofort fehl
- Parken braucht eine in AutoDrive eingestellte Parkposition für das Fahrzeug oder ein angehängtes Gerät
- Reparieren braucht einen per AutoDrive erreichbaren Werkstatt-Marker auf der Karte
- Beide bestimmen ihr Ziel bei jedem Lauf neu – ein Marker, der seit dem Anlegen des Workflows gelöscht wurde, lässt den Schritt fehlschlagen

### Auf-Anführer-warten-Schritt gibt nie frei
- Prüfe, ob beim Start des Folger-Workflows ein Anführer gewählt wurde (siehe Statuszeile im HUD)
- Prüfe, ob der Workflow des Anführers wirklich einen passenden **Folger freigeben**-Schritt hat – ohne ihn wartet der Folger, bis der Anführer seinen ganzen Workflow beendet hat
- Die Zuordnung nach Reihenfolge steht unter [Warteschlangen-System](queue-system)

Weitere Lösungen unter [Fehlerbehebung](../troubleshooting).
