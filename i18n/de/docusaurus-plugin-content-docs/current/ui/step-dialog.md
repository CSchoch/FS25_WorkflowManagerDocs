---
id: step-dialog
title: Schritt-Dialog
sidebar_position: 3
---

# Schritt-Dialog

Im Schritt-Dialog konfigurierst du einen einzelnen Workflow-Schritt. Er öffnet sich aus dem
[Editor-Dialog](editor-dialog) über **Schritt hinzufügen**, **Unterstützungsschritt hinzufügen** oder **Bearbeiten** (oder per
Doppelklick auf eine Schrittzeile).

![Schritt-Dialog – AutoDrive](/img/screenshots/step-dialog-autodrive.png)

Der Dialog ist **adaptiv**: Er zeigt nur die Felder, die der gewählte Typ und die gewählte Aktion tatsächlich brauchen.
Wählst du einen Typ ohne Ziel, schrumpft er auf eine einzige Auswahlliste zusammen.

## Typ

Die Auswahlliste **Typ** legt fest, was der Schritt tut. Bis zu sieben Typen stehen zur Verfügung:

| Typ | Zeigt Ziel-/Aktionsfelder? |
|------|------------------------------|
| **AutoDrive** | Ja |
| **Courseplay** | Ja |
| **Auf Anführer warten** | Nein |
| **Folger freigeben** | Nein |
| **Parken** | Nein |
| **Auftanken** | Nein |
| **Reparieren** | Nein |

Wenn du den Typ änderst, wird die Auswahlliste **Aktion** neu aufgebaut und der Rest des Formulars ein- oder ausgeblendet.
Was die einzelnen Typen zur Laufzeit tun, steht unter [Schritttypen](../workflows/step-types).

:::note Unterstützungsschritte
Öffnest du den Dialog über **Unterstützungsschritt hinzufügen**, werden die beiden Warteschlangen-Marker – *Auf Anführer warten*
und *Folger freigeben* – **aus der Auswahlliste „Typ“ entfernt**. Anführer-/Folger-Paare werden
nur aus Hauptschritten gebildet.

Die einzige Ausnahme: Bearbeitest du einen Unterstützungsschritt, der *bereits* ein Marker ist (gespeichert, bevor es diese
Einschränkung gab), bleiben beide Typen in der Liste, damit die Auswahlliste den tatsächlichen Stand zeigt und du
den Schritt in etwas anderes umwandeln kannst.
:::

:::note Ohne AutoDrive
AutoDrive ist optional. Ist es nicht installiert, werden die vier von AutoDrive gefahrenen Typen – *AutoDrive*,
*Parken*, *Auftanken* und *Reparieren* – aus der Auswahlliste „Typ“ entfernt, und ein neuer Schritt beginnt als
**Courseplay** / **Feldarbeit**. Ein Schritt, der bereits einen dieser Typen hat, behält ihn in der Liste, sodass
du siehst, was er ist, und ihn umwandeln kannst.
:::

## Aktion

Welche Aktionen verfügbar sind, hängt vom Typ ab:

| Typ | Aktionen |
|------|---------|
| **AutoDrive** | Fahren zu, Abholen und Liefern, Abladen, Abholen, Drescher abfahren |
| **Courseplay** | Feldarbeit, Ballen sammeln |

Die Aktion bestimmt, welche der übrigen Felder erscheinen:

| Aktion | Zweites Ziel | Fülltyp | Saatgut |
|--------|---------------|-----------|-----------|
| Fahren zu, Abladen | – | – | – |
| Drescher abfahren | Liefern an | – | – |
| Abholen und Liefern | Liefern an | Ja | – |
| Abholen | **Ladepunkt** | Ja | – |
| Feldarbeit | – | – | Ja |
| Ballen sammeln | – | – | – |

:::tip
Die Beschriftung des zweiten Ziels ändert sich mit der Aktion – bei der Aktion *Abholen* lautet sie **Ladepunkt**,
bei allen anderen **Liefern an**. Gleiches Feld, andere Bedeutung – lies also die Beschriftung, statt
dich auf die Position zu verlassen.
:::

## Ziel

Die Liste **Ziel** enthält je nach Typ AutoDrive-Ziele oder Courseplay-Kurse.

- Tippe in das **Suchfeld** über der Liste, um sie während der Eingabe zu filtern
- Klicke auf einen Eintrag, um ihn auszuwählen
- Die aktuelle Auswahl steht in der Zeile **Ausgewählt** unter der Liste

