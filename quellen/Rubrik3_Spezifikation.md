# FliegenGuide V4 – Rubrik 3 «Fischarten & Standplätze»

**Stand:** 16. Oktober 2026 · **Status:** eigenständiger, getesteter HTML-Prototyp; **nicht** in GitHub integriert.

## 1. Auftrag und Grenzen

- 7 Seefische: **Egli**, **Hecht**, **Zander**, **Felchen**, **Seeforelle**, **Seesaibling**, **Namaycush**.
- 3 Bach-/Flussfische: **Bachforelle**, **Regenbogenforelle**, **Äsche**.
- Gewässerumschaltung See ⇄ Bach/Fluss; eigene Mehrfachauswahl je Gewässer.
- Saison, Tageszeit, im See zusätzlich maximale Gewässertiefe. Wassertemperatur optional.
- Alle gewählten Arten erscheinen **gemeinsam animiert** in einer schematischen Gewässeransicht.
- **Nicht:** geortete Fischpositionen, tatsächliches Temperatur-/Sauerstoffprofil, Fangversprechen, Artenvorkommensgarantie, rechtliche Freigabe zum Fischen.
- Keine Repository-Änderung ohne explizite Freigabe.

## 2. Grundlogik

1. `water` = `lake` | `river` wählt Artenpool und Grafik.
2. `selectedSpecies` ist eine Menge (Set) von Art-IDs; Umschalten erhält die getrennte Auswahl pro Gewässer.
3. Die Grafik zeigt für jede gewählte Art **eine repräsentative Aufenthaltsposition** innerhalb plausibler Bereiche; Karten geben **weitere** Suchbereiche an. Ein Fischsymbol steht für eine Art, nicht für einen einzelnen Fisch oder nachgewiesenen Bestand.
4. `season` und `daytime` passen Suchbereiche konservativ an. `maxDepth` begrenzt nur existierende See-Tiefenbänder; der Seegrund ist schematisch.
5. Ohne Fischwahl erscheint ein verständlicher Leerzustand.
6. Reduzierte Animation bei Betriebssystem-Einstellung `prefers-reduced-motion`.

### 2.1 Die sechs vorgegebenen Seezonen

| Index | Bezeichnung im Storyboard | Tiefenbereich | Einordnung |
|---|---|---|---|
| 0 | Oberfläche | 0–1 m | Oberflächennahe Zone |
| 1 | Flach | 1–3 m | Oberes Wasser |
| 2 | Ufernah | 3–6 m | **Nur Name des Storyboards:** Uferabstand hängt von der Ufergeometrie ab |
| 3 | Mittelzone | 6–10 m | Mittlerer Tiefenbereich |
| 4 | Tiefzone | 10–20 m | Tiefer Bereich, teils oberhalb/unterhalb der Sprungschicht |
| 5 | Sehr tief | über 20 m | nur wenn der See tatsächlich tiefer als 20 m ist |

Die Tiefenbänder sind **nicht linear gezeichnet**, damit alle im iPhone-Format erkennbar bleiben. Werte sind zur Orientierung, keine empirischen Schwellen für jede Fischart. Tiefe allein ohne Temperatur, Sauerstoff, Licht, Beute und Gewässerprofil reicht nicht zur belastbaren Vorhersage.

### 2.2 See – habitatbasierte Artprofile

| Art | Primäre Habitatindikatoren | Besonderheiten im Algorithmus |
|---|---|---|
| Egli (*Perca fluviatilis*) | Vegetationskante, Strukturen, Beutefische; freies Wasser möglich | Frühling/Sommer eher littoral, Winter tendenziell tiefer; nicht auf Ufer fixieren |
| Hecht (*Esox lucius*) | Pflanzen, Schilf, Deckung, Fischschwärme | Frühlingsnah flach, warme Saison teilweise auf kühlere Kanten |
| Zander (*Sander lucioperca*) | Kanten, Trübung, Licht, Beutefische | Abend/Nacht kann Standort und Aktivität im Freiwasser ändern |
| Felchen (*Coregonus* spp.) | Art-/See-spezifische Nische, Plankton oder Benthos | Keine einheitliche absolute Tiefe: unterschiedliche Felchenformen bewohnen sehr unterschiedliche Bereiche |
| Seeforelle (*Salmo trutta*, Wanderform) | Temperatur, Sauerstoff, Nahrung, Zuflüsse | Wanderform der Forelle; zeitweise Zuflüsse/Laichgewässer, sommerlich eher kühl |
| Seesaibling (*Salvelinus umbla*, Komplex) | Kaltes sauerstoffreiches Wasser, steile Ufer/Hänge, Tiefe | Sommer oft tiefer, Ausnahmen je Gewässer; Lago di Poschiavo 20–40 m als **lokales Beispiel** |
| Namaycush (*Salvelinus namaycush*) | Kühle und Sauerstoff, Hänge, tiefes Wasser | Im geschichteten Sommer häufig in tieferen Schichten; im Einzelfall nicht absolut |

