---
id: creating-workflows
title: Workflows erstellen
sidebar_position: 1
---

# Workflows erstellen

Workflows sind das Kernkonzept von Workflow Manager. Jeder Workflow ist eine Folge von Schritten, die Arbeiten auf dem Hof automatisieren.

## Aufbau eines Workflows

Ein Workflow besteht aus:

- **Name**: Eine aussagekräftige Bezeichnung (z. B. „Weizen dreschen Felder 1–3“)
- **Schritte**: Geordnete Liste von AutoDrive-Routen und Courseplay-Kursen
- **Unterstützungsschritte** (optional): In Hauptschritte eingebettete Hilfsaktionen für Aufbauten mit mehreren Fahrzeugen

## Einen neuen Workflow anlegen

### Im Workflow Manager

1. Drücke **Alt links + W**, um den Workflow Manager zu öffnen
2. Klicke auf **Neu**
3. Gib einen Namen für den Workflow ein
4. Der Workflow-Editor öffnet sich

![Workflow-Editor](/img/screenshots/editor-dialog.png)

### Tipps zur Benennung

Verwende aussagekräftige Namen, an denen du den Workflow wiedererkennst:
- Mit Fruchtart: „Weizen dreschen – Nordfelder“
- Mit Feldnummern: „Düngen Felder 1, 2, 3“
- Mit Arbeitsgang: „Pressen – Grünland“
- Bei Workflows mit mehreren Fahrzeugen vermerken, dass ein Hilfsfahrzeug nötig ist: „Weizenernte (2 Fahrzeuge)“

## Schritte hinzufügen

Schritte werden im Workflow-Editor hinzugefügt.

### Schritttypen

