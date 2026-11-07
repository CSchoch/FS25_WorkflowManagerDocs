---
id: linked-workflows
title: Workflows mit mehreren Fahrzeugen (Unterstützungsschritte)
sidebar_position: 4
---

# Workflows mit mehreren Fahrzeugen

Mit Workflow Manager kann ein einziger Workflow mehrere zusammenarbeitende Fahrzeuge koordinieren – zum Beispiel einen Mähdrescher und einen Überladewagen, die über mehrere Felder im Takt arbeiten – mithilfe von **Unterstützungsschritten**, die direkt in Hauptschritte eingebettet sind.

## So funktioniert es

Jeder Hauptschritt eines Workflows kann einen oder mehrere **Unterstützungsschritte** enthalten. Startest du einen Workflow mit Unterstützungsschritten, wählst du eine **Rolle**:

| Rolle | Beschreibung |
|------|-------------|
| **Hauptfahrzeug** | Das führende Fahrzeug. Arbeitet die Hauptschritte der Reihe nach ab. |
| **Hilfsfahrzeug** | Das helfende Fahrzeug. Führt die Unterstützungsschritte des Hauptschritts aus, bei dem das Hauptfahrzeug gerade ist. |

Das Hilfsfahrzeug arbeitet seine Unterstützungsschritte der Reihe nach ab und geht dann in den Status **Wartet auf Hauptfahrzeug**, bis das Hauptfahrzeug zum nächsten Schritt weitergeht. Während dieses Wartens zeigt das HUD den Namen des Hauptfahrzeugs – ein Klick darauf bringt dich direkt ins Hauptfahrzeug. Geht das Hauptfahrzeug weiter, startet das Hilfsfahrzeug sofort die Unterstützungsschritte des neuen Schritts.

### Beispiel – Drescher + Überladewagen

```
Workflow: "Weizenernte – Felder 1 & 2"

Schritt 1: AutoDrive → Feld1_Einfahrt    Fahren zu
  1.1 (Unterstützung): AutoDrive → Silo  Abladen

Schritt 2: Courseplay → Feld1_Ernte      Feldarbeit
  2.1 (Unterstützung): AutoDrive → Feld1 Drescher abfahren → Silo
  2.2 (Unterstützung): AutoDrive → Silo  Abladen

Schritt 3: AutoDrive → Feld2_Einfahrt    Fahren zu
  3.1 (Unterstützung): AutoDrive → Silo  Abladen

Schritt 4: Courseplay → Feld2_Ernte      Feldarbeit
  4.1 (Unterstützung): AutoDrive → Feld2 Drescher abfahren → Silo
  4.2 (Unterstützung): AutoDrive → Silo  Abladen
```

**Hauptfahrzeug** (Drescher): fährt zu Feld 1 → drischt → fährt zu Feld 2 → drischt.

**Hilfsfahrzeug** (Überladewagen): Während das Hauptfahrzeug bei Schritt 2 ist (drischt Feld 1), führt der Überladewagen die Unterstützungsschritte 2.1 und dann 2.2 aus (abfahren → abladen) und **wartet** danach. Geht das Hauptfahrzeug zu Schritt 3 (Fahrt zu Feld 2), führt das Hilfsfahrzeug sofort Unterstützungsschritt 3.1 aus und so weiter.

## Unterstützungsschritte einrichten

### Schritt 1: Workflow anlegen

Lege einen einzigen Workflow mit allen Hauptschritten in der richtigen Reihenfolge an. Einzelheiten unter [Workflows erstellen](creating-workflows).

### Schritt 2: Unterstützungsschritte hinzufügen

1. Öffne den **Workflow Manager** und den Workflow im **Editor**
2. Wähle einen Hauptschritt in der Liste
3. Klicke oben in der Schrittliste auf **+ Unterstützung**
4. Richte den Unterstützungsschritt (Typ, Ziel, Aktion) im Schritt-Dialog ein
5. Klicke auf **OK**

Der neue Unterstützungsschritt erscheint eingerückt unter dem Hauptschritt in der Liste auf einem dunkleren Streifen, nummeriert `→ N.M` (z. B. `→ 2.1`, `→ 2.2`).

Wiederhole das für jeden Hauptschritt, bei dem das Hilfsfahrzeug etwas tun soll. Schritte ohne Unterstützungsschritte (z. B. Fahren-zu-Schritte, bei denen das Hilfsfahrzeug nur wartet) bleiben einfach leer.

### Schritt 3: Mit Rollenwahl starten

Startest du einen Workflow mit Unterstützungsschritten, erscheint der Dialog **Rolle wählen**:

![Dialog zur Rollenwahl](/img/screenshots/mode-dialog.png)

- **In den Drescher steigen** → Workflow Manager öffnen → Workflow wählen → **Starten** klicken → **Hauptfahrzeug** wählen
- **In den Überladewagen steigen** → Workflow Manager öffnen → denselben Workflow wählen → **Starten** klicken → **Hilfsfahrzeug** wählen

:::tip
Workflows ganz ohne Unterstützungsschritte starten sofort, ohne den Rollen-Dialog zu zeigen.
:::

## Unterstützungsschritte bearbeiten

Der Editor zeigt Hauptschritte und ihre Unterstützungsschritte in einer gemeinsamen, verschachtelten Liste:

![Editor mit Unterstützungsschritten](/img/screenshots/editor-support-steps.png)

- Wähle eine beliebige Zeile (Haupt- oder Unterstützungsschritt) und klicke auf **Bearbeiten**, um sie zu ändern
- **Löschen** entfernt die gewählte Zeile (Haupt- oder Unterstützungsschritt)
- **↑ / ↓** sortiert Hauptschritte um, oder Unterstützungsschritte innerhalb ihres Hauptschritts
- Im [Haupt-Dialog](../ui/main-dialog) zeigt die Spalte **Unterstützung** bei Workflows mit Unterstützungsschritten **Ja**

