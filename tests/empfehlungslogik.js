/* FliegenGuide V4 · Rubrik 1 · Test 06
   Transparente heuristische Regelbasis. Scores ordnen Empfehlungen, sind KEINE Fangwahrscheinlichkeiten.
   Keine externen Dienste. Die Kernfunktion recommend(state) ist rein und testbar. */
'use strict';
const FAMILIES = {
  nymphe:{label:'Nymphe',short:'Unter Wasser',desc:'Kleine Nymphen oder Larven, an die Gewässerstelle angepasst.',icon:'🪰'},
  buzzer:{label:'Buzzer / Zuckmückenpuppe',short:'Langsam / schwebend',desc:'Vor allem in Seen: Zuckmückenlarven oder aufsteigende Puppen.',icon:'◌'},
  nass:{label:'Nassfliege / Soft-Hackle',short:'Subsurface',desc:'Unter der Wasseroberfläche oder im Aufstieg angeboten.',icon:'〰'},
  emerger:{label:'Emerger / Aufsteiger',short:'Oberflächenfilm',desc:'Nachahmung eines Insekts während des Aufstiegs oder Schlupfs.',icon:'✦'},
  trocken:{label:'Trockenfliege',short:'Auf Oberfläche',desc:'Schwimmende Insektenimitation bei entsprechender Nahrungsaufnahme.',icon:'◇'},
  land:{label:'Landinsekt (Ant / Beetle / Hopper)',short:'Ufernah',desc:'Ameisen, Käfer oder Heuschrecken, die ins Wasser geraten.',icon:'♧'},
  streamer:{label:'Kleiner Streamer',short:'Aktiv / Beutefisch',desc:'Kleinfisch-, Egel- oder ähnliche grössere Beuteimitation.',icon:'➤'}
};
const FAMILY_ORDER = ['nymphe','buzzer','nass','emerger','trocken','land','streamer'];
const LABELS = {
  flying:'Fliegende Insekten',floating:'Insekten auf der Oberfläche',hatch:'Sichtbarer Schlupf',terrestrial:'Landinsekten fallen hinein',larvae:'Larven/Nymphen im Wasser',bait:'Kleine Beutefische',
  none:'Keine Fischaktivität erkennbar',visible:'Fische sichtbar, kein Fressen erkennbar',rising:'Fische steigen / Ringe',surface:'Fische nehmen Oberflächeninsekten',film:'Fische fressen im Oberflächenfilm',hunt:'Fische jagen Beutefische'
};
const safeText = value => String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function recommend(state){
  const s = {...state, insects:Array.isArray(state.insects)?state.insects:[]};
  const lake = s.water==='see';
  const score = lake ? {nymphe:7,buzzer:6,nass:5,emerger:2,trocken:2,land:2,streamer:4} :
                       {nymphe:8,buzzer:0,nass:4,emerger:3,trocken:3,land:2,streamer:3};
  const why = Object.fromEntries(FAMILY_ORDER.map(k=>[k,[]]));
  function add(k,n,reason){score[k]+=n;if(reason&&!why[k].includes(reason))why[k].push(reason);}
  if(lake){
    add('nymphe',0,'Wenn kein klares Fressverhalten erkennbar ist, sind kleine Unterwasserimitationen eine sinnvolle Suchstrategie im See.');
    add('buzzer',0,'Zuckmückenpuppen sind eine verbreitete, aber nicht überall dominante Nahrungsquelle im Stillwasser.');
    add('nass',0,'Nassfliegen lassen sich langsam und suchend im See führen.');
  }else{
    add('nymphe',0,'In Fliessgewässern driftet häufig Nahrung unter Wasser.');
  }
  const fish = s.fish;
  if(fish==='rising'){add('trocken',11,'Oberflächenringe deuten auf oberflächennahes Fressen hin – die konkrete Nahrung bleibt unbekannt.');add('emerger',12,'Ringe können auch durch Aufsteiger direkt im Film entstehen.');}
  if(fish==='surface'){add('trocken',30,'Du beobachtest direkte Nahrungsaufnahme an der Oberfläche.');add('emerger',9,'Ein flach im Film hängender Emerger kann ebenfalls passen.');add('land',4,'Landinsekten kommen infrage, wenn sie tatsächlich auf dem Wasser liegen.');}
  if(fish==='film'){add('emerger',22,'Fressverhalten direkt unter dem Oberflächenfilm beobachtet.');add('nymphe',8,'Aufsteigende Nymphen können unter dem Film gefressen werden.');add('nass',4,'Weichhecheln können einen Aufstieg imitieren.');}
  if(fish==='hunt'){add('streamer',27,'Fische jagen Kleinfische oder grössere Beute.');}
  if(s.insects.includes('flying')){add('emerger',2,'Fliegende Insekten können mit Schlupf zusammenhängen; allein beweisen sie keine Oberflächenaufnahme.');add('nymphe',2,'Unter Wasser sind weiterhin Insektenstadien verfügbar.');}
  if(s.insects.includes('floating')){add('trocken',7,'Schwimmende Insekten sind als Nahrung verfügbar.');add('emerger',2,'Einige Insekten können im Film festhängen.');}
  if(s.insects.includes('hatch')){add('emerger',13,'Sichtbarer Schlupf: Aufsteiger und Tiere im Oberflächenfilm sind relevant.');add('nymphe',6,'Vor dem Schlupf steigen Insekten aus tieferen Zonen auf.');add('nass',3,'Soft-Hackles können die Aufstiegsphase darstellen.');}
  if(s.insects.includes('terrestrial')){add('land',12,'Landinsekten gelangen beobachtet ins Wasser.');add('trocken',2,'Oberflächenpräsentation wird interessanter.');}
  if(s.insects.includes('larvae')){add('nymphe',10,'Larven oder Nymphen wurden im Wasser tatsächlich gesehen.');if(lake)add('buzzer',3,'Im Stillwasser sind kleine Larven-/Puppenimitationen eine mögliche Alternative.');}
  if(s.insects.includes('bait')){add('streamer',8,'Kleine Beutefische sind vorhanden – noch kein Beweis für Jagdaktivität.');}
  if(lake){
    if(s.spot==='weed'){add('nymphe',5,'An Wasserpflanzen leben häufig wirbellose Kleintiere.');add('buzzer',2,'Puppen und Larven können entlang der Pflanzengrenze auftreten.');}
    if(s.spot==='shallow'){add('nymphe',3,'Im Flachwasser lässt sich die Uferzone mit kleinen Nymphen absuchen.');add('nass',2,'Flache Zonen können mit langsam geführten Nassfliegen abgesucht werden.');}
    if(s.spot==='drop'){add('streamer',4,'Tiefenkanten bieten einen Wechsel zwischen flachen und tieferen Bereichen.');add('nymphe',2,'Auch Nymphen entlang der Kante kommen infrage.');}
    if(s.spot==='inlet'){add('nymphe',4,'Einlaufbereiche transportieren Nahrung.');add('nass',3,'Nassfliegen sind als Suchmuster am Einlauf sinnvoll.');}
    if(s.spot==='overhang'){add('land',6,'Bewachsene Ufer können Landinsekten ins Wasser bringen.');}
    if(s.spot==='open'){add('buzzer',2,'Im freien Stillwasser können Zuckmückenpuppen eine Suchoption sein.');add('streamer',2,'Mit kleinen Streamern lässt sich Wasser aktiv absuchen.');}
    if(s.motion==='windline'){add('nass',3,'Windlinien können Nahrung an der Oberfläche konzentrieren.');add('land',3,'Verdriftete Landinsekten können in Windlinien landen.');}
  }else{
    if(s.spot==='run'){add('nymphe',5,'Rinnen und Strömungskanten transportieren Nahrung unter Wasser.');add('nass',2,'Nassfliegen lassen sich durch diese Übergänge schwingen.');}
    if(s.spot==='pool'){add('nymphe',4,'In Gumpen eine passende Tiefe und langsame Führung testen.');add('streamer',3,'Tiefere Bereiche können auch für Streamer geeignet sein.');}
    if(s.spot==='rocks'){add('nymphe',5,'Strömungsschatten hinter Steinen können Fische und driftende Nahrung zusammenführen.');}
    if(s.spot==='bank'){add('land',4,'Ufervegetation kann Landinsekten liefern.');}
    if(s.spot==='rapid'){add('nymphe',5,'Schnelle Wasserpartien erfordern kontrollierte Drift und ausreichende Lauftiefe.');}
  }
  if(s.clarity==='murky'){add('streamer',3,'Bei starker Trübung kann eine deutlichere Silhouette helfen.');add('nymphe',2,'Eine gut sichtbare oder passend beschwerte Nymphe kann sinnvoll sein.');}
  if(s.species==='aesche'){add('nymphe',5,'Äschen fressen häufig driftende wirbellose Nahrung.');add('emerger',3,'Aufsteiger können je nach Fressaktivität wichtig sein.');}
  if(s.species==='saibling'){add('nymphe',2,'Die Nahrung variiert je nach See, Standort und Bestand.');add('streamer',2,'Kleine Beutefische und Wirbellose können eine Rolle spielen.');}
  if(s.species==='barsch'){add('streamer',8,'Barsche können aktiv kleinere Fische jagen.');}
  const ranked = FAMILY_ORDER.slice().sort((a,b)=>score[b]-score[a]||FAMILY_ORDER.indexOf(a)-FAMILY_ORDER.indexOf(b));
  const temp = s.temp===''||s.temp===null||s.temp===undefined?null:Number(s.temp);
  const hasTemp = Number.isFinite(temp)&&temp>=0&&temp<=35;
  const salmonid = s.species!=='barsch';
  const danger=[];
  if(s.storm) danger.push({level:'stop',text:'Gewitter oder Blitzgefahr: Nicht fischen. Offenes Ufer und exponierte Stellen verlassen.'});
  if(!lake&&s.flood)danger.push({level:'stop',text:'Hochwasser / gefährliche Strömung: Nicht ins Wasser waten. Einen sicheren Platz wählen.'});
  if(hasTemp&&salmonid&&temp>=19)danger.push({level:'stop',text:`${temp.toLocaleString('de-CH')} °C gemessen: Auf Forellen- und Äschenfischerei besser verzichten (Fischwohl; keine pauschale Rechtsgrenze).`});
  else if(hasTemp&&salmonid&&temp>=17)danger.push({level:'caution',text:`${temp.toLocaleString('de-CH')} °C gemessen: Wärmestress bei Salmoniden möglich. Fischwohl sorgfältig beurteilen und bei Anstieg verzichten.`});
  if(!hasTemp)danger.push({level:'info',text:'Wassertemperatur nicht gemessen: Keine temperaturabhängige Einschätzung möglich.'});
  const strongObservation = ['surface','film','hunt'].includes(fish)||s.insects.includes('hatch')||s.insects.includes('larvae');
  const confidence = strongObservation?'Direkte Hinweise vorhanden':'Suchstrategie – Beobachtungen begrenzt';
  const keyZone = fish==='surface'?'Oberfläche':fish==='film'?'Oberflächenfilm':fish==='rising'?'Oberfläche / Film (noch unklar)':fish==='hunt'?'Jagdzone beobachten':'Fresszone unbekannt';
  const fishingStop = danger.some(x=>x.level==='stop');
  return {ranked,score,why,confidence,keyZone,danger,fishingStop,hasTemp,temperature:hasTemp?temp:null};
}
function familyDetail(id,s){
  const lake=s.water==='see';
  const spot=s.spot;
  const info={
    nymphe:{fly:'Kleine naturfarbene Nymphe; Grösse und Beschwerung ans beobachtete Futter anpassen (oft #12–18 als Versuch).',depth:'Unter der Oberfläche verschiedene Tiefen prüfen – keine konkrete Fresszone gemessen.',lake:'Langsam mit kurzen Zügen oder Hand-Twist führen; Pausen einbauen. In der Nähe von Pflanzen vorsichtig präsentieren.',flow:'Kontrolliert und möglichst natürlich durch die Strömung driften lassen; wenig Zug aufbauen.'},
    buzzer:{fly:'Schlanke Chironomidenpuppe, oft #12–18 als Suchmuster.',depth:'Langsam hängend oder aufsteigend – Lauftiefe muss am Wasser ermittelt werden.',lake:'Sehr langsam oder nahezu statisch anbieten; bei Wind mit Bissanzeiger ggf. natürliche Bewegung nutzen.',flow:'Buzzer sind eher eine spezielle Stillwasseroption; im Fliessgewässer zunächst Nymphen prüfen.'},
    nass:{fly:'Soft-Hackle oder kleine Nassfliege, oft #12–16 als Suchmuster.',depth:'Knapp bis deutlich unter der Oberfläche, je nach Schnur und Fischaktivität.',lake:'Langsame, gleichmässige Züge und Pausen; in ufernahen Bereichen beginnen.',flow:'Schräg stromab anbieten und kontrolliert schwingen lassen, ohne unnatürlich zu beschleunigen.'},
    emerger:{fly:'Emerger, aufsteigende Nymphe oder CDC-Aufsteiger passend zu den Insekten (oft #14–18).',depth:'Im Oberflächenfilm oder unmittelbar darunter.',lake:'Sehr ruhig treiben oder minimal bewegen; lokale leichte Oberflächenströmungen nutzen.',flow:'Dragfreie Drift im Oberflächenfilm; Schnurbogen korrigieren.'},
    trocken:{fly:'Trockenfliege passend zur Grösse, Silhouette und Farbe der treibenden Insekten.',depth:'Auf der Wasseroberfläche.',lake:'Sanft ablegen und ruhen lassen; bei Wind kontrollierte kurze Bewegung möglich.',flow:'Ohne unnatürlichen Schnurzug mit der Strömung treiben lassen.'},
    land:{fly:'Ameisen-, Käfer- oder Hopper-Imitation, Grösse dem tatsächlich sichtbaren Insekt anpassen.',depth:'Auf / unmittelbar im Oberflächenfilm, besonders ufernah.',lake:'Gezielt an Vegetation, ins Wasser gefallene Insekten oder Windlinien präsentieren; kurze Pausen.',flow:'Nahe bewachsene Ufer werfen und möglichst natürlich abtreiben lassen.'},
    streamer:{fly:'Kleiner Woolly Bugger, Egel- oder Kleinfisch-Streamer; Grösse und Farbe dem Futter anpassen.',depth:'Im vermuteten Jagdbereich; bei unbekannter Zone schrittweise verschiedene Tiefen absuchen.',lake:'Variierende Züge mit Pausen. Zunächst ruhig, nur bei Reaktion aktiver führen.',flow:'Gezielt an Kanten/Strömungsschatten führen oder kontrolliert schwingen lassen.'}
  }[id];
  let place='';
  if(spot==='unknown')place=lake?'Erst Uferkanten, sichtbare Strukturen und Übergänge absuchen.':'Zuerst Rinnen, Kanten und Strömungsschatten prüfen.';
  else if(lake){place=({shallow:'Flache Uferzone als ersten Suchbereich wählen.',weed:'Krautkante ohne Hänger und unnötiges Aufscheuchen absuchen.',drop:'Flache und tiefere Seite der Kante nacheinander versuchen.',inlet:'Einlauf mit sicherem Abstand und dessen Randbereiche beangeln.',overhang:'Vegetationsnahe Oberfläche und Uferkante prüfen.',open:'Offenes Wasser in verschiedenen Wurfweiten und Tiefen systematisch absuchen.'})[spot];}
  else {place=({run:'Rinne und ihre seitliche Strömungskante kontrolliert abfischen.',pool:'Gumpen von Rand nach Zentrum und in passenden Tiefen untersuchen.',rocks:'Strömungsschatten hinter Steinen nutzen.',bank:'Bewachsenen Ufersaum prüfen.',rapid:'Schnelle Rinne mit sicherem Stand und kontrollierter Drift absuchen.'})[spot];}
  if(s.motion==='windline'&&lake)place+=' Wind- oder Schaumlinie beobachten, wo sicher erreichbar.';
  return {...info,method:lake?info.lake:info.flow,place};
}
function tackleFor(id,s){
  const line=s.line;
  if(line==='unknown')return {status:'unknown',title:'Fliegenschnur noch nicht angegeben',desc:'Fliegenfamilie und Führung sind bereits vorgeschlagen. Für ein passendes Vorfach bitte zuerst die vorhandene Fliegenschnur wählen.'};
  const surfaceFly = ['trocken','land','emerger'].includes(id);
  const sinkingLine = ['intermediate','sinktip','sinking'].includes(line);
  const mismatched = surfaceFly&&sinkingLine;
  const rec = {
    trocken:{leader:'Konisch verjüngtes Monovorfach ca. 2,1–2,7 m + Tippet ca. 0,6–0,9 m',tip:'Als Startversuch 0,12–0,16 mm; an Fisch, Fliege und Tragkraft anpassen',hook:'Feine Trockenfliege mit passend kleinem Haken'},
    land:{leader:'Konisch verjüngtes Monovorfach ca. 2,1–2,7 m + Tippet ca. 0,5–0,9 m',tip:'Als Startversuch 0,14–0,18 mm, grössere Hopper ggf. kräftiger',hook:'Grösse nach Ameise/Käfer/Hopper'},
    emerger:{leader:'Monovorfach ca. 2,1–2,7 m + Tippet ca. 0,6–0,9 m',tip:'Als Startversuch 0,12–0,16 mm',hook:'Kleines, zum Insekt passendes Muster'},
    nymphe:{leader:sinkingLine?'Kurzes Mono-/Fluorovorfach, oft ca. 1,2–2,1 m':'Konisches Vorfach ca. 2,1–2,7 m + Tippet ca. 0,5–1,0 m',tip:'Als Startversuch 0,14–0,18 mm; Tragkraft an Zielfisch anpassen',hook:'Beschwerung nur so stark wie nötig'},
    buzzer:{leader:sinkingLine?'Bei sinkender Schnur kurzes Fluorovorfach, oft ca. 1,2–2,1 m':'Beim Stillwasser-Indicator oder langsamen Einholen: Vorfachlänge abhängig von gewünschter Tiefe; nicht pauschal festlegen',tip:'Feines Tippet, häufig ca. 0,12–0,16 mm, zur Fischgrösse passend',hook:'Schlanke Puppe, Gewicht und Tiefe aufeinander abstimmen'},
    nass:{leader:sinkingLine?'Mono-/Fluorovorfach ca. 1,2–2,1 m':'Monovorfach ca. 2,1–2,7 m + Tippet ca. 0,5–0,9 m',tip:'Als Startversuch 0,14–0,18 mm',hook:'Nassfliege / Soft-Hackle passend zur Beute'},
    streamer:{leader:sinkingLine?'Relativ kurzes kräftiges Mono-/Fluorovorfach, oft ca. 0,9–1,5 m':'Kräftiges Mono-/Fluorovorfach, oft ca. 1,5–2,4 m',tip:'Als Startversuch ca. 0,20–0,25 mm; Zielfisch, Hindernisse und Fliegengrösse beachten',hook:'Klein beginnen; Wurfgewicht auf Ausrüstung abstimmen'}
  }[id];
  const lineLabel={floating:'Floating (Schwimmschnur)',intermediate:'Intermediate (langsam sinkend)',sinktip:'Sink-Tip (sinkende Spitze)',sinking:'Sinking (vollständig sinkend)'}[line];
  let note=sinkingLine?'Die Sinkrate ist modellabhängig. Tiefe nicht allein aus cm/s ableiten – Widerstand, Einholtempo und Vorfach beeinflussen die tatsächliche Lauftiefe.':'Floating hält die Hauptschnur oben; die Lauftiefe der Fliege hängt weiterhin von Vorfach, Gewicht und Führung ab.';
  if(s.sinkRate&&sinkingLine)note+=' Angegebene Sinkrate: '+String(s.sinkRate).replace('.',',')+' cm/s (Herstellerangabe, keine Tiefengarantie).';
  return {status:mismatched?'conflict':'ok',title:lineLabel,...rec,note,conflict:mismatched?'Für eine natürliche Oberflächen-/Filmpräsentation ist Floating meist geeigneter. Deine ausgewählte sinkende Schnur ist dafür nicht ideal. Die biologisch passende Fliege bleibt eine Empfehlung; für die vorhandene Schnur wird unten eine Alternative gezeigt.':null};
}
function nextTrial(s,id){const lake=s.water==='see';return [
   {title:'1 · Tiefe / Angelplatz',text:lake?'Wenn kein Biss kommt: eine andere kontrollierbare Tiefe oder eine nahe Struktur prüfen. Nicht behaupten, die Fischzone zu kennen.':'Drift entlang einer anderen Strömungskante oder in einer passenden Rinne prüfen. Wassertiefe vorsichtig variieren.'},
   {title:'2 · Führung',text:lake?'Tempo verlangsamen, Pausen einbauen und einen ruhigen Hand-Twist versuchen. Bei Buzzer fast statisch.':'Schnurzug reduzieren, natürliche Drift kontrollieren; bei Nassfliege oder Streamer die Schwinggeschwindigkeit variieren.'},
   {title:'3 · Muster',text:`Erst wenn Tiefe, Ort und Führung plausibel sind: Grösse, Silhouette oder die Fliegenfamilie verändern. Aktuell: ${FAMILIES[id].label}.`}
 ];}
if(typeof module!=='undefined'&&module.exports){module.exports={recommend,familyDetail,tackleFor,nextTrial,FAMILIES};}
