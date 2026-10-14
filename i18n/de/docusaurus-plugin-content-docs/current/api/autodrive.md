---
id: autodrive
title: AutoDrive-Referenz
sidebar_position: 1
---

# AutoDrive-Referenz

Diese Seite erklärt, wie Workflow Manager AutoDrive nutzt und was du wissen musst, um AutoDrive-Schritte einzurichten.

## Was AutoDrive macht

AutoDrive übernimmt alle **Fahrten und Transporte** in deinen Workflows. Es fährt dein Fahrzeug zwischen Orten hin und her und nutzt dafür das AutoDrive-Wegenetz, das du auf der Karte angelegt hast.

## AutoDrive einrichten

Bevor du AutoDrive-Schritte in Workflows nutzen kannst, brauchst du:

1. **Ein AutoDrive-Netz** auf deiner Karte (Wege, die deine Felder, deinen Hof, Verkaufsstellen usw. verbinden)
2. **Ziele** (Marker) an wichtigen Orten wie Feldeinfahrten, Silos und Verkaufsstellen
3. **Ziele in Gruppen ordnen** (optional), damit du sie leichter verwalten kannst

### Zielgruppen

In AutoDrive kannst du Marker in Gruppen (Ordner) ordnen. In Workflow Manager erscheinen gruppierte Ziele mit ihrem Gruppenpräfix:

- Ziele in der Gruppe „All“ erscheinen nur mit ihrem Namen: `Field 1`
- Gruppierte Ziele erscheinen als: `Farm/Silo`, `Sell/Mill` usw.

## AutoDrive-Aktionen

### Fahren zu

Der einfachste Modus. Fährt das Fahrzeug von seiner aktuellen Position zum Ziel.

**Verwendung:** Zu einem Feld fahren, zum Hof zurückkehren, zwischen Orten wechseln.

**Benötigte Ziele:** 1 (Ziel)

### Abholen und Liefern

Belädt am Ziel und liefert die Ladung dann an einen zweiten Ort.

**Verwendung:** Korn aus einem Silo holen und zu einer Verkaufsstelle liefern.

**Benötigte Ziele:** 2 (Abholort + Lieferort)

**Fülltyp:** Optional. Legt fest, welche Ladung aufgenommen wird (z. B. nur Weizen).

### Abladen

Liefert die aktuelle Ladung des Fahrzeugs am Ziel ab.

**Verwendung:** Bereits Geladenes zu einer Verkaufsstelle oder einem Lager bringen.

**Benötigte Ziele:** 1 (Lieferziel)

### Abholen

Belädt am Ziel und kehrt dann zu einem zweiten Ort zurück.

**Verwendung:** Saatgut/Dünger holen und zu einem Feld zurückfahren.

**Benötigte Ziele:** 2 (Ladestelle + Rückkehrort)

**Fülltyp:** Optional. Legt fest, welche Ladung geladen wird.

### Drescher abfahren

Folgt einem Mähdrescher, übernimmt sein Korn und liefert es dann an ein Ziel.

**Verwendung:** Einen Überladewagen neben einem Drescher mitlaufen lassen.

**Benötigte Ziele:** 2 (Erntebereich auf dem Feld + Ablade-/Lieferpunkt)

## Nach Fülltyp filtern

Bei den Aktionen „Abholen und Liefern“ und „Abholen“ kannst du einen bestimmten Fülltyp wählen:

- Begrenzt, was das Fahrzeug aufnimmt
- Praktisch, wenn an einem Ort mehrere Ladungsarten verfügbar sind
- Häufige Fülltypen: Weizen, Gerste, Raps, Mais, Sonnenblumen, Sojabohnen usw.

## Tipps

- **Routen zuerst testen.** Bevor du einen AutoDrive-Schritt in einen Workflow einbaust, teste die Route von Hand in AutoDrive, um sicherzugehen, dass sie funktioniert.
- **Das Fahrzeug muss am AD-Netz stehen.** Das Fahrzeug muss sich in der Nähe eines AutoDrive-Wegs befinden, um losfahren zu können.
- **Zielnamen müssen exakt stimmen.** Der Schritt verwendet den genauen Namen des Ziels – benennst du ein Ziel in AutoDrive um, passe auch deine Workflow-Schritte an.
- **Sorge dafür, dass Wege existieren.** AutoDrive braucht einen gültigen Weg zwischen der Position des Fahrzeugs und dem Ziel. Gibt es keinen Weg, schlägt der Schritt fehl.