Courseplay-Kurse erscheinen als Pfade mit Ordnerangabe (z. B. `Singleplayer/F34/Kalken`), damit
gleichnamige Kurse in verschiedenen Ordnern unterscheidbar bleiben – siehe
[Kursauswahl](../workflows/step-types#course-selection).

## Fülltyp

Wird nur bei **Abholen und Liefern** und **Abholen** angezeigt. Es begrenzt, was das Fahrzeug aufnimmt – das ist
wichtig, wenn an einem Ort mehrere Fülltypen verfügbar sind.

| Bedienung | Ergebnis |
|-------------|--------|
| **Klick** auf einen Eintrag | Wählt ihn aus und ersetzt eine bisherige Auswahl |
| **Strg+Klick** auf einen Eintrag | Schaltet ihn ein oder aus und baut so eine Mehrfachauswahl auf |

- Ausgewählte Einträge sind mit einem grünen **✓** markiert
- Die Zeile darunter zeigt bis zu zwei Namen (`Ausgewählt: Weizen, Gerste`) oder bei größeren
  Auswahlen die Anzahl (`Ausgewählt: 3 ausgewählt`)
- Lass das Feld leer, um **jeden** Fülltyp zu akzeptieren

## Saatgut

Wird nur bei der Courseplay-Aktion **Feldarbeit** angezeigt. Es stellt das Saatgut an der angehängten Sämaschine ein,
kurz bevor Courseplay startet – so kann ein Workflow auf jedem Feld eine andere Frucht säen.

- **(keins)** (die Voreinstellung) lässt das Saatgut, das die Maschine bereits hat, unverändert
- Das Saatgut wird an jeder angehängten Sämaschine eingestellt, die es säen kann
- Ist keine Sämaschine angehängt, schadet die Einstellung am Schritt nicht – sie wird einfach ignoriert
- Die Liste enthält jede pflanzbare Fruchtart der aktuellen Karte und deckt damit auch Früchte ab,
  die per Mod hinzugefügt wurden

Was zur Laufzeit passiert, steht unter [Saatgut](../workflows/step-types#seed-type).

## Vor dem Wechsel abschließen {/* #finish-before-switching */}

Wird nur bei **Unterstützungsschritten** angezeigt (bei allen Typen außer den beiden Warteschlangen-Markern). Es legt fest, was
das Hilfsfahrzeug tut, wenn das Hauptfahrzeug zu seinem nächsten Schritt übergeht, während dieser Unterstützungsschritt
noch läuft:

| Wert | Verhalten |
|-------|-----------|
| **Nein** (Voreinstellung) | Der Unterstützungsschritt wird sofort gestoppt, und das Hilfsfahrzeug startet Unterstützungsschritt 1 des neuen Schritts des Hauptfahrzeugs |
| **Ja** | Das Hilfsfahrzeug schließt erst diesen Unterstützungsschritt ab und startet dann Unterstützungsschritt 1 des Schritts, auf dem das Hauptfahrzeug *jetzt* steht – Schritte, die das Hauptfahrzeug inzwischen durchlaufen hat, werden übersprungen |

Nutze es für Aufgaben, die nicht mittendrin abgebrochen werden dürfen, etwa das Abliefern eines vollen Anhängers. Manuelles
**Weiter** / **Zurück** im HUD des Hauptfahrzeugs wechselt das Hilfsfahrzeug weiterhin sofort.
Siehe [Reihenfolge der Unterstützungsschritte](../workflows/linked-workflows#support-step-sequencing).

## Bestätigen

| Schaltfläche | Wirkung |
|--------|--------|
| **OK** | Prüft den Schritt und gibt ihn an den Editor zurück |
| **Abbrechen** / **Esc** | Verwirft den Schritt; nichts wird hinzugefügt oder geändert |

Die Prüfung ist bewusst minimal:

- Bei **AutoDrive**- und **Courseplay**-Schritten ist ein **Ziel erforderlich** – klickst du ohne
  gewähltes Ziel auf **OK**, bleibt der Dialog offen und zeigt in der Statuszeile unten im Dialog
  *Bitte zuerst ein Ziel auswählen*.
- Bei den fünf Typen ohne Ziel wird nur der Typ gespeichert. Wähle den Typ und klicke auf **OK**.

Zweites Ziel, Fülltyp und Saatgut werden nur gespeichert, wenn die gewählte Aktion sie tatsächlich verwendet.
Wechselst du die Aktion, nachdem du sie gesetzt hast, werden die Werte verworfen, die nicht mehr passen.

:::info
**OK** gibt den Schritt an den Bearbeitungspuffer des Editors zurück – es schreibt nichts auf die Festplatte. Der Workflow wird
erst übernommen, wenn du im [Editor-Dialog](editor-dialog#saving) auf **Speichern** klickst. Brichst du
den Editor ab, werden alle Schrittänderungen dieser Sitzung verworfen.
:::
