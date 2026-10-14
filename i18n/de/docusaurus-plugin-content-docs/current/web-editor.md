---
id: web-editor
title: Web-Editor
sidebar_position: 4
---

# Web-Editor

**[Web-Editor öffnen →](https://cschoch.github.io/FS25_WorkflowManagerWebeditor/)**

![Der Web-Editor des FS25 Workflow Manager](/img/screenshots/web-editor.png)

Der Web-Editor ist eine eigenständige Browser-App, mit der du Workflow-Manager-Workflows baust,
ohne dass das Spiel läuft. Er erzeugt eine spielfertige `workflowManager.xml`, die du in deinen
Spielstand-Ordner legst – praktisch, um lange Workflows auf einem zweiten Bildschirm zu planen
oder sie bequem mit einer echten Tastatur statt in den Dialogen des Spiels zu bearbeiten.

Es ist eine statische Seite ohne Server, ohne Konto und ohne Build-Schritt. Alles bleibt in deinem
Browser.

## Was er kann

Der Editor bildet den Editor im Spiel Funktion für Funktion nach:

- **Workflows** – anlegen, umbenennen, duplizieren, löschen und suchen (Duplizieren und Löschen
  stehen neben jedem Workflow in der Liste)
- **Alle sieben Schritttypen** – AutoDrive, Courseplay, die Sync-Marker *Auf Anführer warten* und
  *Folger freigeben* sowie die ziellosen Schritte *Parken* / *Auftanken* / *Reparieren*
  (Schnell-Hinzufügen-Tasten, kein Dialog nötig)
- **AutoDrive-Modi** – Fahren zu, Abholen und Liefern, Abladen, Abholen, Drescher abfahren, mit
  denselben wechselnden Bezeichnungen für Ziel und zweites Ziel wie im
  [Schritt-Dialog](workflows/step-types#autodrive-steps)
- **Courseplay-Aktionen** – Feldarbeit (mit optionalem Saatgut) und Ballen sammeln
- **Fülltypen** – Mehrfachauswahl mit Suche; die vollständige FS25-Grundliste ist eingebaut, und
  IDs von Fülltypen aus Mods kannst du von Hand eintippen
- **Unterstützungsschritte** – Schritte für Hilfsfahrzeuge unter jedem Hauptschritt einbetten,
  umsortieren, bearbeiten und duplizieren (siehe
  [Workflows mit mehreren Fahrzeugen](workflows/linked-workflows))
- **AD/CP-Einstellungen** pro Workflow – Abladen ab Level (%), Offset Rohr (m), Vorab-Ruf Level (%)
- **Umsortieren** – Verschiebe-Tasten und Drag & Drop
- **Automatisches Speichern** im lokalen Speicher des Browsers, **heller/dunkler Modus** und eine
  Oberfläche auf **Englisch/Deutsch**

:::note
Sync-Marker werden innerhalb von Unterstützungsschritten bewusst nicht angeboten – genau wie im
Spiel wird die Anführer/Folger-Zuordnung nur aus Hauptschritten gebildet. Siehe
[Warteschlangen-System](workflows/queue-system).
:::

:::info
Der Editor bietet immer alle sieben Typen an – ein Browser kann nicht erkennen, ob AutoDrive
installiert ist. Im Spiel ist AutoDrive optional: Ein Workflow mit **AutoDrive**-, **Parken**-,
**Auftanken**- oder **Reparieren**-Schritten braucht es zum Starten, ein reiner
Courseplay-Workflow läuft ohne.
:::

## Die Schrittliste lesen

Ein Workflow wird als Route gezeichnet, von oben nach unten, in der Reihenfolge, in der das
Fahrzeug ihn abfährt:

- Ein **blauer Punkt** ist ein AutoDrive-Schritt, ein **grüner Punkt** ein Courseplay-Schritt. Ein
  **blauer Punkt mit Ring** ist Parken, Auftanken oder Reparieren – AutoDrive sucht den Ort selbst
  aus.
- **Auf Anführer warten** und **Folger freigeben** werden als gestrichelte Schranken quer über die
  Route gezeichnet.
- **Unterstützungsschritte** zweigen rechts von dem Hauptschritt ab, zu dem sie gehören
  (nummeriert `3.1`, `3.2`, …).
- Bei Zielen ist die AutoDrive-Gruppe bzw. der Courseplay-Ordner abgeblendet und der Marker bzw.
  Kurs voll dargestellt. Zwei Ziele stehen in Fahrreihenfolge – ein **Abholen**-Schritt zeigt
  zuerst *Beladen bei*, dann *Zurück zu*.
- Ein Schritt ohne Ziel ist rot markiert.

Klicke auf einen Schritt, um ihn zu bearbeiten. Fährst du mit der Maus über einen Schritt (oder
springst mit Tab hinein), erscheinen seine Tasten: Unterstützungsschritt hinzufügen, nach
oben/unten, duplizieren und löschen. Auf dem Handy sind sie immer sichtbar.

![Einen Abholen-Schritt bearbeiten: links die Auswahl der Aufgabe, rechts die Stationen in Fahrreihenfolge](/img/screenshots/web-editor-step-dialog.png)

Der Schritt-Dialog hat eine einzige Auswahl dafür, was das Fahrzeug tut, gruppiert nach der Mod,
die es ausführt, und die Felder, die diese Aufgabe braucht. Seine Pfeile ‹ › wechseln zum vorherigen
oder nächsten Schritt und übernehmen deine Änderungen wie Speichern.

## Hin und zurück mit dem Spielstand

### Den Spielstand direkt bearbeiten (Chrome, Edge)

1. Klicke auf **Spielstand öffnen** und wähle den Ordner `.../My Games/FarmingSimulator2025/`,
   dann den Spielstand aus der Liste (Karte, Name des Spielstands, zuletzt gespeichert; neueste
   zuerst). Wählst du diesen Ordner statt eines einzelnen `savegameN`, findet der Editor auch die
   Kurse von Courseplay (siehe [Zielvorschläge](#target-suggestions)). Ein `savegameN`-Ordner
   funktioniert ebenfalls, und beide Ordner kannst du auch aus dem Explorer auf die Seite ziehen.
   Die `workflowManager.xml` des Spielstands wird geladen, und der Browser fragt einmal, ob er
   Dateien in diesem Ordner bearbeiten darf (bei einem hineingezogenen Ordner erst beim ersten
   Speichern).
2. Baue oder bearbeite deine Workflows.
3. Klicke auf **In savegameN speichern** – die Datei wird direkt in den Ordner geschrieben. Das
   Spiel kann weiterlaufen: Es liest die Datei jedes Mal neu ein, wenn du das Workflow-Manager-Fenster
   öffnest.

Der Ordner bleibt über ein Neuladen der Seite hinweg verknüpft; danach fragt der Browser beim
ersten Speichern erneut um Erlaubnis. Hat das Spiel die Datei geändert, seit der Editor sie geladen
hat (eine Änderung im Spiel oder ein Speichern des Spiels), fragt Speichern vor dem Überschreiben
nach – klicke stattdessen auf **Neu laden**, um die neuere Datei zu laden.

**Neu laden** liest den verknüpften Spielstand erneut: seine `workflowManager.xml`, seine
AutoDrive-Ziele und seine Courseplay-Kurse (siehe [Zielvorschläge](#target-suggestions)). Es fragt
nur vorher nach, wenn du im Editor etwas geändert hast, das noch nicht im Spielstand gespeichert
ist, und lässt den Workflow, den du gerade bearbeitest, geöffnet.

### Importieren / Exportieren (jeder Browser)

Firefox und Safari erlauben Webseiten nicht, in Ordner zu schreiben, deshalb sind dort die Tasten
**Spielstand öffnen** (in der Werkzeugleiste und auf der Startseite) ausgeblendet:

1. **Importiere** deine vorhandene `workflowManager.xml` – über die Dateiauswahl oder indem du die
   Datei einfach irgendwo auf der Seite ablegst.
2. Baue oder bearbeite deine Workflows.
3. **XML exportieren**, dann die `workflowManager.xml` in deinem Spielstand-Ordner ersetzen
   (`.../My Games/FarmingSimulator2025/savegameN/`). Das Spiel kann weiterlaufen: Es liest die
   Datei jedes Mal neu ein, wenn du das Workflow-Manager-Fenster öffnest.

Ältere Speicherformate – verknüpfte Workflow-Paare und Sync-Flags pro Schritt – werden beim Import
nach denselben Regeln migriert wie von `WorkflowStorage.lua` im Spiel. Eine alte Datei wird also
sauber importiert und als aktuelles `formatVersion 2` exportiert. Die exportierte Datei enthält nur
Workflows: Die Einstellungen der Mod und die HUD-Position speichert das Spiel pro Spieler (siehe
[XML-Format](api/xml-format#settings-separate-file)).

:::warning
Exportieren ersetzt die ganze Datei. Workflows, die du im Editor entfernt hast, werden im Spiel
beim nächsten Einlesen der Datei **gestoppt**, und ein laufender Workflow macht mit seinen neuen
Schritten weiter, zugeordnet über die Schrittnummer. Behalte eine Sicherung der Originaldatei, bis
du geprüft hast, dass die Workflows richtig geladen werden.
:::

## Zielvorschläge {/* #target-suggestions */}

![Der Ziele-Dialog: AutoDrive-Ziele und Courseplay-Kurse, gruppiert wie im Spiel](/img/screenshots/web-editor-targets.png)

Zielfelder sind Freitext und werden aus den Listen unter **Ziele** automatisch vervollständigt.
**Jeder Spielstand hat seine eigenen Listen**, ein Wechsel des Spielstands bietet dir also nie
Marker oder Kurse einer anderen Karte an.

Bei einem verknüpften Spielstand (Chrome, Edge) füllen sich die Listen bei **Spielstand öffnen**
und **Neu laden** von selbst:

- **AutoDrive-Ziele** werden aus der `AutoDrive_config.xml` des Spielstands gelesen.
- **Courseplay-Kurse** liegen außerhalb des Spielstands, pro Karte
  (`.../FarmingSimulator2025/modSettings/FS25_Courseplay/Courses/<Karte>/`). Öffnest du den Ordner
  `FarmingSimulator2025`, wird dieser `Courses`-Ordner automatisch gefunden und verknüpft. Ab dann
  liest der Editor die Kurse der Karte, die der geöffnete Spielstand nutzt – auch wenn du später
  direkt einen `savegameN`-Ordner öffnest.

Lässt sich etwas nicht automatisch finden, öffnet sich **Ziele** von selbst, und die fehlende
Hälfte sagt dir neben der passenden Taste, warum:

| Was fehlt | Warum | Was tun |
|---|---|---|
| Courseplay-Kurse | Du hast einen `savegameN`-Ordner geöffnet und noch keinen `Courses`-Ordner verknüpft. Ein Browser kann nicht außerhalb des gewählten Ordners suchen. | **Ordner verknüpfen** und `Courses` oder den Ordner `FarmingSimulator2025` wählen, oder beim nächsten Mal den Ordner `FarmingSimulator2025` öffnen. |
| Courseplay-Kurse | Der verknüpfte Ordner ist der Ordner einer einzelnen Karte, und dieser Spielstand spielt eine andere. | **Ordner ändern** und `Courses` selbst wählen, das deckt alle Karten ab. |
| Courseplay-Kurse | Nach einem Neuladen der Seite braucht der Browser erneut deine Erlaubnis. | **Zugriff erlauben**. |
| Courseplay-Kurse | Der verknüpfte Ordner kann nicht gelesen werden (verschoben oder gelöscht). | **Ordner ändern**. |
| AutoDrive-Ziele | Der Spielstand hat keine `AutoDrive_config.xml`, aber deine Workflows nutzen AutoDrive-Schritte. AutoDrive schreibt sie beim Speichern des Spiels. | **Datei importieren** oder Ziele von Hand eintippen. |

Gefragt wirst du nur nach einer Mod, die deine Workflows nutzen: AutoDrive ist optional, ein reiner
Courseplay-Workflow fragt also nie nach der `AutoDrive_config.xml`.

Mit **Ordner verknüpfen** kannst du auch den Ordner einer einzelnen Karte in `Courses` wählen, dann
bekommen aber nur Spielstände auf dieser Karte ihre Kurse.

Jede Liste ist so gruppiert wie im Spiel – Ziele nach AutoDrive-Gruppe, Kurse nach Feldordner – und
das Feld darüber filtert die Liste beim Tippen; Enter fügt den eingegebenen Namen hinzu. Ein Klick
auf eine Gruppe klappt sie ein; ihr ✕ entfernt die ganze Gruppe mit ihren Einträgen, und **Leeren**
entfernt alles Aufgelistete (beim Filtern nur die Treffer). Ohne verknüpften Spielstand oder
Courseplay-Ordner liest **Datei importieren** die Markernamen aus einer `AutoDrive_config.xml` und
**Ordner importieren** die Kursnamen aus dem Ordner deiner Karte in `Courses`. Namen, die deine
Workflows bereits verwenden, sind immer aufgelistet.

AutoDrive-Ziele werden so aufgeführt, wie der Schritt-Dialog des Spiels sie zeigt: `Gruppe/Marker`
(zum Beispiel `Felder 41-60/Feld 41`) oder nur der Markername bei AutoDrives Standardgruppe.

:::tip
Courseplay-Kursnamen werden als **Pfade mit Ordner** gespeichert (zum Beispiel
`Singleplayer/F34/Kalken`). Lass beim Importieren von Kursnamen die Ordnerstruktur intakt – ein
nackter Kursname kann das falsche Feld treffen, wenn derselbe Name in mehreren Ordnern vorkommt.
Siehe [Kursauswahl](workflows/step-types#course-selection).
:::

## Lokal ausführen

Der Editor ist eine schlichte `index.html` – lade das Repository herunter und öffne die Datei
direkt im Browser. Ein Webserver ist nicht nötig.

Quellcode und Issues: [FS25_WorkflowManagerWebeditor](https://github.com/CSchoch/FS25_WorkflowManagerWebeditor)
