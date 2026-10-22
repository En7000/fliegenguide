# FliegenGuide V4 – Rubrik 4 «Montage & Ausrüstung»
**Entwicklungsstand:** 16. Oktober 2026, Arbeitsfassung V4.1  
**Referenz:** `FliegenGuide-V4-Master-Storyboard.md`  
**Repository:** `En7000/fliegenguide` – **unverändert; keine Freigabe für Änderungen**

## 1. Ziel und Grenzen
Ein zentraler Montage-Rechner macht aus den bereits bekannten Bedingungen und der aktuell gewählten Fliege eine **erklärte Ausgangsmontage**, keine Fanggarantie. Er errechnet konisches/anderes Vorfach, Länge in Metern, zusätzliches Tippet in Zentimetern mit X-/mm-Angabe, Gesamtlänge, typischen Hakengrössen und prüft Gefahren und Unvereinbarkeiten. Das WT-Profil ist optional. **Die Rutenlänge ist keine Standardeingabe und kein Multiplikator der Vorfachlänge.** Alle Hinweise und Zahlen sind Praxisausgangswerte, keine universell gültigen Normen.

Im Standalone-Testprototyp sind die sonst gemeinsamen Felder unter **«Testkontext»** absichtlich editierbar; in der integrierten V4 verschwinden sie aus Rubrik 4 und werden aus den zuständigen Bereichen übernommen.

## 2. Fliegenschnur
| Typ | Wirkung | Sinkrate und Darstellung | Haupthinweis |
|---|---|---|---|
| Floating | Schwimmt | 0 cm/s | Oberflächenpräsentation gut möglich; auch mit sinkender Nymphe fischbar |
| Intermediate | Langsam sinkende Schnur | grob 2–5 cm/s, **Produktangabe hat Vorrang** | Gut für knapp unter der Oberfläche; keine feste Meterzuordnung |
| Sinktip | Nur vorderes Segment sinkend | Modellabhängig (IPS/cm/s nur mit Produktangabe) | Für beschwerte Fliegen/Streamer und zusätzliche Tiefe |
| Sinking | Sinkender Schnurkörper | Typ/IPS herstellerabhängig | Sinkrate nicht mit erreichter Angeltiefe verwechseln |

**Einheiten:** 1 inch = 2,54 cm; **IPS** = inches per second; daher `sinkrate_cm_s = sinkrate_ips × 2.54`. Ein Muster mit `3 ips` ergibt **7,62 cm/s** unter definierten Hersteller-Testbedingungen. Der Schnurtyp ist ein Faktor der **Eignungsprüfung**, nicht der alleinige Auslöser einer Fliegenempfehlung.

**Beispielquelle:** Scientific Anglers gibt Intermediate = 1.25 ips an; RIO Mainstream Intermediate = 1.5–2 ips. Für andere Produkte, besonders Sinktip/Sinking, sind modellabhängige Werte nötig.

## 3. Ausrüstungsprofil
- Rutenklasse `rodWeight`: optional #2 bis #10; bevorzugt einmalig gespeichert (Beispiel #5 WT).
- Schnurklasse `lineWeight`: optional #2 bis #10; Herstelleraufdruck, nicht automatisch tatsächliches Korngewicht.
- Fliegenschnur `lineType`: Floating, Intermediate, Sinktip, Sinking. In Rubrik 1 zentrale Eingabe, in Rubrik 4 nur Profil-/Wechseloption.
- Optionale, tatsächlich bekannte `sinkRateIps`. Kein modellunabhängiger fixer Sinktip-Wert.
- Manuell gewählte Montageart: `auto | taper | poly | mono`; Auto ist Standard.

**Kompatibilität:** gleiche aufgedruckte WT-Klasse ist ein guter Startpunkt; eine Klasse Abweichung = Prüfen, zwei oder mehr = deutliche Warnung, keine automatische Behauptung über Bruch- oder Unfallgefahr. Spezialtaper können absichtlich schwerer sein; Herstellerangaben haben Vorrang. Sehr grosse/beschwerte Streamer erzeugen getrennte Wurfbarkeits-Hinweise.

