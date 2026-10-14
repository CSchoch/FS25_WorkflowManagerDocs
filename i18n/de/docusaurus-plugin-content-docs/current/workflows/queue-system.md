---
id: queue-system
title: Warteschlangen-System (Anführer/Folger)
sidebar_position: 5
---

# Warteschlangen-System

Mit dem Warteschlangen-System hält ein Fahrzeug (der **Folger**) an gewählten Stellen seines Workflows an, bis ein anderes Fahrzeug (der **Anführer**) eine passende Stelle in seinem eigenen Workflow erreicht hat. Das ist nützlich, um Kolonnen zu staffeln oder sicherzustellen, dass ein Fahrzeug einen Bereich des Felds geräumt hat, bevor das nächste beginnt.

Die Synchronisierung muss **ausdrücklich eingebaut** werden: Die Wahl eines Anführers allein bewirkt zur Laufzeit nichts. Der Folger wartet nur dort, wo du ausdrücklich einen **Auf Anführer warten**-Schritt gesetzt hast, und wird freigegeben, wenn der Anführer einen passenden **Folger freigeben**-Schritt erreicht. Ein Workflow ohne Marker-Schritte läuft völlig unabhängig von jedem Anführer, selbst wenn einer gewählt wurde.

## So funktioniert es

Startest du einen Workflow auf einem Fahrzeug, während **andere Fahrzeuge bereits Workflows ausführen**, erscheint der
[Dialog „Anführerfahrzeug wählen“](../ui/leader-select-dialog):

| Auswahl | Wirkung |
|--------|--------|
| **Auswählen** (ein Fahrzeug wählen) | Dein Fahrzeug wird Folger und mit dem gewählten Anführer verknüpft. Ob es irgendwo wirklich wartet, hängt ganz von den unten beschriebenen Marker-Schritten ab. |
| **Kein Anführer** | Dein Fahrzeug startet sofort, ohne Synchronisierung. |
| **Abbrechen** | Der Workflow startet nicht. |

Führt gerade kein anderes Fahrzeug einen Workflow aus, wird der Dialog übersprungen und das Fahrzeug startet sofort.

## Die Sync-Marker hinzufügen

