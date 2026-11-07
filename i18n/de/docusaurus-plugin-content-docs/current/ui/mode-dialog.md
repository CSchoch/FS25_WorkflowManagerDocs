---
id: mode-dialog
title: Rollen-Dialog
sidebar_position: 5
---

# Rollen-Dialog

Dieser Dialog fragt, ob das Fahrzeug einen Workflow als **Hauptfahrzeug** oder als
**Hilfsfahrzeug** ausführen soll. Die Titelleiste zeigt den Namen des Workflows, der gestartet wird.

![Rollen-Dialog](/img/screenshots/mode-dialog.png)

## Wann er erscheint

Er erscheint beim **Starten** nur, wenn der gewählte Workflow tatsächlich Unterstützungsschritte enthält.
Bei einem Workflow ohne Unterstützungsschritte gibt es nichts zu wählen – der Dialog wird übersprungen und
das Fahrzeug startet als Hauptfahrzeug.

## Auswahl

Der Dialog beschreibt beide Rollen oberhalb der Tasten, sodass du dich auch ohne diese Seite entscheiden kannst.

| Taste | Wirkung |
|--------|--------|
| **Hauptfahrzeug** | Das Fahrzeug führt die Hauptschritte des Workflows aus – der Drescher, Häcksler oder welches Fahrzeug auch immer die Hauptarbeit erledigt |
| **Hilfsfahrzeug** / **F** | Das Fahrzeug führt die Unterstützungsschritte unter jedem Hauptschritt aus und folgt dabei dem Fortschritt des Hauptfahrzeugs |
| **Abbrechen** / **Esc** | Es startet nichts |

Starte **zuerst das Hauptfahrzeug**, dann das Hilfsfahrzeug – ein Hilfsfahrzeug braucht ein Hauptfahrzeug,
dem es folgen kann, bevor es etwas zu tun hat.

## Was die beiden Rollen tun

Ein **Hauptfahrzeug** arbeitet die Schritte 1, 2, 3 … der Reihe nach ab. Ein **Hilfsfahrzeug** ignoriert diese und
führt stattdessen die Unterstützungsschritte des Hauptschritts aus, bei dem das Hauptfahrzeug gerade ist.
Sind seine Unterstützungsschritte für diesen Schritt erledigt, wartet es, bis das Hauptfahrzeug weiterrückt.

Das HUD zeigt die Rolle an: Ein Hilfsfahrzeug zeigt einen Zähler für Unterstützungsschritte wie `Schritt 2 · Unterstützung 1/2`,
den Namen des Hauptfahrzeugs und den Status *Wartet auf Hauptfahrzeug*, ein Hauptfahrzeug dagegen eine
Zeile *Unterstützer:*, die seine Hilfsfahrzeuge nach Status zählt. Siehe [HUD-Steuerung](hud-controls#main-vehicle-with-support-vehicles).

## Nicht dasselbe wie das Warteschlangen-System

Dieser Dialog lässt sich leicht mit dem [Dialog „Anführerfahrzeug wählen“](leader-select-dialog) verwechseln,
der ebenfalls beim Start erscheint:

| | Rolle wählen | Anführerfahrzeug wählen |
|---|---|---|
| Fragt nach | Welche **Rolle** in *diesem* Workflow | Auf welches **andere Fahrzeug** gewartet wird |
| Erscheint, wenn | Der Workflow Unterstützungsschritte hat | Andere Fahrzeuge bereits Workflows ausführen |
| Ergebnis | Fahrzeug führt Hauptschritte *oder* Unterstützungsschritte aus | Fahrzeug führt seinen eigenen Workflow aus und pausiert an Kontrollpunkten |

Hilfsfahrzeuge teilen sich einen Workflow und führen *unterschiedliche* Teile davon aus. Folger führen ihren
*eigenen* Workflow aus und pausieren nur dort, wo du ausdrücklich Marker gesetzt hast. Siehe
[Workflows mit mehreren Fahrzeugen](../workflows/linked-workflows) und [Warteschlangen-System](../workflows/queue-system).
