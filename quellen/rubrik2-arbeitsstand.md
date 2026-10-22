# FliegenGuide V4 – Rubrik 2 «Fliegen & Führung»

**Stand:** 16. Oktober 2026 · **Status:** Arbeitsentwurf, noch keine Freigabe für GitHub

## 1. Ziel und Abgrenzung

Die Rubrik beantwortet am Wasser: Welche Fliegenarten gibt es? Wann funktionieren sie? Wie präsentieren und führen wir sie? Der visuelle Katalog verwendet **die 27 bereits in V3 eingebetteten Originalfotos**, nummeriert 01–27. Die Empfehlungslogik aus Rubrik 1 darf hierher verlinken, aber Rubrik 2 erfindet keine eigenen Gewässer- oder Montageeingaben.

**Hauptnavigation der V4:** 1 Am Wasser · 2 Fliegen & Führung · 3 Fischarten & Standplätze · 4 Montage & Ausrüstung · 5 Wissen & Knoten.

## 2. Die acht Fliegenarten

| Schlüssel | Name | Typische Zone | Normalpräsentation | Illustrative Ausnahmen |
|---|---|---|---|---|
| `trocken` | Trockenfliege | Oberfläche | Zugfreie Drift / ruhig liegen lassen | kleine Impulse nur bei geeigneten Mustern |
| `emerger` | Emerger / Aufsteiger | Oberflächenfilm | Frei driften, am Ende sanft anheben | See: sehr langsame Filmführung |
| `nymphe` | Nymphe | Unter Wasser, oft grundnah | Absinken, natürliche Drift / langsame See-Führung | Tiefe je nach Gewicht, Vorfach und Strömung |
| `nass` | Nassfliege | Obere bis mittlere Wasserschicht | Drift, Swing | See: langsame kurze Strips |
| `streamer` | Streamer | Verschiedene Tiefen | Züge mit Pausen, Swing | Sinkzeit stark von Muster/Schnur abhängig |
| `buzzer` | Buzzer / Zuckmückenpuppe | Unterschiedliche Tiefen | Extrem langsam oder stationär, sanft anheben | besonders relevant im Stillwasser |
| `land` | Landinsekt | Oberfläche | Aufsetzen, treiben, selten zupfen | besonders nahe Ufervegetation |
| `scud` | Bachflohkrebs / Scud | Grundnah / Kraut | Natürliche Drift, kleinste Hüpfer | Stillwasser: kurze 2–5-cm-Züge und Pausen |

## 3. Originalfoto-Katalog aus V3

Die fotografierten Muster sind in V3 als eingebettete WebP-Bilder enthalten. Der Katalog behält eine **stabile ID** und die bereits verwendeten Musternamen. Fotos werden nicht durch fremde Illustrationen ersetzt.

| Foto-ID | Muster | Primäre V4-Gruppe |
|---|---|---|
| 01 | Schwarze Sedge / Caddis | Trockenfliege |
| 02 | Schwarze CDC-Trockenfliege | Trockenfliege |
| 03 | Quill-Emerger mit CDC-Schlaufe | Emerger |
| 04 | Hare’s-Ear-Loopwing-Emerger | Emerger |
| 05 | Red Tag | Trockenfliege |
| 06 | Black Bivisible | Trockenfliege |
| 07 | Braune Hairwing-Dun | Trockenfliege |
| 08 | Hare’s-Ear-Parachute | Trockenfliege |
| 09 | Rote Parachute-Mückenfliege | Trockenfliege (Mücken-Imitation im Oberflächenfilm) |
| 10 | Braune CDC-Dun | Trockenfliege |
| 11 | Braune CDC-Quill-Dun | Trockenfliege |
| 12 | Pfauengras-Hechelfliege, rot | **Klassifizierung offen:** Nassfliege oder Trockenfliege |
| 13 | Graubraune Haarflügel-Sedge | Trockenfliege |
| 14 | Foam-Flügelfliege mit Hasenohr-Körper | Trockenfliege |
| 15 | Schwarze Trockenfliege mit gelbem Schwanz | Trockenfliege |
| 16 | Hasenohr-Nymphe, schwarzer Kopf | Nymphe |
| 17 | Olivfarbene Hybrid-Nymphe, Goldkopf | Nymphe |
| 18 | Braune Hasenohr-Nymphe, Goldkopf | Nymphe |
| 19 | Graubraune Hasenohr-Nymphe, Goldkopf | Nymphe |
| 20 | Schlanke braune Hasenohr-Nymphe | Nymphe |
| 21 | Dunkel olivbraune Hasenohr-Nymphe | Nymphe |
| 22 | Bachflohkrebs / Scud, graublau | Scud |
| 23 | Bachflohkrebs / Scud, grün | Scud |
| 24 | Schwarz-graue Hasenohr-Nymphe, Goldkopf | Nymphe |
| 25 | Helle Hasenohr-Nymphe, Kupferkopf | Nymphe |
| 26 | Schlanke Hasenohr-Nymphe, schwarzer Kopf | Nymphe |
| 27 | Kompakte Hasenohr-Nymphe, schwarzer Kopf | Nymphe |

**Zählung in V3** (Foto 12 als Nassfliege): 12 Trockenfliegen, 2 Emerger, 10 Nymphen, 1 Nassfliege, 2 Scuds; derzeit **0 eigene Fotos** für Streamer, Buzzer und Landinsekt. Die acht Kategorien bleiben immer vorhanden. Foto 09 bleibt eine schwimmende Parachute-Mückenimitation, kein Beleg für eine sinkende Buzzer-Puppe.

