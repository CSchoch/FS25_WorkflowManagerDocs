---
id: courseplay
title: Courseplay-Referenz
sidebar_position: 2
---

# Courseplay-Referenz

Diese Seite erklärt, wie Workflow Manager Courseplay nutzt und was du wissen musst, um Courseplay-Schritte einzurichten.

## Was Courseplay übernimmt

Courseplay erledigt in deinen Workflows die gesamte **Feldarbeit**. Es fährt gespeicherte Kurse mit deinem Fahrzeug ab und führt so Arbeiten wie Ernten, Grubbern, Säen und Pressen aus.

## Courseplay einrichten

Bevor du Courseplay-Schritte in Workflows verwendest, musst du:

1. **Einen Kurs erzeugen** – für jedes Feld und jede Arbeit (z. B. einen Erntekurs für Feld 1)
2. **Den Kurs speichern** – in der Kursverwaltung von Courseplay
3. **Die passenden Geräte anhängen** – die dein Fahrzeug für die Arbeit braucht

### Wo Kurse gespeichert werden

Courseplay speichert Kurse pro Karte unter:
```
Documents/My Games/FarmingSimulator2025/modSettings/FS25_Courseplay/Courses/[MapName]/
```

Du kannst Kurse in Unterordnern organisieren. Bei der Kursauswahl in Workflow Manager erscheinen Ordnerpfade als `FolderName/CourseName`.

## Courseplay-Aktionen

### Feldarbeit

Fährt den gespeicherten Courseplay-Kurs für allgemeine Feldarbeiten ab.

**Verwendung:** Ernten, Grubbern, Säen, Spritzen, Düngen, Mähen und jede andere Feldarbeit, die Courseplay unterstützt.

**So funktioniert es:**
1. Workflow Manager lädt den angegebenen Kurs auf das Fahrzeug
2. Courseplay startet die Feldarbeit
3. Ist der Kurs beendet, geht der Workflow zum nächsten Schritt über

### Ballen sammeln

Sammelt, lädt und wickelt Ballen auf dem Feld.

**Verwendung:** Ballen nach dem Mähen/Pressen aufnehmen.

## Kursauswahl

Im Schritt-Dialog zeigt die Kursliste alle gespeicherten Kurse der aktuellen Karte:

- Die Kurse sind alphabetisch sortiert
- Kurse in Ordnern erscheinen als `Folder/CourseName`
- Mit dem **Suchfeld** findest du Kurse schnell über ihren Namen

## Wie Courseplay einen Schritt abschließt

Workflow Manager überwacht Courseplay und wartet, bis es fertig ist, bevor es zum nächsten Schritt geht.

### Einfacher Fall
Courseplay beendet den Kurs, der Workflow geht weiter.

### Mit internem AutoDrive
Manchmal startet Courseplay intern AutoDrive (z. B. schickt ein Mähdrescher einen Überladewagen los, der das Korn per AutoDrive abliefert). Workflow Manager erledigt das automatisch:

1. Courseplay pausiert und startet AutoDrive für die Lieferung
2. AutoDrive liefert ab und kehrt zurück
3. Courseplay setzt die Feldarbeit fort
4. Dieser Ablauf wiederholt sich, bis der Kurs abgeschlossen ist
5. Erst wenn Courseplay UND AutoDrive fertig sind, geht der Workflow weiter

Das musst du nicht gesondert einrichten – es geschieht automatisch, wenn dein Fahrzeug in AutoDrive/Courseplay dafür konfiguriert ist.

## Tipps

- **Kurse speichern, bevor du Workflows erstellst.** Der Kurs muss in den gespeicherten Kursen von Courseplay existieren, bevor du ihn in einem Workflow-Schritt auswählen kannst.
- **Kursnamen müssen exakt stimmen.** Wenn du eine Kursdatei umbenennst oder verschiebst, passe deine Workflow-Schritte an.
- **Zuerst die Geräte anhängen.** Achte darauf, dass die richtigen Geräte am Fahrzeug hängen, bevor du den Workflow startest (z. B. ein Schneidwerk zum Ernten).
- **Kurse vorher testen.** Fahre jeden Kurs einmal manuell in Courseplay ab, um zu prüfen, dass er richtig funktioniert, bevor du ihn in einen Workflow aufnimmst.
- **Ein Kurs pro Schritt.** Jeder Courseplay-Schritt nutzt genau einen gespeicherten Kurs. Für mehrere Felder fügst du separate Schritte hinzu.
