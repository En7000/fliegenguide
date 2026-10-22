# FliegenGuide V4 – Rubrik 4 «Montage & Ausrüstung»
**Übergabe an den Hauptchat · 22. Oktober 2026**

## Was in diesem ZIP enthalten ist
- **`index.html`**: aktueller, eigenständiger HTML-Teststand von Rubrik 4, auch ohne Internetverbindung nutzbar. Enthält CSS, Grafiken, JavaScript und Montageberechnung in einer Datei.
- **`Fachregeln_Arbeitsfassung_V4.1.md`**: fachliche und technische Entwicklungsnotizen aus dem früheren Stand. Diese dienen als Referenz, nicht als abschliessend freigegebene Spezifikation. Bei Widersprüchen gelten die nachfolgenden **aktuellen Nutzerentscheidungen**.
- **`Hauptchat_Uebergabe.md`**: diese Integrations- und Abgrenzungsnotiz.

## Aktueller, verbindlicher Entwicklungsstand
**Rubrik 4 ist eine eigene Seite.** Keine Knoten, Knotenanimationen, Knotenlinks oder sichtbare Navigation zu Rubrik 5. Rubrik 5 «Wissen & Knoten» ist ausschliesslich im Hauptmenü separat erreichbar. **Das ZIP enthält keinerlei Knoten-Prototyp.**

Direkt auf der Seite vorhanden:
1. **Grafische Auswahl der vier Fliegenschnurtypen:** Floating, Intermediate, Sinktip und Sinking; die Karten sind anklickbar und zeigen den Schnurverlauf im Wasser.
2. **Flugschnurklasse #2–#10 (WT)** als Ausrüstungsfeld.
3. **Hakengrösse #20 bis #1 sowie 1/0 bis 4/0** als auswählbares Feld.
4. **Automatisch berechnete Montage:** Vorfachtyp, Hauptvorfachlänge in Metern, Tippetlänge in Zentimetern, X-Klasse und mm-Angabe, Gesamtlänge und typische Hakenbereiche.
5. **Montageprüfung:** hilfreiche Warnungen und optionale Überprüfung einer eigenen Montage.

**Nicht als Vorfach-Fragen anzeigen:** Rutenlänge oder Rutenklasse. Für die Vorfachlänge darf insbesondere keine starre Rutenlängenformel verwendet werden. Eine spätere separate Gerätekompatibilitätsprüfung kann diese Daten, falls andernorts vorhanden, im Hintergrund berücksichtigen.

**Nicht mehrfach abfragen:** Gewässertyp, Wassersicht/Trübung, ausgewählte Fliege, Zielfisch, ggf. Zieltiefe. Diese Werte werden in der integrierten V4 aus anderen Rubriken übernommen. Die ausklappbaren Felder «Werte für diesen Test verändern» in `index.html` sind ausschliesslich eine Standalone-Testhilfe und sollen in der integrierten App nicht als doppelte Eingaben erscheinen.

## Datenübergabe / interne Verbindung
Ein gemeinsames Datenmodell ohne sichtbare Querverweise ist vorgesehen, z. B.:

```js
const sharedContext = {
  water: { type: 'river', clarity: 'normal' },
  selectedFly: { family: 'nymph', hookSize: '#14', heavilyWeighted: false },
  targetFish: 'none',
  searchZone: { depthZone: 'unknown' },
  equipment: { lineType: 'floating', lineWT: '5', sinkRateIPS: null }
};
```

Diese Beispielnamen sind ein **Schnittstellenvorschlag**; beim Zusammenführen mit den Rubriken 1–3 zentrale Feldnamen abstimmen. Der jetzige HTML-Teststand verwendet noch `waterType`, `clarity`, `fly`, `hook`, `fish`, `line`, `lineWT` in der Funktion `readContext()` und berechnet mit `calculateRig(context)`. Bitte die Berechnungslogik nur einmal zentral integrieren statt in mehreren Rubriken zu duplizieren.

## Teststatus / Grenzen
- Standalone-HTML mit lokalem JavaScript; die Syntax wurde geprüft.
- Werte der Vorfach-/Tippetberechnung sind **Praxisausgangswerte/Heuristiken**; nicht als sichere Fangprognose oder universelle Material-/Tragkraftgarantie darstellen.
- Das Eingabefeld einer konkreten Sinkrate (IPS) ist als künftige Ergänzung vorgesehen; die aktuelle HTML-Oberfläche enthält hierfür noch kein editierbares Feld.
- Im Hauptchat die Logik der Rubriken gemeinsam abstimmen und vor einem produktiven Einsatz separat testen.
- **Keine GitHub-Änderungen, kein Deployment und keine Änderung der öffentlichen V3 ohne ausdrückliche Freigabe.**

## So im Hauptchat fortfahren
ZIP im Hauptchat hochladen und mitteilen:

> «Bitte integriere diese Rubrik 4 in die FliegenGuide V4 nach dem Master-Storyboard. Übernimm die vier grafischen Fliegenschnurtypen, Flugschnurklasse, Hakengrösse und den Montage-Rechner. Verwende die Werte aus anderen Rubriken nur im Hintergrund ohne doppelte Fragen. Keine Knoten oder Navigation zu Rubrik 5 in dieser Oberfläche. Keine GitHub-Änderungen ohne meine Freigabe.»