## 4. Choreografie und Qualitätsregeln der Animationen

Eine generische Bewegung für alle acht Muster ist fachlich falsch. Jede Kategorie erhält ihre eigene Führung. Für den Nutzer sind folgende Phasen identisch strukturiert:

1. **Auswerfen:** Angler/Rute stets links, Fliege fliegt rechtswärts. Ausrichtung: Öse/Fliegenkopf zum Angler links, Hakenbogen nach hinten.
2. **Landen bzw. Absinken:** Trockenfliege und Landinsekt bleiben auf dem Wasser, Emerger im Film, nasse Muster sinken abhängig von Gewicht und Schnur.
3. **Führen:** Die Fliege bewegt sich entsprechend Drift, Strömung, Swing, Strip oder Pause. Die Schnurspannung muss zu dieser Bewegung passen.
4. **Aufnehmen:** Köder und Schnur werden nach links zurückgeholt, erst dann wieder auswerfen.

**Fly-specific acceptance tests:**

- Trockenfliege: keine permanenten Zugimpulse, sichtbare natürliche Drift ohne Wasserspur.
- Emerger: Filmposition, minimales Anheben am Ende.
- Nymphe: erkennbares Absinken, anschliessende Drift in der gewählten Tiefe, am Ende Lift.
- Nassfliege: fächerförmiger Swing unter Strömungsspannung; für echte räumliche Darstellung perspektivisch eine **Draufsicht** ergänzen.
- Streamer: Folge von gezielten Stripbewegungen und Pausen; nicht konstante Vorwärtsfahrt.
- Buzzer: sehr langsame Vertikalbewegung oder minutenlange relative Ruhe als didaktische Zeitraffung.
- Landinsekt: kleiner Fallimpuls, längere Ruhe, seltener kurzer Zupfer.
- Scud: nahe Grund/Kraut, wenige Zentimeter Bewegung; Pausen.

**Darstellungsgrenze:** Die HTML-Vorschau ist eine bewegte **schematische Lernanimation** mit gruppenspezifischen Abläufen. Sie berechnet keine Hydrodynamik oder massstäblichen Strömungswiderstände. Die nächste Qualitätsstufe könnte Massstab, Strömungsrichtung in 3D/Draufsicht, Schnurbogen und unterschiedliche Gewässerprofile verfeinern. Keine unrealistischen Animationen als «echte Simulation» bezeichnen.

## 5. Mobile Bedienoberfläche

- Fliegenart als grosse, gut erreichbare Karte auswählen.
- Fachinformationen knapp: Aufenthaltszone, wann einsetzen, typische Führung.
- Animationsfeld und vier Schrittschilder plus Pause / Weiter / Zurück.
- Gewässertyp Bach / Fluss / See und Abspielgeschwindigkeit.
- Katalog filtern nach Fliegenart, Fotonummer und Mustername; Fotos im Detail gross anzeigen.
- Foto 12 in dieser Vorschau zwischen Nassfliege und Trockenfliege umschaltbar.
- Keine Fotos anderer Arten fälschlich als Beispiel zeigen. Keine neuen Fotos generieren und als «Original» ausgeben.

## 6. Verbindung mit anderen V4-Rubriken

**Eingang aus Rubrik 1 (Empfehlung):** `flyTypeId`, optional `photoId`, `waterType`, optional `reason`. Rubrik 2 öffnet den gewählten Typ, hebt nach Möglichkeit ein vorhandenes eigenes Muster hervor und spielt seine Führung ab.

**Ausgang zu Rubrik 4 (Montage):** `flyTypeId`, `waterType`, optional `photoId`. Rubrik 4 entscheidet über Schnur, Vorfach, Tippet etc. Die konkrete Montage nicht doppelt in Rubrik 2 berechnen.

**Technische Referenzen:** V3 GitHub-Repository `En7000/fliegenguide`, bestehende `index.html` auf Branch `main`, beim Lesezugriff SHA `e8f86c9f72501b10e600bbb608547a9440ed4fe7`. Die Bilder sind dort als 27 `data:image/...;base64,...`-Daten enthalten. Die HTML-Vorschau kann sie durch Dateiimport nachladen; eine Online-Ladefunktion aus GitHub Pages ist optional und noch nicht auf Erreichbarkeit geprüft.

## 7. Was bereits geprüft ist / was noch fehlt

**Vorhanden im HTML-Entwurf:** acht auswählbare Fliegenarten; 27 stabile Katalogeinträge; 8 individuelle schematische Abläufe für Bach, Fluss und See; Animation starten/pausieren und Phasen anwählen; Fotoimport aus V3-HTML; Detailansicht je Fotonummer; Foto-12-Umschaltung.

**Offen vor Freigabe:** echte 27 Fotos fest in die V4-Version einbetten; Foto 12 final klassifizieren; Animationen insbesondere Swing in Draufsicht und Vorfach-/Schnurspannung fachlich/optisch verbessern; Cross-Rubrik-Integration mit Rubrik 1 und 4; Offline-Test auf iPhone; Nutzerabnahme.

**Freigaberegel:** Keine GitHub-Änderung, kein Commit, keine Branch/PR-Erstellung oder Veröffentlichung ohne ausdrückliche Freigabe des Nutzers.