## 4. Heuristische Startmontagen (normal klare Gewässer, ohne Sonderbedingungen)
| Fliegenart | Hauptvorfach | zusätzliches Tippet | übliches Hakenspektrum* |
|---|---:|---:|---|
| Trockenfliege | 2,40 m | 70 cm | #10 bis #20 |
| Emerger | 2,40 m | 70 cm | #12 bis #20 |
| Nymphe | 2,20 m | 55 cm | #10 bis #18 |
| Nassfliege | 2,20 m | 55 cm | #10 bis #16 |
| Streamer | 1,50 m | 40 cm | #10 bis 4/0 (je nach Muster/Zielfisch) |
| Buzzer | 2,50 m | 75 cm | #12 bis #20 |
| Landinsekt | 2,30 m | 65 cm | #8 bis #18 |
| Scud/Bachflohkrebs | 2,20 m | 55 cm | #12 bis #18 |

*Die Hakenbereiche sind **Plausibilitätsbereiche für die Planung**, keine herstellerübergreifende Massnorm. Hakenform, Drahtstärke und Ködervolumen sind zusätzlich ausschlaggebend.*

### Anpassungen
- **Sehr klares Wasser:** bei feinen Präsentationen länger und ggf. dünner; nicht pauschal alle grossen Streamer dünner auslegen.
- **Stark getrübtes Wasser:** tendenziell kürzer und etwas kräftiger, falls die Präsentation es zulässt.
- **Kleiner Bach:** tendenziell kürzeres Hauptvorfach als im offenen See.
- **Streamer + Sinktip/Sinking:** tendenziell kurze, relativ steife Verbindung für direkte Führung; nicht ein langes feines Trockenfliegenvorfach verwenden.
- **Sinking Polyleader mit Floating:** als bewusst wählbare Zusatzausrüstung; nicht zur Standard-Trockenfliegenmontage erklären. Der Polyleader hat seine **eigene** Sinkrate und Montage-Eignung.
- **Hecht:** separates kräftiges Hauptvorfach mit rund 35 cm **bissfestem Stahl-/Titan-Endstück**. Dieses Endstück wird in der dargestellten Gesamtlänge als Tippet gezählt. Es hat keine sinnvolle X-Klasse. Fliege, Gerätestärke und Verbindung separat prüfen. Das ist ein Startwert, kein universelles Minimum.

## 5. Hakengrössen / X-System
- Unterstützte Hakenauswahl: **#1 bis #20 und 1/0, 2/0, 3/0, 4/0**. Die Zählrichtung um `#1` und `1/0` muss erklärt sein.
- Tippet X / Standardnenndurchmesser in mm: `7X=0.102`, `6X=0.127`, `5X=0.152`, `4X=0.178`, `3X=0.203`, `2X=0.229`, `1X=0.254`, `0X=0.279`.
- Grössere Fliegen erfordern ggf. Mono/Fluoro in **direkter mm-Angabe** (z. B. etwa 0,35 mm); Stahl/Titan wird mit spezifizierter Material- und Tragkraftangabe, nicht mit `X`, beschrieben.
- Keine verlässliche Tragkraft aus `X` oder `mm` allein ableiten, da Material, Fabrikat, Zustand und Knoten variieren.

