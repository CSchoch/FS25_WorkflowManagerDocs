---
id: console-commands
title: Konsolenbefehle
sidebar_position: 4
---

# Konsolenbefehle

Der Workflow Manager registriert drei reine Lese-Befehle für die Konsole, mit denen du nachsehen
kannst, was ein Workflow gerade tatsächlich tut. Sie schreiben in die Spielkonsole und in `log.txt` –
keiner von ihnen ändert etwas am Zustand, du kannst sie also gefahrlos in einem laufenden Spielstand
verwenden.

Öffne die Konsole mit **~** (Tilde). Passiert nichts, musst du die Konsolenbefehle erst in der
`game.xml` aktivieren (setze `<development><controls>true</controls></development>`).

| Befehl | Bereich |
|---------|-------|
| `wmPrintState` | Das Fahrzeug, in dem du gerade sitzt |
| `wmPrintStateAll` | Jedes Fahrzeug mit einer aktiven Workflow-Manager-Ausführung |
| `wmPrintWorkflow` | Kommentierte Schritttabelle für das gesteuerte Fahrzeug **und seinen Anführer** |

## `wmPrintState`

Gibt den vollständigen Ausführungszustand des gesteuerten Fahrzeugs aus. Sitzt du in keinem
Fahrzeug, erscheint `no controlled vehicle`; läuft auf dem Fahrzeug kein Workflow, erscheint
`(no active workflow)`.

```
----------------------------------------
[WM] John Deere S790
  workflow:          [wf_2] Harvest Route
  status:            RUNNING
  step:              3 / 6  (courseplay)
  isMainVehicle:     true
  leaderVehicle:     (none)
  waitForCompletion: true
  pendingADStart:    false
  pendingCPStart:    false
  cpToCpTransition:  false
  cpHandedOffToAD:   false
  pauseState:        (none)
  waitForMainStep:   nil
  leaderStep:        nil
  syncRequired:      nil
  blockedByLeader:   nil
----------------------------------------
```

### Die Ausgabe lesen

| Feld | Bedeutung |
|-------|---------|
| `workflow` | `[id] name` des laufenden Workflows |
| `status` | Ausführungsstatus (Läuft, Pausiert, Wartet auf Anführer, …) |
| `step` | Aktueller Schritt / Gesamtzahl, mit dem Typ des Schritts in Klammern |
| `isMainVehicle` | `true` für ein Hauptfahrzeug, `false` für ein Hilfsfahrzeug |
| `leaderVehicle` | Der Anführer im [Warteschlangen-System](../workflows/queue-system) oder `(none)` |
| `waitForCompletion` | Der Executor wartet darauf, dass der aktuelle AD/CP-Auftrag sich als erledigt meldet |
| `pendingADStart` / `pendingCPStart` | Ein verzögerter AutoDrive-/Courseplay-Start steht an (Übergänge werden absichtlich um ein, zwei Zyklen verzögert) |
| `cpToCpTransition` | Eine Übergabe von Courseplay zu Courseplay wird verzögert |
| `cpHandedOffToAD` | Courseplay hat mitten im Schritt die Kontrolle an AutoDrive übergeben (z. B. ein Drescher, der einen Überladewagen ruft) |
| `pauseState` | Statusmerker, die beim Pausieren des Workflows gesichert und beim Fortsetzen wiederhergestellt werden |
| `waitForMainStep` | Nur Hilfsfahrzeug – der Index des Hauptschritts, auf den es wartet |
| `leaderStep` | Der aktuelle Schrittindex des Anführers, wie dieser Folger ihn sieht |
| `syncRequired` | Der Schritt des Anführers, den dieser Folger braucht, bevor er weitermachen kann |
| `blockedByLeader` | Gesetzt, wenn der Folger gerade tatsächlich festgehalten wird, mit beiden Schrittnummern |

