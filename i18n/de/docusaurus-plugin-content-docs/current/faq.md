---
id: faq
title: FAQ
sidebar_position: 7
---

# Häufige Fragen

## Allgemein

### Was ist Workflow Manager?

Workflow Manager ist eine Mod, die AutoDrive und Courseplay verbindet, sodass du automatische Abläufe aus Fahrten und Feldarbeit anlegen kannst.

### Brauche ich AutoDrive und Courseplay?

Courseplay ist erforderlich. AutoDrive ist optional – es wird nur für Workflows gebraucht, die **AutoDrive**-, **Parken**-, **Auftanken**- oder **Reparieren**-Schritte enthalten. Ohne AutoDrive sind diese Schritttypen im Schritt-Dialog ausgeblendet, und Workflows aus reinen Courseplay-Schritten laufen ganz normal.

### Funktioniert es im Mehrspieler?

Ja, Workflows laufen auf dem Server, und alle Spieler sehen den Status der Workflows.

### Werden meine Workflows gespeichert?

Ja, Workflows werden automatisch in deinem Spielstand-Ordner gespeichert und bleiben zwischen Sitzungen erhalten.

---

## Workflows

### Wie viele Schritte kann ein Workflow haben?

Es gibt keine feste Grenze. Sehr lange Workflows sind aber schwerer zu überblicken.

### Kann ich einen Workflow kopieren?

Derzeit nicht. Diese Funktion ist für ein späteres Update geplant.

### Kann ich Workflows mit anderen teilen?

Du kannst die Datei `workflowManager.xml` von Hand zwischen Spielständen kopieren, die Zielnamen müssen aber übereinstimmen.

### Warum sehe ich meine AutoDrive-Ziele nicht?

Stelle sicher, dass AutoDrive installiert ist und du mindestens einen Kartenmarker/ein Ziel angelegt hast.

### Warum sehe ich meine Courseplay-Kurse nicht?

Kurse müssen in Courseplay gespeichert sein, bevor sie erscheinen. Prüfe:
- `modSettings/FS25_Courseplay/Courses/[Kartenname]/`

### Was sind die Schritttypen Parken, Auftanken und Reparieren?

