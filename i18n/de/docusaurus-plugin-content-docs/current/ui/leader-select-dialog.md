---
id: leader-select-dialog
title: Dialog „Anführerfahrzeug wählen“
sidebar_position: 6
---

# Dialog „Anführerfahrzeug wählen“

In diesem Dialog legst du fest, welches bereits laufende Fahrzeug das startende Fahrzeug als seinen
**Anführer** für das [Warteschlangen-System](../workflows/queue-system) behandeln soll.

![Dialog „Anführerfahrzeug wählen“](/img/screenshots/leader-select-dialog.png)

## Wann er erscheint

Der Dialog erscheint beim **Starten**, sobald mindestens ein *anderes* Fahrzeug bereits einen
Workflow ausführt. Läuft sonst nichts, gibt es niemanden, dem gefolgt werden könnte – dann wird der
Dialog übersprungen und das Fahrzeug startet sofort.

Das Fahrzeug, das du gerade startest, ist nie in der Liste – ein Fahrzeug kann sich nicht selbst folgen.

## Die Kandidatenliste

Jede Zeile zeigt ein laufendes Fahrzeug:

| Spalte | Beschreibung |
|--------|-------------|
| Fahrzeug | Der Name des Fahrzeugs im Spiel |
| Workflow-Name | Der Workflow, den dieses Fahrzeug gerade ausführt |
| Aktueller Schritt | Wo dieses Fahrzeug gerade steht, z. B. `2/10 · Feldarbeit` (Schritt 2 von 10, dann die Aktion oder der Schritttyp) |

Die Liste ist nach Fahrzeugname sortiert, danach nach Workflow-Name, sodass sie bei jedem Öffnen
dieselbe Reihenfolge hat. Beim Öffnen des Dialogs ist der erste Eintrag ausgewählt. Ein Doppelklick auf eine Zeile wählt
dieses Fahrzeug aus und bestätigt in einem Schritt.

## Schaltflächen

| Schaltfläche | Wirkung |
|--------|--------|
| **Auswählen** | Verknüpft dieses Fahrzeug mit dem markierten Anführer und startet dann den Workflow |
| **Kein Anführer** / **F** | Startet sofort ohne Anführer-Verknüpfung |
| **Abbrechen** / **Esc** | Der Workflow startet nicht |

**Auswählen** ist deaktiviert, solange nichts markiert ist.

## Einen Anführer zu wählen erzeugt noch kein Warten

Das ist der Punkt, den du dir wirklich merken solltest: **Die Wahl eines Anführers allein ändert zur Laufzeit nichts.**

Der Folger hält nur dort tatsächlich an, wo du in seinem eigenen Workflow einen Schritt
**Auf Anführer warten** eingefügt hast, und er wird freigegeben, sobald der Anführer einen
passenden Schritt **Folger freigeben** erreicht. Ein Workflow ohne Marker-Schritte läuft von Anfang
bis Ende genau so durch, als hättest du auf **Kein Anführer** geklickt.

Hast du einen Anführer gewählt und das Fahrzeug wartet nirgends, liegt das meist daran, dass der
Workflow des Folgers keine Schritte **Auf Anführer warten** enthält. Die Regeln für die Zuordnung
über die Reihenfolge findest du unter [Warteschlangen-System](../workflows/queue-system), und unter
[Konsolenbefehle](../api/console-commands#wmprintworkflow) – `wmPrintWorkflow` gibt die Schritte
des Folgers und des Anführers nebeneinander mit ihren Zuordnungsnummern aus.

## Nach dem Start

Das HUD des Folgers zeigt den Status *Wartet auf Anführer* mit dem Namen des Anführers, wann immer
er an einem Kontrollpunkt steht. Der Name ist anklickbar und bringt dich direkt in dieses Fahrzeug.

Ein Folger kann immer nur einen Anführer haben, aber beliebig viele Fahrzeuge können demselben
Anführer folgen. Stoppt der Anführer, ist er fertig oder wird er neu gestartet, werden alle mit ihm
verknüpften Folger automatisch freigegeben und fahren ohne Warten weiter.