**Fachliche Einschränkung:** Die Zuordnung in Code-Arrays ist ein didaktisches *Heuristik-Modell* aus diesen Lebensraummerkmalen. Sie wurde nicht mit Telemetriedaten für einen konkreten Schweizer See validiert. Bei flachen Seen darf sie nicht suggerieren, dass Kaltwasserarten dort vorkommen oder zwingend Tiefe vorhanden ist.

### 2.3 Bach / Fluss – Mikrostandplätze

- **Bachforelle:** unterspülte Ufer, Deckung hinter Steinen, Strömungsschatten und tiefe Rinnen; Ruheplatz nahe Nahrungsdrift.
- **Regenbogenforelle:** durchströmte Riffles/Runs, Taschenwasser hinter Strukturen, Gumpen und Kanten; Überschneidungen mit Bachforelle möglich.
- **Äsche:** adulte Fische häufig in Hauptstrom und tieferen Kiesrinnen, Jungfische dagegen vermehrt in strömungsarmen Uferbereichen. Die Vorschau repräsentiert primär erwachsene Fische.

Die Flussgrafik nutzt eine **Draufsicht**, Strömungspfeile und bewegte Fische. Saison und Tageszeit ändern die Symbole exemplarisch, ohne eine hydrologische Simulation vorzutäuschen.

## 3. Datenmodell für die spätere Integration

```ts
type WaterType = 'lake' | 'river';
type Season = 'spring' | 'summer' | 'autumn' | 'winter';
type Daytime = 'morning' | 'day' | 'evening' | 'night';
type SpeciesId = 'egli'|'hecht'|'zander'|'felchen'|'seeforelle'|'seesaibling'|'namaycush'|'bachforelle'|'regenbogenforelle'|'aesche';
interface HabitatState {
  waterType: WaterType;
  selectedSpecies: SpeciesId[];
  season: Season;
  daytime: Daytime;
  maxLakeDepthM?: number;
  measuredWaterTempC?: number;
}
interface HabitatRecommendation {
  speciesId: SpeciesId;
  searchZoneIds: number[]; // nur im See
  riverMicrohabitats?: string[];
  explanation: string;
  limitations: string[];
}
```

**Schnittstelle zu Rubrik 1 «Am Wasser»:** `waterType`, `season`, `daytime`, optional `measuredWaterTempC` können gemeinsam genutzt werden. Rubrik 3 liefert `selectedSpecies` und qualitative Habitat-Empfehlungen zurück. Änderungen zwischen Rubriken müssen gegenseitig korrekt synchronisiert werden, nicht zwei widersprüchliche Statuswerte anlegen.

**Schnittstelle zu Rubrik 2 «Fliegen & Führung»:** Die Standortempfehlung kann die benötigte Präsentationstiefe beeinflussen; sie darf nicht direkt eine Köderart als einzig richtige Methode festlegen. Unterschiede zwischen klassischem Fliegenfischen und spezialisierten Seefischmethoden beachten. Bei Hecht/Zander/Felchen ist eine wirksame Befischung mit Fliegenausrüstung stark von Gerät und gesetzlich zugelassenen Methoden abhängig.

## 4. Tierschutz und Fischereirecht

- Wassertemperatur **nicht gemessen** ≠ kein Wärmeproblem. Es dürfen keine echten Ist-Werte behauptet werden.
- Bei gemessenen ca. 16–18 °C im Fluss erhöhter Vorsichtshinweis für Salmoniden; **ab 19 °C** Empfehlung, nicht auf Forelle/Äsche zu fischen (vorsichtige Wild-Trout-Trust-Praxis). Dies ist **keine gesetzliche Grenztemperatur**.
- Gewässer mit Abfluss, Schichtung oder Sauerstoffmangel können von einfachen Tiefenregeln abweichen.
- Bestand, Schonzeiten, Schutzgebiete, Fangfenster, Methoden: für jedes Gewässer und Kanton separat prüfen. Kein pauschaler schweizweiter Rechtsstatus.

