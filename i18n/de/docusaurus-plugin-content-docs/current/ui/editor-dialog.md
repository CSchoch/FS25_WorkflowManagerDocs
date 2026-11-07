---
id: editor-dialog
title: Editor-Dialog
sidebar_position: 2
---

# Editor-Dialog

Im Editor-Dialog baust du die Schritte eines Workflows auf und änderst sie.

## Den Editor öffnen

- Klicke im Hauptdialog auf **Neu**, um einen neuen Workflow anzulegen
- Klicke auf **Bearbeiten** oder doppelklicke einen Workflow, um einen vorhandenen zu bearbeiten

## Überblick über die Oberfläche

![Editor-Dialog](/img/screenshots/editor-dialog.png)

## Schrittliste

Die Schrittliste zeigt die Hauptschritte und ihre Unterstützungsschritte in einer gemeinsamen, verschachtelten Liste. Hauptschritte sind ab 1 durchnummeriert. Unterstützungsschritte erscheinen direkt unter ihrem übergeordneten Schritt auf einem dunkleren Band, eingerückt und nummeriert als `→ N.M` – dabei ist `N` die Nummer des übergeordneten Schritts und `M` die Position des Unterstützungsschritts innerhalb dieses Schritts.

| Spalte | Beschreibung |
|--------|-------------|
| # | Schrittnummer (`1`, `2`, …) oder Nummer des Unterstützungsschritts (`→ 2.1`, `→ 2.2`, …) |
| Typ | Ein farbiger Chip: **AD** (blau) für AutoDrive, **PARK** / **REFUEL** / **REPAIR** (blau), **CP** (grün) für Courseplay, **WM** (bernsteinfarben) für die Warteschlangen-Marker |
| Aktion | Die auszuführende Aktion. Schritte ohne Aktion zeigen stattdessen ihren Typnamen (*Parken*, *Auf Anführer warten*, …); die Warteschlangen-Marker sind in Bernstein geschrieben |
| Ziel | Name des Ziels oder des Kurses (leer bei Typen ohne Ziel). Courseplay-Kurse werden ohne den vorangestellten Ordner `Singleplayer/` angezeigt |