## 6. Automatische Prüfung
### Kritisch
1. **Hecht ohne bissfestes Stahl-/Titan-Endstück** in der selbst eingegebenen Montage.
2. Deutlich unpassende aufgedruckte WT-Kombination (#5 zu #8): als starke Prüfmeldung, nicht als generelles physikalisches Verbot.
3. Gezieltes Hechtfischen mit für grosse Streamer sehr leichter Rute: deutliche Einschränkung der Wurfbarkeit.

### Warnungen
- Schwimmende Oberflächenfliege mit sinkender Schnur.
- Gewünschte tiefe Suchzone mit wahrscheinlich zu wenig effizienter Schnur; keine aus Sinkrate abgeleitete garantierte Tiefe.
- Sinkender Polyleader für Trockenfliege oder redundant zur Sinkschnur.
- Sehr schwere Fliege an leichter Rute.
- Hakengrösse ausserhalb der Mustergruppe.
- Selbst eingegebene Länge oder Stärke deutlich abweichend vom Vorschlagswert.

### Erfolg
Nur **«kein offensichtlicher Fehler nach diesen Basisregeln»**, niemals Zusage, dass Material/Knoten/Kombination garantiert belastbar sind. Lokale Fischereivorschriften sind separat zu prüfen.

## 7. Ein gemeinsames Datenmodell (geplante Schnittstelle)
```js
const v4Shared = {
  water: {
    type: 'lake',         // lake | river | creek
    clarity: 'normal',    // normal | clear | slightly | murky
    // weitere Bedingungen aus Rubrik 1 bleiben dort zentral
  },
  targetFish: 'none',     // z. B. hecht, bachforelle, aesche
  selectedFly: {
    family: 'nymph',      // eine von 8 Gruppen, aus Rubrik 2
    hookSize: '#14',
    heavilyWeighted: false,
    photoId: null         // bei einem der 27 Fotos, falls vorhanden
  },
  searchZone: {          // optional, Rubrik 3
    depthZone: 'unknown' // 0, 1, 3, 6, 10, 20 als Zonen-Start
  },
  equipment: {
    rodWT: '5',
    lineWT: '5',
    lineType: 'floating', // EIN zentral gespeicherter Schnurtyp
    sinkRateIPS: null,
    leaderMode: 'auto'
  }
};

const rigResult = {
  leader: {type: 'Konisches Mono-/Fluorocarbon-Vorfach', lengthM: 2.2},
  tippet: {type: 'Fluorocarbon', lengthM: 0.55, sizeX: '5X', diameterMm: 0.152},
  totalLengthM: 2.75,
  hookRange: ['#10', '#18'],
  messages: [],
  explanation: '...'
};
```
**Hinweis zur Integration:** Dieser Vertrag ist ein Vorschlag aus Rubrik 4 und muss mit den Implementierungen der Chats 1–3 abgeglichen werden. Der HTML-Prototyp besitzt bereits eine eigene reine `calculateRig(context)`-Funktion; die produktive App soll diese Regelquelle **einmalig** enthalten, nicht fünfmal kopieren.

## 8. Mobile Oberfläche
1. **Profil:** gewählte Schnur, Erklärung des Typs, Sinkrate, optionale Ruten- und Schnurklasse. Keine Rutenlänge.
2. **Montagekarte:** Vorfach (m) / Tippet (cm) / Gesamt (m) und schematischer Aufbau, Material, X/mm, Haken, kurzer Grund.
3. **Montageprüfung:** kritische Meldungen, Warnungen, positive Bestätigungen; zusätzlich ausklappbarer Check der vorhandenen eigenen Montage.
4. **Hakengrössen:** Schnellreferenz mit Zuordnung typischer Muster und X-/mm-Tabelle.
5. **Nur im Prototyp:** Testkontext simuliert Gewässer/Sicht/Fliege/Hook/Zielfisch/Tiefe, bis andere Rubriken eingebunden werden.

## 9. Tests
Die getrennte Empfehlungsfunktion wurde mit **neun Node.js-Prüfungen** auf folgende Situationen getestet:
- Standardnymphe #14, Floating, Rute #5 / Schnur #5
- Sehr klares Wasser mit Trockenfliege #16
- Streamer #6 an Sinking
- Hechtstreamer 2/0 mit zu leichter Rute, Stahl-/Titan-Tippet
- Rute #5 und Schnur #8
- Trockenfliege mit sinkender Schnur
- Tiefenzone 6–10 m, Floating + Nymphe
- Sinkender Polyleader mit Trockenfliege
- Grosser Streamer 2/0 mit mm- statt X-Zuordnung

**Noch offen vor Zusammenführung:** iPhone-Safari-Verhalten im echten Browser, Abgleich mit tatsächlichem Datenschema in den vier anderen Chats, Review durch Praxisfischer, Sondertechniken (Euronymphing / Trocken-Nymphen-Kombinationen / Zweifliegenmontagen), lokale Gewässer- und Fangvorschriften. Die in der Datei verwendeten Werte sind keine sicherheitsgeprüfte Materialbelastungsempfehlung.

## 10. Externe Fachreferenzen
- Orvis, Tippet Chart: https://howtoflyfish.orvis.com/table/how-to-articles/tippet-chart/
- Orvis, Choosing the Right Tippet Size: https://howtoflyfish.orvis.com/choosing-equipment/equipment-articles/474-how-to-choose-the-right-tippet-size
- RIO, Mainstream Sinkraten und Klassen: https://farbank.com/products/rio-mainstream
- Scientific Anglers, Frequency Intermediate: https://scientificanglers.com/product/frequency-intermediate/
- Scientific Anglers, Stillwater Seamless Density: https://scientificanglers.com/product/sonar-stillwater-seamless-density/
- Scientific Anglers, SONAR Sinking Leaders: https://scientificanglers.com/product/sonar-leaders-swivel/
- RIO, How To Use Sinking Leaders: https://farbank.com/blogs/rio/how-to-use-sinking-leaders
- Fly Fishers International, AFFTA-Standard WT / Grain Tabelle: https://www.flyfishersinternational.org/LinkClick.aspx?fileticket=UYdD4QQMUfA%3D&mid=670&portalid=0&tabid=208