| Typ | Verwendung |
|------|---------|
| **AutoDrive** | Fahrten zwischen Orten, Abladen, Beladen |
| **Courseplay** | Feldarbeit (Dreschen, Säen, Grubbern, Pressen) |
| **Parken / Auftanken / Reparieren** | AutoDrive-Hilfsstopps ohne einzustellendes Ziel – AD bestimmt das Ziel selbst. Siehe [Schritttypen](step-types#autodrive-utility-steps) |
| **Auf Anführer warten / Folger freigeben** | Sync-Kontrollpunkte, um zwei Fahrzeuge über das [Warteschlangen-System](queue-system) abzustimmen |

### Einen AutoDrive-Schritt hinzufügen

1. Klicke auf **Schritt hinzufügen**
2. Wähle **AutoDrive** als Typ
3. Wähle ein **Ziel** aus der Liste
4. Wähle eine **Aktion**:
   - **Fahren zu** – einfache Fahrt zum Ziel
   - **Drescher abfahren** – Abfahr-Modus (für Mähdrescher)
   - **Abholen und Liefern** – am Ziel beladen, an einen zweiten Ort liefern
   - **Abladen** – aktuelle Ladung am Ziel abliefern
   - **Abholen** – am Ziel beladen, zu einem zweiten Ort zurückkehren
5. Bei Modi mit zwei Zielen wähle das **Abladeziel**
6. Setze optional einen **Fülltyp**, um die Ladung zu filtern
7. Klicke auf **OK**

### Einen Courseplay-Schritt hinzufügen

1. Klicke auf **Schritt hinzufügen**
2. Wähle **Courseplay** als Typ
3. Wähle einen **Kurs** aus der Liste
4. Wähle eine **Aktion**:
   - **Feldarbeit** – normale Feldarbeiten
   - **Ballen sammeln** – Ballen sammeln und wickeln
5. Klicke auf **OK**

## Unterstützungsschritte hinzufügen

Mit Unterstützungsschritten arbeitet ein zweites Fahrzeug (z. B. ein Überladewagen) automatisch neben dem Hauptfahrzeug. Jeder Hauptschritt kann eigene Unterstützungsschritte haben.

### Wann Unterstützungsschritte sinnvoll sind

- Füge sie **Feldarbeit-Schritten** hinzu, bei denen das Hilfsfahrzeug etwas tun muss (z. B. den Drescher abfahren und zum Silo liefern)
- Lass **Fahren-zu-Schritte** ohne Unterstützungsschritte – das Hilfsfahrzeug wartet während der Fahrt

### So fügst du einen Unterstützungsschritt hinzu

1. Wähle im Editor einen **Hauptschritt** (nummeriert `1`, `2`, `3`, …)
2. Klicke unten im Editor auf **Unterstützungsschritt hinzufügen**
3. Richte den Unterstützungsschritt im Schritt-Dialog ein (dieselben Felder wie bei einem normalen Schritt)
4. Klicke auf **OK**

Der Unterstützungsschritt erscheint eingerückt unter dem Hauptschritt, nummeriert `N.M` (z. B. `2.1`, `2.2`).

Wiederhole das, um mehrere Unterstützungsschritte hinzuzufügen. Sie laufen der Reihe nach ab, während das Hauptfahrzeug bei diesem Schritt bleibt.

```
  #     Typ         Ziel                Aktion
  ──────────────────────────────────────────────────
  1     AutoDrive   Feld1_Einfahrt      Fahren zu
  2     Courseplay  Feld1_Ernte         Feldarbeit   +2
  2.1     AutoDrive   Feld1             Drescher abfahren
  2.2     AutoDrive   Silo              Abladen
  3     AutoDrive   Feld2_Einfahrt      Fahren zu
  4     Courseplay  Feld2_Ernte         Feldarbeit   +2
  4.1     AutoDrive   Feld2             Drescher abfahren
  4.2     AutoDrive   Silo              Abladen
```

Wie sich das Hilfsfahrzeug zur Laufzeit verhält, steht ausführlich unter [Workflows mit mehreren Fahrzeugen](linked-workflows).

## Schritte bearbeiten

### Schritte umsortieren

- Wähle einen Schritt und nutze die Tasten **Nach oben** / **Nach unten**
- Oder die Tastenkürzel: **U** nach oben, **D** nach unten
- Unterstützungsschritte werden nur innerhalb ihres Hauptschritts umsortiert

### Einen Schritt ändern

1. Doppelklicke auf den Schritt oder wähle ihn aus und klicke auf **Bearbeiten**
2. Ändere die Eigenschaften des Schritts
3. Klicke auf **OK**, um zu speichern

### Schritte löschen

1. Wähle den Schritt aus
2. Klicke auf **Löschen** oder drücke **R**

Beim Löschen eines Hauptschritts werden auch alle seine Unterstützungsschritte entfernt.

## Beispiel-Workflow

Ein vollständiger Workflow zum Dreschen mehrerer Felder:

```
Workflow: "Weizenernte – Felder 1 & 2"

Schritt 1: AutoDrive → Feld1_Einfahrt          Fahren zu
Schritt 2: Courseplay → Feld1_Weizen_Ernte     Feldarbeit
Schritt 3: AutoDrive → Hof/Silo → Verkauf/Mühle Abholen und Liefern · Filter: Weizen
Schritt 4: AutoDrive → Feld2_Einfahrt          Fahren zu
Schritt 5: Courseplay → Feld2_Weizen_Ernte     Feldarbeit
Schritt 6: AutoDrive → Hof/Silo                Fahren zu
```

### Beispiel mit zwei Fahrzeugen (Drescher + Überladewagen)

Derselbe Ernte-Workflow, erweitert um Unterstützungsschritte für einen Überladewagen:

```
Workflow: "Weizenernte – Felder 1 & 2 (2 Fahrzeuge)"

Schritt 1: AutoDrive → Feld1_Einfahrt          Fahren zu
  (keine Unterstützungsschritte – Überladewagen wartet während der Fahrt)

Schritt 2: Courseplay → Feld1_Weizen_Ernte     Feldarbeit
  2.1: AutoDrive → Feld1                       Drescher abfahren → Silo
  2.2: AutoDrive → Silo                        Abladen

Schritt 3: AutoDrive → Feld2_Einfahrt          Fahren zu
  (keine Unterstützungsschritte)

Schritt 4: Courseplay → Feld2_Weizen_Ernte     Feldarbeit
  4.1: AutoDrive → Feld2                       Drescher abfahren → Silo
  4.2: AutoDrive → Silo                        Abladen
```

## AutoDrive-Einstellungen pro Workflow

Jeder Workflow kann AutoDrive-Überschreibungen speichern, die bei jedem Start automatisch gelten. Das ist praktisch, wenn verschiedene Workflows unterschiedliche Abladeschwellen oder Rohrpositionen brauchen, ohne dass du AutoDrive jedes Mal von Hand umstellen musst.

Die Einstellungen erreichst du im **Hauptdialog**:
1. Wähle einen Workflow
2. Klicke auf **AD/CP Einstellungen**
3. Trage die Werte ein, die du überschreiben willst, und klicke auf **OK**

| Feld | Beschreibung |
|-------|-------------|
| **Abladen ab Level** (%) | Mindestfüllstand in %, ab dem der Überladewagen gerufen wird |
| **Offset Rohr** (m) | Überschreibt die seitliche Rohrposition |
| **Vorab-Ruf Level** (%) | Füllstand in %, bei dem AutoDrive den Überladewagen vorab ruft |

Lass ein Feld leer, um AutoDrives vorhandenen Wert für diese Einstellung zu behalten. Die Einstellungen werden jedes Mal angewendet, wenn der Workflow einen AutoDrive-Schritt startet.

## Workflows speichern

Workflows werden automatisch gespeichert, wenn du:
- den Editor-Dialog schließt
- den Workflow Manager verlässt
- das Spiel speicherst

Workflows liegen in deinem Spielstand-Ordner in `workflowManager.xml`.

## Workflows kopieren

Derzeit lassen sich Workflows nicht direkt kopieren. So legst du einen ähnlichen Workflow an:
1. Lege einen neuen Workflow an
2. Füge dieselben Schritte von Hand hinzu

:::tip Geplante Funktion
Kopieren von Workflows bzw. Vorlagen sind für ein späteres Update geplant.
:::

## Empfehlungen

1. **Einzelteile zuerst testen**: Stelle sicher, dass deine AutoDrive-Routen und Courseplay-Kurse für sich funktionieren
2. **Einfach anfangen**: Beginne mit Workflows aus 2–3 Schritten, bevor du komplexe Abläufe baust
3. **Aussagekräftige Namen**: Erleichtern die Verwaltung mehrerer Workflows
4. **Nach Arbeitsgang gruppieren**: Lege getrennte Workflows für verschiedene Fruchtarten oder Arbeitsgänge an
5. **Anforderungen an das Fahrzeug beachten**: Stelle sicher, dass dein Fahrzeug alle Schritte des Workflows unterstützt
6. **Fahrschritte ohne Unterstützungsschritte lassen**: Hilfsfahrzeuge warten während der Fahrt – keine Einrichtung nötig
