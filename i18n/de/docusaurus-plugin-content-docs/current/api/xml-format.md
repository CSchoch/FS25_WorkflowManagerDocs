---
id: xml-format
title: XML-Format
sidebar_position: 3
---

# XML-Format

:::info Für Fortgeschrittene
Diese Seite richtet sich an fortgeschrittene Nutzer, die ihre Workflows von Hand sichern, wiederherstellen oder bearbeiten wollen. Die meisten brauchen sie nicht – der Editor im Spiel erledigt alles automatisch.
:::

Der Workflow Manager speichert deine Workflows in einer XML-Datei im jeweiligen Spielstand. Normalerweise musst du diese Datei nicht anfassen, sie ist aber praktisch zum manuellen Bearbeiten, zur Sicherung oder um Workflows zwischen Spielständen zu teilen.

## Speicherort der Datei

```
Documents/My Games/FarmingSimulator2025/savegame[X]/workflowManager.xml
```

Die Datei wird automatisch angelegt, sobald du deinen ersten Workflow speicherst.

## XML-Struktur

### Wurzelelement

```xml
<?xml version="1.0" encoding="utf-8"?>
<WorkflowManager>
    <workflows>
        <!-- Hier stehen die Workflow-Elemente -->
    </workflows>
</WorkflowManager>
```

### Einstellungen (eigene Datei) {/* #settings-separate-file */}

Die Optionen der Mod und die HUD-Position sind **nicht** Teil von `workflowManager.xml`. Sie werden
pro Spieler / Computer für alle Spielstände gespeichert in:

```
Documents/My Games/FarmingSimulator2025/modSettings/FS25_WorkflowManager.xml
```

```xml
<WorkflowManagerSettings>
    <general courseplayAutoResume="true" showHelpKeys="true" debugMode="false"/>
    <hud posX="..." posY="..."/>
</WorkflowManagerSettings>
```