`pendingLeaderIdx`, `pendingLeaderWF` und `pendingLeaderUid` erscheinen, wenn eine
Anführer-Verknüpfung aus einem Spielstand wiederhergestellt wurde, das Anführerfahrzeug aber noch
nicht aufgelöst ist – in den ersten Sekunden nach dem Laden eines Spielstands ist das normal.

:::note
`blockedByLeader` wird direkt beim Executor abgefragt statt vom Befehl neu berechnet und zeigt
deshalb immer die echte Sperre. Ist `syncRequired` gesetzt, `blockedByLeader` aber `nil`, wurde
der Folger bereits freigegeben und darf losfahren.
:::

## `wmPrintStateAll`

Erstellt dieselbe Ausgabe für jedes Fahrzeug, das der Executor verfolgt. So siehst du am
schnellsten einen ganzen Konvoi auf einmal – wer anführt, wer blockiert ist und bei welchem Schritt.
Läuft nichts, erscheint `no WM vehicles found`.

## `wmPrintWorkflow` {/* #wmprintworkflow */}

Gibt die Schritte des gesteuerten Fahrzeugs als Tabelle aus, der aktive Schritt ist mit `[>]`
markiert. Daneben steht der Workflow des **Anführers**, sodass du beide Seiten einer
Warteschlangen-Paarung gleichzeitig siehst.

```
------------------------------------------------------------
[WM WORKFLOWS] Krone BiG X 1180  status=WAITING_FOR_LEADER
  FOLLOWER  workflow:[wf_4] Windrowing Route  (6 steps)
    Idx  Type  Target                           Sync
    [>]  1  WAIT  (none)                            wait #1
         2  AD    Field1_Entrance                   -
         3  CP    Field1_Windrow                    -
         4  WAIT  (none)                            wait #2
         5  AD    Field2_Entrance                   -
         6  CP    Field2_Windrow                    -
  LEADER  (Claas Disco 9200)  workflow:[wf_3] Mowing Route  (6 steps)
    Idx  Type  Target                           Sync
         1  AD    Field1_Entrance                   -
    [>]  2  CP    Field1_Mow                        -
         3  UNLK  (none)                            unlock ←#1
         4  AD    Field2_Entrance                   -
         5  CP    Field2_Mow                        -
         6  UNLK  (none)                            unlock ←#2
```

Die Typen sind abgekürzt: `AD` (AutoDrive), `CP` (Courseplay), `WAIT` (Auf Anführer warten),
`UNLK` (Folger freigeben).

Die Spalte **Sync** macht Probleme in der Warteschlange sofort sichtbar. `wait #1` beim Folger
gehört zu `unlock ←#1` beim Anführer – die Ordnungszahl bildet das Paar, nicht die Schrittnummer.
Im Beispiel oben hält der Schwader bei seinem `wait #1`, und das Mähwerk hat sein `unlock ←#1`
(Schritt 3) noch nicht erreicht – das Warten ist also korrekt.

Hat ein `wait #N` des Folgers kein passendes `unlock ←#N` in der Tabelle des Anführers, wird diese
Wartestelle erst freigegeben, wenn der gesamte Workflow des Anführers beendet ist. Die Regeln für
die Paarung findest du unter [Warteschlangen-System](../workflows/queue-system).

## Wann du welchen Befehl nutzt

- **Ein Fahrzeug hängt fest** → `wmPrintState`. Prüfe zuerst `blockedByLeader`, dann
  `waitForCompletion` und die `pending*`-Merker.
- **Ein Folger fährt nie los** → `wmPrintWorkflow`. Vergleiche die Ordnungszahlen von `wait #N` / `unlock ←#N`.
- **Ein Konvoi ist durcheinander** → `wmPrintStateAll`, um den Schritt jedes Fahrzeugs auf einmal zu sehen.
- **Du meldest einen Bug** → füge die Ausgabe von `wmPrintStateAll` zusammen mit der `log.txt` in
  das Issue ein. Meist reicht das, um nachzuvollziehen, was der Executor gerade getan hat.
