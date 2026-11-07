---
id: ad-settings-dialog
title: Dialog „AD/CP Einstellungen“
sidebar_position: 4
---

# Dialog „AD/CP Einstellungen“

Jeder Workflow kann eigene AutoDrive-Einstellungen speichern, die automatisch auf das Fahrzeug
angewendet werden, sobald der Workflow startet – auch wenn er nach dem Speichern und Neuladen
automatisch fortgesetzt wird.

Du öffnest den Dialog aus dem [Hauptdialog](main-dialog): Wähle einen Workflow und klicke dann auf **AD/CP Einstellungen**.

![Dialog „AD/CP Einstellungen“](/img/screenshots/ad-settings-dialog.png)

## Einstellungen

| Einstellung | Einheit | Beschreibung |
|---------|------|-------------|
| **Abladen ab Level** | % (0–100) | Mindest-Füllstand, ab dem AutoDrive einen Überladewagen ruft |
| **Offset Rohr** | Meter | Seitlicher Versatz der Rohrposition beim Abladen |
| **Vorab-Ruf Level** | % (0–100) | Füllstand, bei dem AutoDrive den Überladewagen schon vorab ruft, damit er rechtzeitig ankommt |

Prozentwerte gibst du als ganze Zahlen ein (`80`, nicht `0.8`); intern werden sie als Bruchteile gespeichert.
**Offset Rohr** gibst du in Metern ein, auch Kommawerte sind möglich.

:::tip
Der Dialog weist unter den Feldern selbst darauf hin: Lass ein Feld **leer**, wenn die Einstellung unverändert bleiben soll – der Workflow verwendet dann
den Wert, der in AutoDrive für dieses Fahrzeug bereits eingestellt ist. Ein leeres Feld ist nicht dasselbe wie null.
:::

## Schaltflächen

| Schaltfläche | Wirkung |
|--------|--------|
| **OK** | Speichert die Werte in der Workflow-Definition |
| **Abbrechen** / **Esc** | Schließt den Dialog, ohne etwas zu ändern |

Jedes Feld, das keine gültige Zahl enthält, wird wie ein leeres Feld behandelt. Ein Tippfehler lässt
die Einstellung also stillschweigend unverändert, statt einen falschen Wert zu schreiben.

## So werden die Einstellungen angewendet

Die Einstellungen werden in der Workflow-Definition gespeichert. Sie wandern also mit dem Workflow
und bleiben über Spielsitzungen hinweg erhalten. Sie werden jedes Mal neu angewendet, wenn der Workflow
einen **neuen AutoDrive-Schritt** startet – nicht nur einmal beim Start des Workflows –, damit
AutoDrives eigene Logik beim Routenstart sie nicht mitten im Ablauf überschreiben kann.

Weil die Einstellungen am Workflow hängen und nicht am Fahrzeug, kann dasselbe Fahrzeug zwei
Workflows mit unterschiedlichem Abladeverhalten fahren, ohne dass du dazwischen etwas von Hand umstellen musst.