Ein Unterstützungsschritt mit der Einstellung [Vor dem Wechsel abschließen](step-dialog#finish-before-switching) zeigt
nach seinem Ziel `· zuerst abschließen`.

## Aktionstasten

### Neu

Öffnet den Schritt-Dialog, um einen neuen **Hauptschritt** hinzuzufügen:
1. Klicke auf **Neu**
2. Richte den Schritt ein (Typ, Ziel, Aktion)
3. Klicke auf **OK**
4. Der Schritt wird am Ende der Liste angefügt

### + Unterstützung

Fügt dem gerade ausgewählten **Hauptschritt** einen Unterstützungsschritt hinzu:
1. Wähle die Zeile eines Hauptschritts (nummeriert `1`, `2`, `3`, …)
2. Klicke auf **+ Unterstützung**
3. Richte den Unterstützungsschritt im Schritt-Dialog ein
4. Klicke auf **OK**

Der neue Unterstützungsschritt erscheint unter seinem übergeordneten Schritt mit der Nummer `→ N.M`. Die Taste **+ Unterstützung** ist deaktiviert, solange die Zeile eines Unterstützungsschritts ausgewählt ist – wähle zuerst den übergeordneten Hauptschritt.

Mehr zu Unterstützungsschritten und Aufbauten mit mehreren Fahrzeugen findest du unter [Workflows mit mehreren Fahrzeugen](../workflows/linked-workflows).

### Bearbeiten

Ändert den ausgewählten Schritt oder Unterstützungsschritt:
1. Wähle eine Zeile in der Liste
2. Klicke auf **Bearbeiten** (oder doppelklicke die Zeile)
3. Ändere die Eigenschaften im Schritt-Dialog
4. Klicke auf **OK**

### Löschen

Entfernt den ausgewählten Schritt oder Unterstützungsschritt:
1. Wähle die Zeile
2. Klicke auf **Löschen**

Wenn du einen Hauptschritt löschst, werden auch alle seine Unterstützungsschritte entfernt.

:::tip
Nach dem Löschen eines Schritts werden die übrigen Schritte automatisch neu nummeriert.
:::

### ↑ / ↓ (Nach oben / Nach unten)

Ändert die Reihenfolge der Schritte:
- Bei **Hauptschritten**: tauscht den Schritt mit dem darüber oder darunter
- Bei **Unterstützungsschritten**: ändert die Reihenfolge innerhalb der Unterstützungsschritte des übergeordneten Hauptschritts

Am oberen bzw. unteren Ende der jeweiligen Liste ist die Taste deaktiviert.

## Schritt-Dialog

Beim Hinzufügen oder Bearbeiten eines Schritts öffnet sich der [Schritt-Dialog](step-dialog), dessen Felder sich nach dem gewählten Schritttyp und der Aktion richten.

![Schritt-Dialog – AutoDrive](/img/screenshots/step-dialog-autodrive.png)

![Schritt-Dialog – Courseplay](/img/screenshots/step-dialog-courseplay.png)

## Tastenkürzel {/* #keyboard-shortcuts */}

| Taste | Funktion |
|-----|--------|
| **N** | Schritt hinzufügen |
| **T** | Ausgewählten Schritt bearbeiten |
| **S** | Dem ausgewählten Hauptschritt einen Unterstützungsschritt hinzufügen |
| **R** | Ausgewählten Schritt löschen |
| **U** | Schritt nach oben verschieben |
| **D** | Schritt nach unten verschieben |

## Name des Workflows

Oben im Editor gibt es das Feld **Name** – bearbeite es direkt, um den Workflow zu benennen oder umzubenennen.
Der Name wird zusammen mit deinen übrigen Änderungen übernommen, wenn du auf **Speichern** klickst.

## Speichern {/* #saving */}

Der Editor arbeitet mit einer **Kopie** des Workflows, daher wird nichts wirksam, bevor du es bestätigst:

| Taste | Wirkung |
|--------|--------|
| **Speichern** | Übernimmt alle Änderungen – Name, Schritte und Unterstützungsschritte – in den Workflow, schreibt ihn auf die Festplatte und kehrt zum Hauptdialog zurück |
| **Abbrechen** | Verwirft die gesamte Bearbeitung. Der Workflow bleibt genau so, wie er war |

Bei einem mit **Neu** angelegten Workflow hält das die Liste sauber: Der Workflow wird erst beim
**Speichern** eingetragen, sodass nach einem Abbruch kein leerer Eintrag zurückbleibt.

:::warning Einen laufenden Workflow speichern
Du kannst einen Workflow speichern, während Fahrzeuge ihn ausführen. Sie machen sofort mit den neuen
Schritten weiter, zugeordnet über die Schritt-**Nummer** – fügst du vor dem aktuellen Schritt Schritte ein,
löschst oder verschiebst du welche, ändert sich, was das Fahrzeug als Nächstes tut. Gibt es den aktuellen
Schritt nicht mehr, wird der Workflow beendet.
:::

**Speichern** liest `workflowManager.xml` vor dem Schreiben erneut ein, sodass zwischenzeitliche Änderungen
an *anderen* Workflows in der Datei (zum Beispiel mit dem [Web-Editor](../web-editor)) erhalten bleiben.

## Bewährte Vorgehensweisen

1. **Sinnvolle Reihenfolge**: Setze Fahrschritte vor Arbeitsschritte
2. **Vollständige Abläufe**: Beende den Workflow mit einem Schritt, der das Fahrzeug an einen bekannten Ort zurückbringt
3. **Bausteine testen**: Prüfe, ob AD-Routen und CP-Kurse funktionieren, bevor du sie in den Workflow aufnimmst
4. **Aussagekräftige Ziele verwenden**: Benenne deine AD-Ziele und CP-Kurse eindeutig
5. **Unterstützungsschritte an Feldarbeitsschritte hängen**: Fahrschritte brauchen meist keine Unterstützung – lass sie leer, damit das Hilfsfahrzeug während der Fahrt wartet