## 5. Tests / Abnahme

- [x] 7 See- und 3 Flussarten vorhanden, getrennte Mehrfachauswahl.
- [x] Alle ausgewählten Arten erscheinen gleichzeitig in einem einzigen SVG.
- [x] Jahreszeit und Tageszeit verändern die Suche in nachvollziehbarer Form.
- [x] Maximal 5/8/15/25/40/60/100 m zeigt nur vorhandene Tiefenbänder; nicht geeignete tiefe Referenzzonen werden nicht erfunden.
- [x] Null-Auswahl ergibt Leerzustand und keine Fische.
- [x] Text-Erklärungen und vereinbarte sechs Tiefenstufen.
- [x] SVG-Animation mit Reduzierung bei `prefers-reduced-motion`.
- [x] Warnungen für gemessene problematische Wassertemperaturen.
- [x] JavaScript-Syntax und UI-Renderpfade (See, Fluss, Winter, flacher/tiefer See, alle Arten) lokal mit Node getestet.
- [ ] Manuelle visuelle Prüfung in Safari auf einem iPhone.
- [ ] Einbindung in die echte V4-Komponentenstruktur und Integrationstests – **erst nach GitHub-Freigabe**.
- [ ] Falls gewünscht: Abgleich mit einem konkreten See und kantonalen Fischereiregeln, separat recherchieren.

## 6. Ausgewählte Quellen

1. Eawag, «Einheimische Fische im Engadin und Puschlav unter Druck» (Lago di Poschiavo; Seesaibling 20–40 m; Forellen im Litoral): https://www.eawag.ch/de/info/portal/aktuelles/news/einheimische-fische-im-engadin-und-puschlav-unter-druck/
2. Eawag, «Stammbaum zeigt: Felchenarten in jedem See neu entstanden» (Felchen je nach Form sehr verschieden tief): https://www.eawag.ch/de/info/portal/aktuelles/news/stammbaum-zeigt-felchenarten-in-jedem-see-neu-entstanden/
3. Eawag, «Seeforellen leben riskant» (Wanderform Bach–See): https://www.eawag.ch/de/info/portal/aktuelles/news/seeforellen-leben-riskant/
4. USGS, «Seasonal habitat selection by lake trout» (Namaycush, Temperatur/Sauerstoff): https://www.usgs.gov/publications/seasonal-habitat-selection-lake-trout-salvelinus-namaycush-a-small-canadian-shield
5. USFWS, «Northern Pike (Esox lucius)» (Deckung, Vegetation und tiefere Bereiche): https://www.fws.gov/species/northern-pike-esox-lucius
6. PLOS ONE / PMC, «Piscivore-Prey Fish Interactions» (Zander und geringe Lichtintensität): https://pmc.ncbi.nlm.nih.gov/articles/PMC4224368/
7. BAFU, «Erhaltung und Förderung der Wanderfische in der Schweiz», Äsche, adulte Tiere im Talweg der Hauptströmung: https://www.bafu.admin.ch/dam/it/sd-web/APtcmpNMGd9V/wanderfische.pdf
8. Vermont Fish & Wildlife, «Rainbow Trout» (Riffles, Gumpen, Strukturen): https://www.vtfishandwildlife.com/learn-more/vermont-critters/fish/rainbow-trout
9. Victoria Fisheries Authority, «Brown Trout Habitat» (Ufer/Deckung): https://vfa.vic.gov.au/recreational-fishing/fishing-locations/inland-angling-guide/special-articles/brown-trout-habitat
10. Wild Trout Trust, «Anglers advised to protect fish health during warm weather», 25.06.2026: https://www.wildtrout.org/news/anglers-advised-to-protect-fish-health-during-warm-weather

---

**V4-Master-Storyboard:** Die vereinbarten Rubrik-3-Festlegungen (Arten, Gewässer, Mehrfachauswahl, sechs Zonen, Saisons/Tageszeit/Seetiefe) sind berücksichtigt. Die vollständige Master-Storyboard-MD-Datei war in den jetzt verfügbaren Dateien und im Repository nicht auffindbar. Vor einer Integration sollte ihre genaue aktuelle Version zusätzlich abgeglichen werden.