Das sind AutoDrive-Hilfsstopps ohne einzustellendes Ziel – AutoDrive wählt das Ziel bei jedem Ausführen des Schritts selbst (den eingestellten Parkplatz des Fahrzeugs, die nächste passende Tankstelle oder den nächsten erreichbaren Werkstatt-Marker). Praktisch, um automatisches Nachtanken in einen lange laufenden Workflow einzubauen. Siehe [Schritttypen](workflows/step-types#autodrive-utility-steps).

---

## Ausführung

### Wie öffne ich den Workflow Manager?

Drücke **Alt links + W**, egal wo (zu Fuß oder im Fahrzeug).

### Welche Tastenkürzel gibt es?

| Kürzel | Aktion |
|----------|--------|
| **Alt links + W** | Workflow Manager öffnen/schließen |
| **Alt links + H** | HUD-Overlay ein-/ausblenden |

In den Dialogen gibt es zusätzlich Kürzel mit einer einzelnen Taste – siehe [Hauptdialog](ui/main-dialog#keyboard-shortcuts) und [Editor-Dialog](ui/editor-dialog#keyboard-shortcuts).

### Warum startet mein Workflow nicht?

Prüfe:
1. Du sitzt in einem passenden Fahrzeug (unterstützt Courseplay, dazu AutoDrive, wenn der Workflow AutoDrive-, Parken-, Auftanken- oder Reparieren-Schritte hat)
2. Der Workflow hat mindestens einen Schritt
3. Es läuft kein anderer AD- oder CP-Auftrag

### Kann ich jedes Fahrzeug nutzen?

Das Fahrzeug braucht die Courseplay-Spezialisierung, dazu die AutoDrive-Spezialisierung, wenn der Workflow AutoDrive-, Parken-, Auftanken- oder Reparieren-Schritte enthält. Die meisten Traktoren, Erntemaschinen und LKWs unterstützen beides.

### Was passiert, wenn ich während eines Workflows aussteige?

Der Workflow läuft weiter. Steigst du wieder ein, siehst du das HUD.

### Kann ich mehrere Workflows gleichzeitig laufen lassen?

Ein Workflow pro Fahrzeug. Mehrere Fahrzeuge können jeweils ihren eigenen Workflow ausführen. Um zwei Fahrzeuge in einem einzigen Workflow zusammenarbeiten zu lassen, nutze [Unterstützungsschritte](workflows/linked-workflows).

### Was passiert, nachdem ich einen Spielstand neu geladen habe?

Workflows, die liefen, werden pausiert wiederhergestellt und laufen, wo möglich, von selbst weiter – Courseplay-Feldarbeit startet etwa 10 Sekunden nach dem Laden an dem Wegpunkt neu, an dem gespeichert wurde. Was danach noch pausiert ist, setzt du mit der Taste **Fortsetzen** im HUD fort. Siehe [Fortsetzen nach dem Speichern](workflows/executing-workflows#resume-after-save).

### Was, wenn ein Schritt fehlschlägt?

Der Workflow stoppt und zeigt einen Fehler. Behebe das Problem und starte dann neu oder überspringe den Schritt über das HUD.

---

## Workflows mit mehreren Fahrzeugen

### Wie koordiniere ich zwei Fahrzeuge in einem Workflow?

Mit **Unterstützungsschritten**. Jeder Hauptschritt kann eingebettete Unterstützungsschritte haben, die ein Hilfsfahrzeug (z. B. ein Überladewagen) ausführt, während das Hauptfahrzeug (z. B. ein Drescher) bei seinem Schritt bleibt. Beide Fahrzeuge starten denselben Workflow – eines wählt **Hauptfahrzeug**, das andere **Hilfsfahrzeug**.

### Brauchen beide Fahrzeuge eigene Workflows?

Nein. Es gibt einen einzigen Workflow. Beide Fahrzeuge starten ihn aus dem Workflow Manager und wählen im Rollen-Dialog ihre Rolle.

### Pausiert das Hilfsfahrzeug mit, wenn ich das Hauptfahrzeug pausiere?

Nein. Hilfsfahrzeuge laufen unabhängig – Pausieren oder Stoppen des Hauptfahrzeugs wirkt sich nicht auf sie aus. Jedes Fahrzeug wird über sein eigenes HUD gesteuert.

### Kann ich die Schritte des Hilfsfahrzeugs von Hand steuern?

Ja. Die HUD-Tasten Zurück/Weiter, Pausieren und Stoppen wirken unabhängig auf das Hilfsfahrzeug. Stoppen beim Hilfsfahrzeug wirkt sich nicht auf das Hauptfahrzeug aus.

### Können mehrere Hilfsfahrzeuge demselben Workflow folgen?

Ja. Jedes Hilfsfahrzeug hat seinen eigenen, unabhängigen Zähler für die Unterstützungsschritte und arbeitet sie in seinem eigenen Tempo ab.

---

## Technisches

### Wo werden Workflows gespeichert?

```
Documents/My Games/FarmingSimulator2025/savegame[X]/workflowManager.xml
```

### Kann ich Workflows von Hand bearbeiten?

Ja, du kannst die XML-Datei direkt bearbeiten, solange das Spiel nicht läuft.

### Beeinflusst Workflow Manager die Leistung?

Kaum. Die Mod prüft den Zustand eines laufenden Workflows zweimal pro Sekunde (alle 500 ms).

### Etwas ist schiefgegangen – wo finde ich Details zum Fehler?

Das Spiel schreibt Fehler in die `log.txt` im Hauptordner des Landwirtschafts-Simulators 25. Wenn du einen Fehler meldest, füge die passenden Zeilen aus dieser Datei bei.

---

### Kann ich für einen Schritt mehrere Fülltypen wählen?

Ja. Bei AutoDrive-Schritten **Abholen und Liefern** und **Abholen** unterstützt die Fülltyp-Liste Mehrfachauswahl:
- **Klick** auf einen Eintrag wählt ihn aus (Einzelauswahl)
- **Strg+Klick** auf einen Eintrag fügt ihn der Auswahl hinzu oder entfernt ihn
- Leer lassen, um jeden Fülltyp zu akzeptieren

### Gibt es ein Warteschlangen-System für mehrere Fahrzeuge?

Ja. Startest du einen Workflow, während andere Fahrzeuge bereits Workflows ausführen, erscheint ein Dialog **Anführerfahrzeug wählen**. Die Wahl eines Anführers allein lässt aber noch nichts warten – die Synchronisierung muss ausdrücklich eingebaut werden. Füge dem Workflow des Folgers **Auf Anführer warten**-Schritte und dem Workflow des Anführers passende **Folger freigeben**-Schritte hinzu, um genau festzulegen, wo der Folger anhält. Einzelheiten unter [Warteschlangen-System](workflows/queue-system).

### Kann ich festlegen, welche Schritte auf den Anführer warten?

Ja – genau dafür gibt es die Schritttypen **Auf Anführer warten** / **Folger freigeben**. Füge dem Workflow des Folgers an jeder Stelle, an der er anhalten soll, einen Auf-Anführer-warten-Schritt hinzu und dem Workflow des Anführers an jeder Stelle, die ihn freigeben soll, einen passenden Folger-freigeben-Schritt. Die Zuordnung erfolgt nach Reihenfolge (der 1. wartet auf den 1., der 2. auf den 2. usw.), und ein Workflow ohne Marker-Schritte wartet nie. Siehe [Sync-Marker für die Warteschlange](workflows/step-types#queue-sync-markers).

---

## Pläne

### Wird es Bedingungen geben?

Einfache Bedingungen gibt es schon heute über die Marker-Schritte **Auf Anführer warten** / **Folger freigeben**: Mit ihnen legst du genau fest, welche Stellen eines Workflows an der Anführer/Folger-Synchronisierung teilnehmen. Weitergehende Bedingungen (wenn/dann, externe Auslöser) sind für spätere Updates geplant.

### Wird es eine visuelle Routenplanung geben?

Das wird für die weitere Entwicklung erwogen.