## Verhalten zur Laufzeit

### Ablauf der Unterstützungsschritte {/* #support-step-sequencing */}

Das Hilfsfahrzeug führt die Unterstützungsschritte des aktuellen Hauptschritts einzeln nacheinander aus:
1. Unterstützungsschritt 1 ausführen
2. Unterstützungsschritt 2 ausführen
3. … (weiter durch alle Unterstützungsschritte)
4. Alle Unterstützungsschritte erledigt → Status wird **Wartet auf Hauptfahrzeug**

Geht das Hauptfahrzeug zum nächsten Schritt, startet das Hilfsfahrzeug sofort Unterstützungsschritt 1 des neuen Schritts. Hat der neue Schritt keine Unterstützungsschritte, bleibt das Hilfsfahrzeug in „Wartet auf Hauptfahrzeug“, bis das Hauptfahrzeug wieder weitergeht.

Ein Unterstützungsschritt kann im [Schritt-Dialog](../ui/step-dialog#finish-before-switching) auf **Vor dem Wechsel abschließen** gestellt werden. Dann beendet das Hilfsfahrzeug zuerst diesen Unterstützungsschritt und startet erst danach Unterstützungsschritt 1 des Schritts, bei dem das Hauptfahrzeug in diesem Moment ist. Zwischenzeitlich passierte Hauptschritte werden übersprungen. Manuelles **Weiter** / **Zurück** am Hauptfahrzeug wechselt das Hilfsfahrzeug trotzdem sofort um. Der ausstehende Wechsel wird mit dem Spielstand gespeichert.

### Weitergabe von Pausieren / Fortsetzen / Stoppen

Hilfsfahrzeuge laufen **unabhängig** – Pausieren oder Stoppen des Hauptfahrzeugs wirkt sich nicht auf sie aus.

| Aktion am Hauptfahrzeug | Wirkung auf das Hilfsfahrzeug |
|---------------|------------------|
| Pausieren | Hilfsfahrzeug läuft weiter |
| Fortsetzen | Keine Wirkung (das Hilfsfahrzeug war nie pausiert) |
| Stoppen | Hilfsfahrzeug läuft weiter |

Du kannst das Hilfsfahrzeug jederzeit über sein eigenes HUD pausieren oder stoppen, ohne das Hauptfahrzeug zu beeinflussen.

### Später Start

Startet das Hilfsfahrzeug erst, wenn das Hauptfahrzeug schon läuft, steigt es bei Unterstützungsschritt 1 des aktuellen Hauptschritts ein und macht von dort aus weiter.

### Speichern und Laden

Beim Speichern des Spiels werden die **Rolle** (Haupt- oder Hilfsfahrzeug) und der aktuelle **Unterstützungsschritt** mit dem Fahrzeug gespeichert. Nach dem Laden wird das Fahrzeug pausiert wiederhergestellt und macht dort weiter, wo es aufgehört hat – wann das automatisch passiert und wann du **Fortsetzen** drückst, steht unter [Fortsetzen nach dem Speichern](executing-workflows#resume-after-save).

## Anzeige im HUD

### HUD des Hauptfahrzeugs

Sind ein oder mehrere Hilfsfahrzeuge aktiv, zählt eine Zeile *Unterstützer:* sie nach Status auf (z. B. `Unterstützer: 1 aktiv · 1 wartet`):

![HUD des Hauptfahrzeugs mit Hilfsfahrzeugen](/img/screenshots/hud-support-main.png)

### HUD des Hilfsfahrzeugs

Das HUD des Hilfsfahrzeugs zeigt, welchem Hauptschritt es folgt und welchen Unterstützungsschritt es gerade ausführt:

![HUD des Hilfsfahrzeugs](/img/screenshots/hud-support-vehicle.png)

`Schritt 2 · Unterstützung 1/2` bedeutet: Das Hauptfahrzeug ist bei Schritt 2, das Hilfsfahrzeug bei Unterstützungsschritt 1 von 2. Die unterste Zeile nennt das Hauptfahrzeug – klicke auf den Namen, um in es zu wechseln.

## Mehrere Hilfsfahrzeuge

Du kannst denselben Workflow auf mehreren Fahrzeugen gleichzeitig als Hilfsfahrzeug starten. Jedes Hilfsfahrzeug hat seinen eigenen, unabhängigen Zähler `currentSupportStep` und arbeitet die Unterstützungsschritte unabhängig ab.

## Tipps und Empfehlungen

- **Ein Workflow, zwei Rollen**: Es gibt nur eine Workflow-Datei – beide Fahrzeuge starten denselben Workflow, wählen aber unterschiedliche Rollen
- **Fahrschritte ohne Unterstützungsschritte lassen**, wenn das Hilfsfahrzeug nur zum Silo liefern oder während der Fahrt warten soll
- **Zuerst einen Fahr-Unterstützungsschritt einfügen**, damit der Überladewagen bei Feldarbeit schon nahe am Feld steht, bevor er mit dem Abfahren beginnt
- **Workflow klar benennen**: z. B. „Weizenernte (2 Fahrzeuge)“, damit klar ist, dass ein Hilfsfahrzeug nötig ist
- **Jedes Fahrzeug einzeln testen**: Lass das Hauptfahrzeug zuerst ohne Hilfsfahrzeug laufen, um alle Hauptschritte zu prüfen, und nimm dann das Hilfsfahrzeug dazu
