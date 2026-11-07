---
id: changelog
title: Changelog
---

# Changelog

Was sich in jeder Version des Workflow Managers geändert hat. Dieselbe Liste steht auch in der Mod-Beschreibung im Spiel.

## v1.3.0 (2026-11-07)

- Neue Option „Vor dem Wechsel abschließen" für Hilfsschritte: das Hilfsfahrzeug beendet seine aktuelle Aufgabe, bevor es dem Hauptfahrzeug zum nächsten Schritt folgt
- Workflows lassen sich jetzt auch während der Ausführung bearbeiten
- Änderungen aus dem Web-Editor bei laufendem Spiel werden beim Öffnen des Workflow Managers übernommen
- Mod-Optionen werden jetzt pro Spieler gespeichert statt im Spielstand
- Neue Optionen in den allgemeinen Einstellungen: Workflow-Manager-Tasten im F1-Hilfefenster anzeigen und Debug-Protokoll für Fehlerberichte
- Fehler und Hinweise erscheinen direkt im geöffneten Dialog; Konfigurationsfehler werden allen Spielern des Hofs gemeldet
- Überarbeitete Dialoge und HUD: farbige AD- / CP-Schrittmarken, Infos zu Hilfsfahrzeugen, und im Hilfsfahrzeug wechselt ein Klick auf den Namen des Hauptfahrzeugs zu diesem
- Behoben: Workflows konnten beim zweiten Speichern in einer Sitzung verloren gehen
- Behoben: Löschen eines Workflows stoppt jetzt alle Fahrzeuge, die ihn ausführen
- Behoben: AutoDrive-, Tank- und Reparatur-Schritte starteten nach dem Laden eines Spielstands nicht neu
- Behoben: ein Schritt wurde nach dem Laden übersprungen, wenn genau zwischen zwei Schritten gespeichert wurde
- Behoben: der Schrittdialog zeigte manchmal die Ziele des vorherigen Schritts oder setzte die Fülltypen zurück

## v1.2.0 (2026-09-23)

- Neue Schritttypen: Parken, Auftanken und Reparieren (über AutoDrive)
- Anführer- und Folgefahrzeuge: ein Folgefahrzeug wartet bei einem Schritt „Auf Anführer warten", bis sein Anführer es mit „Folger freigeben" weiterschickt
- Saatgut pro Courseplay-Feldarbeitsschritt - die Sämaschine wird automatisch umgestellt
- AutoDrive ist jetzt optional: reine Courseplay-Workflows laufen ohne
- Courseplay-Feldarbeit wird nach dem Laden eines Spielstands am letzten Wegpunkt fortgesetzt, statt das ganze Feld neu zu fahren
- Neue Mod-Option in den allgemeinen Einstellungen: automatisches Fortsetzen von Courseplay nach dem Laden ein- oder ausschalten
- HUD: Klick auf den Namen des Anführer- oder Hauptfahrzeugs wechselt zu diesem Fahrzeug
- Tastenkürzel in allen Dialogen; Bearbeiten ist jetzt T und Stopp ist K, damit sie nicht mehr mit den Menütasten des Spiels kollidieren
- Viele Verbesserungen für Multiplayer und Speichern / Laden

## v1.1.0 (2026-05-20)

- Hilfsfahrzeuge, die parallel zum Hauptfahrzeug arbeiten (z.B. Überladewagen beim Mähdrescher)
- Rollenauswahl (Haupt- oder Hilfsfahrzeug) beim Start eines Workflows mit Hilfsaufgaben
- Workflow-Fortschritt für Hilfsfahrzeuge wird korrekt gespeichert und wiederhergestellt
- Pause funktioniert jetzt korrekt, wenn das Hauptfahrzeug zum nächsten Schritt wechselt
- HUD lässt sich frei auf dem Bildschirm verschieben
- Multiplayer verbessert: alle Fahrzeuge bleiben bei allen Spielern synchron
- Hilfsfahrzeuge laufen weiter, wenn das Hauptfahrzeug pausiert wird
- Workflow-spezifische AutoDrive-Einstellungen: Entlade-Füllstand, Rohrversatz und Vorabruf-Schwelle können jetzt pro Workflow über den neuen Knopf „AD/CP Einstellungen" konfiguriert werden

## v1.0.0 (2026-03-11)

- Erstveröffentlichung