**Auf Anführer warten** und **Folger freigeben** sind Schritttypen wie alle anderen – füge sie über **Schritt hinzufügen** hinzu und wähle den Typ im Schritt-Dialog. Keiner von beiden hat ein Ziel oder eine Aktion zum Einstellen; sie sind reine Kontrollpunkte. Zur Referenz der Typen siehe [Sync-Marker für die Warteschlange](step-types#queue-sync-markers).

- Füge **Auf Anführer warten** in den Workflow des **Folgers** an der Stelle ein, an der er anhalten soll.
- Füge **Folger freigeben** in den Workflow des **Anführers** an der Stelle ein, die wartende Folger freigeben soll.

### So funktioniert die Zuordnung

Die Zuordnung erfolgt nach Reihenfolge: Der 1. Auf-Anführer-warten-Schritt im Workflow des Folgers wird freigegeben, sobald der Anführer seinen 1. Folger-freigeben-Schritt erreicht, der 2. wartet auf den 2. des Anführers und so weiter. Hat der Folger mehr Auf-Anführer-warten-Schritte als der Anführer Folger-freigeben-Schritte, blockiert das überzählige Warten, bis der Workflow des Anführers ganz beendet ist.

### Beispiel – Mähwerk und Schwader

Ein Mähwerk und ein Schwader sollen dieselben Felder nacheinander bearbeiten – der Schwader darf auf einem Feld erst anfangen, wenn das Mähwerk dort fertig ist und weitergezogen ist.

```
Workflow des Mähwerks ("Mäh-Route"):
Schritt 1: AutoDrive  → Feld1_Einfahrt   Fahren zu
Schritt 2: Courseplay → Feld1_Mähen      Feldarbeit
Schritt 3: Folger freigeben
Schritt 4: AutoDrive  → Feld2_Einfahrt   Fahren zu
Schritt 5: Courseplay → Feld2_Mähen      Feldarbeit
Schritt 6: Folger freigeben

Workflow des Schwaders ("Schwad-Route"):
Schritt 1: Auf Anführer warten
Schritt 2: AutoDrive  → Feld1_Einfahrt   Fahren zu
Schritt 3: Courseplay → Feld1_Schwaden   Feldarbeit
Schritt 4: Auf Anführer warten
Schritt 5: AutoDrive  → Feld2_Einfahrt   Fahren zu
Schritt 6: Courseplay → Feld2_Schwaden   Feldarbeit
```

- Das **Mähwerk** startet zuerst, ohne Anführer.
- Der **Schwader** startet als Zweiter, wählt das Mähwerk als Anführer und hält sofort bei seinem Schritt 1 (Auf Anführer warten).

Sobald das Mähwerk Feld 1 fertig hat und seinen Schritt 3 (Folger freigeben) erreicht, wird der Schwader freigegeben und fährt zu Feld 1 – das Mähwerk hat es bereits geräumt. Danach hält der Schwader wieder bei seinem Schritt 4, bis das Mähwerk seinen Schritt 6 erreicht, und so weiter.

## Anführer stoppt oder ist fertig

Wird der Workflow des Anführers **gestoppt, abgeschlossen oder neu gestartet**, wird jeder mit ihm verknüpfte Folger automatisch freigegeben und arbeitet seine eigenen Schritte ohne Warten weiter ab – auch ein Folger, der gerade mitten in einem Schritt ist, statt an einem Auf-Anführer-warten-Kontrollpunkt zu stehen. Das wird laufend geprüft (~500 ms), nicht erst, wenn der Folger den nächsten Warte-Marker erreicht.

## Einrichtung

1. Füge dem Workflow, den das **Anführer**-Fahrzeug fahren soll, **Folger freigeben**-Schritte an den Stellen hinzu, die Folger freigeben sollen.
2. Füge dem Workflow, den das **Folger**-Fahrzeug fahren soll, **Auf Anführer warten**-Schritte an den Stellen hinzu, an denen es anhalten soll.
3. Starte zuerst den Workflow auf dem **Anführerfahrzeug** (kein Anführer – es startet sofort).
4. Steig ins **Folger-Fahrzeug**, öffne den Workflow Manager, wähle seinen Workflow und klicke auf **Starten** – der Dialog zur Anführerwahl erscheint.
5. Wähle das Anführerfahrzeug aus der Liste und klicke auf **Auswählen**.
6. Das Folger-Fahrzeug zeigt im HUD den Status *Wartet auf Anführer* (mit dem Namen des Anführers, anklickbar, um hineinzuspringen), solange es an einem Auf-Anführer-warten-Schritt steht.

## Hinweise

- Anführer und Folger müssen **nicht** denselben Workflow fahren – jedes laufende Fahrzeug kann als Anführer gewählt werden, und seine Folger-freigeben-Schritte werden allein nach ihrer Reihenfolge zugeordnet, nicht nach dem Inhalt der Schritte.
- Ein Folger kann immer nur einen Anführer haben.
- Wie viele Fahrzeuge demselben Anführer folgen, ist nicht begrenzt (jedes wird unabhängig geprüft).
- Das Warteschlangen-System ist etwas anderes als [Unterstützungsschritte](linked-workflows) – Hilfsfahrzeuge führen *andere* Unterstützungsschritte neben dem Hauptfahrzeug aus; Folger-Fahrzeuge fahren ihren *eigenen* Workflow und halten nur an ausdrücklichen Kontrollpunkten an.
- Pausieren, Fortsetzen und Stoppen am Folger-Fahrzeug funktionieren ganz normal und wirken sich nicht auf den Anführer aus.