| Element | Attribut | Typ | Beschreibung |
|---------|-----------|------|-------------|
| `general` | `courseplayAutoResume` | bool | **Courseplay nach dem Laden fortsetzen** (Standard `true`) – siehe [Fortsetzen nach dem Speichern](../workflows/executing-workflows#resume-after-save) |
| `general` | `showHelpKeys` | bool | **Tasten im Hilfefenster anzeigen** (Standard `true`) |
| `general` | `debugMode` | bool | **Debug-Protokoll** (Standard `false`) |
| `hud` | `posX`, `posY` | float | Position des HUD auf dem Bildschirm, so wie zuletzt verschoben |

Ändern kannst du sie im Spiel unter **ESC → Einstellungen → Allgemein → Workflow Manager**. Ein `<settings>`-Block in
einer älteren `workflowManager.xml` wird einmalig übernommen, wenn die neue Version diesen
Spielstand zum ersten Mal lädt, und danach ignoriert.

### Die Datei bei laufendem Spiel bearbeiten {/* #editing-the-file-while-the-game-runs */}

Das Spiel liest `workflowManager.xml` jedes Mal neu ein, wenn sich das Fenster des Workflow Managers öffnet, und vor
jeder Änderung, die es selbst schreibt (Speichern im Editor, Löschen, AD/CP-Einstellungen, Speichern des Spiels). Du kannst die Datei
also – zum Beispiel mit dem [Web-Editor](../web-editor) – ersetzen, während das Spiel läuft:

- In der Datei geänderte Workflows werden beim nächsten Öffnen des Fensters übernommen; ein laufender
  Workflow macht mit den neuen Schritten weiter (die Schrittnummern bleiben, wie sie sind)
- Aus der Datei entfernte Workflows werden auf jedem Fahrzeug gestoppt, auf dem sie laufen
- **Speichern** im Editor im Spiel überschreibt genau diesen einen Workflow als Ganzes; Änderungen an anderen
  Workflows in der Datei bleiben erhalten
- Beendest du das Spiel ohne zu speichern, wird die Datei nicht geschrieben

### Workflow-Element

```xml
<workflow
    id="workflow_001"
    name="Harvest wheat – fields 1–2">
    <!-- Hier stehen die Schritt-Elemente -->
</workflow>
```

#### Workflow-Attribute

| Attribut | Typ | Beschreibung |
|-----------|------|-------------|
| `id` | string | Eindeutige Kennung (automatisch erzeugt, nicht ändern) |
| `name` | string | Anzeigename im Workflow Manager |

### AD-Einstellungen-Element (optional)

Ein Workflow kann optional ein `<adSettings>`-Element mit Überschreibungen für AutoDrive enthalten. Alle Attribute sind optional – lass die weg, bei denen AutoDrives eigener Wert bleiben soll.

```xml
<workflow id="wf_001" name="Combine Harvest">
    <adSettings unloadFillLevel="0.9" pipeOffset="0.5" preCallLevel="0.8"/>
    <!-- Schritte … -->
</workflow>
```

#### adSettings-Attribute

| Attribut | Typ | Bereich | Beschreibung |
|-----------|------|-------|-------------|
| `unloadFillLevel` | float | 0,0 – 1,0 | Füllanteil, ab dem der Überladewagen gerufen wird (0.9 = 90 %). |
| `pipeOffset` | float | –5,0 – 5,0 | Seitlicher Versatz der Rohrposition in Metern. |
| `preCallLevel` | float | 0,0 – 1,0 | Füllanteil, ab dem AutoDrive den Überladewagen vorab ruft (0.8 = 80 %). |

:::note
Alle drei Werte werden als Anteile (0,0–1,0) gespeichert. Der Dialog im Spiel zeigt sie als Prozent (0–100) an, nimmt sie auch so entgegen und rechnet automatisch um.
:::

Fehlen Überschreibungen ganz, wird das `<adSettings>`-Element komplett weggelassen.

### Schritt-Element

Hauptschritte sind direkte Kindelemente von `<workflow>`. Schritte mit Unterstützungsschritten enthalten verschachtelte `<support>`-Kindelemente.

```xml
<step type="autodrive" target="Route_Field1" action="drive"/>

<step type="courseplay" target="Field1_Harvest" action="fieldwork">
    <support type="autodrive" target="Field1" action="unload" unloadTarget="Silo"/>
    <support type="autodrive" target="Silo" action="deliver"/>
</step>
```

#### Schritt-Attribute

| Attribut | Typ | Pflicht | Beschreibung |
|-----------|------|----------|-------------|
| `type` | string | Ja | `autodrive` oder `courseplay` |
| `target` | string | Ja | Name des Ziels (AutoDrive) oder Name des Kurses (Courseplay) |
| `action` | string | Ja | Auszuführende Aktion |
| `unloadTarget` | string | Nein | Zweites Ziel (nur AutoDrive) |
| `fillType` | string | Nein | Ladungsfilter (nur AutoDrive) |
| `seedFruitType` | string | Nein | Saatgut, das an der Sämaschine eingestellt wird, z. B. `WHEAT` (nur Courseplay-Feldarbeit) |

#### Attribute von Unterstützungsschritten

`<support>`-Elemente verwenden dieselben Attribute wie `<step>` (ohne eigene Verschachtelung), dazu:

| Attribut | Typ | Pflicht | Beschreibung |
|-----------|------|----------|-------------|
| `finishBeforeSwitch` | bool | Nein | `true` = wechselt das Hauptfahrzeug zu seinem nächsten Schritt, während dieser Unterstützungsschritt läuft, schließt das Hilfsfahrzeug ihn zuerst ab. Wird nur bei `true` geschrieben |

Schritte ohne Unterstützung haben einfach keine `<support>`-Kindelemente. Das schließende Tag kannst du dann ganz weglassen (selbstschließendes `/>` ist in Ordnung).

## Vollständiges Beispiel

### Workflow mit einem Fahrzeug

```xml
<?xml version="1.0" encoding="utf-8"?>
<WorkflowManager>
    <workflows>
        <workflow id="workflow_001" name="Harvest wheat – fields 1–2">
            <step type="autodrive" target="Route_Field1" action="drive"/>
            <step type="courseplay" target="Field1_Harvest" action="fieldwork"/>
            <step type="autodrive" target="Farm/Silo" action="pickup_deliver" unloadTarget="Sell/BGA" fillType="WHEAT"/>
            <step type="autodrive" target="Route_Field2" action="drive"/>
            <step type="courseplay" target="Field2_Harvest" action="fieldwork"/>
            <step type="autodrive" target="Farm" action="drive"/>
        </workflow>
        <workflow id="workflow_002" name="Fertilize Fields">
            <step type="autodrive" target="Field3_Entrance" action="drive"/>
            <step type="courseplay" target="Field3_Fertilize" action="fieldwork"/>
        </workflow>
    </workflows>
</WorkflowManager>
```

### Workflow mit zwei Fahrzeugen (Drescher + Überladewagen)

Unterstützungsschritte stehen verschachtelt in den Hauptschritten, zu denen sie gehören. „Fahren zu“-Schritte haben keine `<support>`-Kindelemente – das Hilfsfahrzeug wartet während der Fahrt.

```xml
<?xml version="1.0" encoding="utf-8"?>
<WorkflowManager>
    <workflows>
        <workflow id="wf_001" name="Combine Harvest">
            <adSettings unloadFillLevel="0.9" pipeOffset="0.5" preCallLevel="0.8"/>
            <step type="autodrive" target="Route_Field1" action="drive"/>
            <step type="courseplay" target="Field1_Harvest" action="fieldwork">
                <support type="autodrive" target="Field1" action="unload" unloadTarget="Silo"/>
                <support type="autodrive" target="Silo" action="deliver"/>
            </step>
            <step type="autodrive" target="Route_Field2" action="drive"/>
            <step type="courseplay" target="Field2_Harvest" action="fieldwork">
                <support type="autodrive" target="Field2" action="unload" unloadTarget="Silo"/>
                <support type="autodrive" target="Silo" action="deliver"/>
            </step>
        </workflow>
    </workflows>
</WorkflowManager>
```

Beide Fahrzeuge starten **denselben** Workflow und wählen beim Start im Spiel ihre Rolle (Hauptfahrzeug oder Hilfsfahrzeug). Es gibt nur ein einziges Workflow-Element – keine zwei getrennten, verknüpften Dateien.

## Beispiele für AutoDrive-Schritte

### Einfache Navigation

```xml
<step type="autodrive" target="Field1_Entrance" action="drive"/>
```

### Abholen und Liefern

```xml
<step
    type="autodrive"
    target="Farm/Silo"
    action="pickup_deliver"
    unloadTarget="Sell/Mill"
    fillType="WHEAT"/>
```

### Modus „Drescher abfahren“ (Unterstützung für den Drescher)

```xml
<support
    type="autodrive"
    target="Field1_Harvest"
    action="unload"
    unloadTarget="Farm/Silo"/>
```

### Modus „Abholen“

```xml
<step
    type="autodrive"
    target="Shop/Seeds"
    action="load"
    unloadTarget="Field1_Entrance"
    fillType="SEEDS"/>
```

## Beispiele für Courseplay-Schritte

### Feldarbeit

```xml
<step type="courseplay" target="Field1_Wheat_Harvest" action="fieldwork"/>
```

### Ballen sammeln

```xml
<step type="courseplay" target="Meadow_Baling" action="bale_collect"/>
```

## Aktionsübersicht

**AutoDrive-Aktionen:**
- `drive` – Einfache Navigation von Punkt zu Punkt
- `unload` – Drescher abfahren (folgt dem Drescher, liefert das Korn ab)
- `pickup_deliver` – Am Ziel beladen, zum Abladeziel liefern
- `deliver` – Aktuelle Ladung zum Ziel liefern
- `load` – Am Ziel beladen, zum Abladeziel zurückkehren

**Courseplay-Aktionen:**
- `fieldwork` – Feldarbeiten (Ernten, Grubbern, Säen, Spritzen usw.)
- `bale_collect` – Ballen sammeln und wickeln

## Fülltypen

Gängige LS25-Fülltypen für das Attribut `fillType`:
- `WHEAT`
- `BARLEY`
- `CANOLA`
- `CORN`
- `SUNFLOWER`
- `SOYBEAN`
- (und weitere – der Name ist die interne Fülltyp-ID, die im Schritt-Dialog angezeigt wird)

## Migration des alten Formats

Hast du einen Spielstand aus einer älteren Version des Workflow Managers, die die Attribute `linkRole`, `linkedWorkflowId` und `syncGroup` verwendet hat, werden diese Dateien beim Laden des Spiels automatisch umgewandelt. Das alte Paar verknüpfter Workflows wird zu einem einzigen Workflow mit verschachtelten `<support>`-Elementen. Du musst nichts von Hand tun.

## Sicherung und Wiederherstellung

### Manuelle Sicherung

Kopiere `workflowManager.xml` an einen sicheren Ort, bevor du Änderungen vornimmst.

### Workflows wiederherstellen

1. Beende das Spiel
2. Kopiere die Sicherungsdatei in den Spielstand-Ordner
3. Benenne sie in `workflowManager.xml` um (die vorhandene Datei wird ersetzt)
4. Lade den Spielstand

### Von Hand bearbeiten

Du kannst die XML-Datei direkt bearbeiten:
1. Beende das Spiel
2. Öffne `workflowManager.xml` in einem Texteditor
3. Nimm deine Änderungen vor
4. Speichere die Datei
5. Lade den Spielstand

:::warning
Ungültiges XML führt zu Fehlern beim Laden. Leg vor dem Bearbeiten eine Sicherung an und prüfe deine Änderungen sorgfältig.
:::

## Workflows teilen

So teilst du Workflows mit einem anderen Spieler:

1. Gib ihm eine Kopie deiner `workflowManager.xml`
2. Er legt sie in seinen Spielstand-Ordner
3. **Wichtig**: Die Namen der AutoDrive-Ziele und der Courseplay-Kurse müssen bei ihm exakt übereinstimmen, sonst schlagen die Schritte fehl
