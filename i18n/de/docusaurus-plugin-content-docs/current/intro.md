---
id: intro
title: Einführung
sidebar_position: 1
---

# FS25 Workflow Manager

Eine Mod für den Landwirtschafts-Simulator 25, die **AutoDrive** und **Courseplay** zu automatischen Workflows verbindet. Mit ihr lassen sich mehrere Felder nacheinander bearbeiten: AutoDrive übernimmt die Fahrten zwischen den Feldern, Courseplay die eigentliche Feldarbeit.

## Was ist Workflow Manager?

Workflow Manager schließt die Lücke zwischen AutoDrive und Courseplay und lässt dich komplette Automatisierungsabläufe für deinen Hof anlegen. Statt jede Mod von Hand zu starten und zwischen ihnen zu wechseln, legst du einen Workflow einmal fest und lässt ihn automatisch laufen.

## Funktionen

- **Workflows erstellen**: Mehrstufige Workflows aus AutoDrive-Routen und Courseplay-Kursen anlegen
- **Visueller Editor**: Einfache tabellarische Oberfläche zum Anlegen und Verwalten von Workflows
- **Web-Editor**: Dieselben Workflows im Browser bauen und als fertige Spielstand-Datei exportieren
- **HUD im Fahrzeug**: Workflows direkt aus dem Fahrzeug steuern – Pausieren, Fortsetzen und Schrittnavigation; an jede Stelle des Bildschirms verschiebbar
- **Workflows mit mehreren Fahrzeugen**: Unterstützungsschritte in Hauptschritte einbetten, damit ein Hilfsfahrzeug (z. B. ein Überladewagen) im Takt mit dem Hauptfahrzeug (z. B. einem Drescher) arbeitet – alles in einem einzigen Workflow
- **Warteschlangen-System**: Ein Fahrzeug an einem Kontrollpunkt festhalten, bis ein anderes ein Feld geräumt hat – für Kolonnen und versetztes Arbeiten
- **Hilfsschritte**: Parken-, Auftanken- und Reparieren-Schritte in eine Route einfügen, damit lange Workflows nicht liegen bleiben
- **XML-Speicherung**: Workflows werden pro Spielstand gespeichert und bleiben zwischen Sitzungen erhalten
- **Automatischer Wechsel**: Nahtloser Übergang zwischen AutoDrive und Courseplay
- **Speichern/Fortsetzen**: Laufende Workflows werden mit dem Spiel gespeichert und nach dem Laden fortgesetzt – Courseplay-Feldarbeit macht an dem Wegpunkt weiter, an dem gespeichert wurde
- **Mehrspieler**: Die Ausführung liegt beim Server, so bleiben Workflows für alle Spieler synchron

## So funktioniert es

1. **Workflow anlegen** mit mehreren Schritten in der Oberfläche (drücke **Alt links + W**)
2. **Schritte festlegen** – jeder Schritt ist entweder eine AutoDrive-Route oder ein Courseplay-Kurs
3. **Workflow starten** aus deinem Fahrzeug
4. **Zusehen** – die Mod erledigt die Übergänge zwischen den Schritten automatisch

## Beispiel-Workflow

```
1. AutoDrive → Fahren zu Feld 1
2. Courseplay → Feld 1 dreschen
3. AutoDrive → Fahren zum Silo (abladen)
4. AutoDrive → Fahren zu Feld 2
5. Courseplay → Feld 2 dreschen
6. AutoDrive → Zurück zum Hof
```

## Voraussetzungen

- **Landwirtschafts-Simulator 25**
- **Courseplay** (FS25-Version) – erforderlich
- **AutoDrive** (FS25-Version) – optional, nur nötig für Workflows mit AutoDrive-, Parken-, Auftanken- oder Reparieren-Schritten

Lege deine Kurse in Courseplay (und, falls du es nutzt, deine Ziele in AutoDrive) an, bevor du Workflows erstellst. Ein Workflow, der nur aus Courseplay-Schritten besteht, läuft auch ohne installiertes AutoDrive.

## Schnellzugriff

- [Erste Schritte](getting-started) – Deinen ersten Workflow einrichten
- [Web-Editor](web-editor) – Workflows im Browser bauen, ganz ohne Spiel
- [Workflows erstellen](workflows/creating-workflows) – Ausführliche Anleitung zum Anlegen von Workflows
- [Schritttypen](workflows/step-types) – Optionen für AutoDrive- und Courseplay-Schritte
- [Workflows mit mehreren Fahrzeugen](workflows/linked-workflows) – Haupt- und Hilfsfahrzeuge über Unterstützungsschritte koordinieren
- [Warteschlangen-System](workflows/queue-system) – Fahrzeuge mit „Auf Anführer warten“ / „Folger freigeben“ staffeln
- [Konsolenbefehle](api/console-commands) – Einen laufenden Workflow über die Konsole untersuchen
- [Fehlerbehebung](troubleshooting) – Häufige Probleme und Lösungen
