# Briefing - Collide Jungle Institute

In de schaduw van een dreiging die de toekomst van ontelbare dier- en plantensoorten verduistert, roepen wij een gloednieuwe generatie digitale pioniers en ecologische avonturiers op om zich aan te sluiten bij het CJI. Dit instituut is ons antwoord op de roep van de wildernis, een hoopvolle oase in een wereld vol uitdagingen, waar we koesteren wat de natuur ons schenkt en streven naar het behoud van haar schatten. Samen gaan we op een epische reis om de prachtige flora en fauna van de jungle te koesteren en te beschermen.

Met de kracht van fullstack technologieën, ontsluit je geheime toegang tot vergeten API-tools. Maar, wees gewaarschuwd, niet alle van deze digitale gereedschappen zijn even trefzeker. Samen met je moedige metgezellen, ontsluit je de poorten naar creativiteit en smeed je gloednieuwe API-tools om de onontgonnen paden van de digitale jungle te effenen, terwijl je de vergeten handleiding herschrijft en verbetert. Hier in deze spannende digitale wildernis, waar code de taal is en avontuur wacht bij elke regel, zijn jullie de moderne ontdekkingsreizigers die de digitale horizon verbreden.


## TL;DR

In een epische zoektocht om de mensheid te redden van de dreigende afgrond, treden we in de voetsporen van digitale schatzoekers. Onze missie: vergeten tools te ontdekken, als verborgen artefacten van hoop. Deze verloren tools ontsluiten we door codering en de resultaten sturen we op, of wie weet zelfs door de lucht via postduiven.

Vrees niet, we sturen jullie niet onvoorbereid op deze queeste. Als geschenk uit het digitale rijk krijgen jullie een jungle handleiding, een schatkaart van kennis, om jullie bij te staan op deze avontuurlijke reis.


## Hoe ga je te werk?

Om te beginnen, bedenk samen met je digitale avonturiers een krachtige teamnaam. Maak je team aan via onze API door je teamnaam op te sturen. Zodra dit gebeurd is, krijg je jouw unieke nummer terug.


```
path: /team
method: POST
body: {"name": "<jouw team naam>"}
```

> **Let op!** vergeet deze zeker niet te noteren 🪶 op een stukje perkament 📜 en deel deze met niemand 🤫.

### Queeste starten

Met jouw unieke nummer kan je nu jouw queeste starten. Spreek onze API opnieuw aan en vraag om een nieuwe queeste te starten met jouw unieke nummer.

Wanneer je de roep van avontuur beantwoordt en je queeste begint, zal jouw dappere team als bij toverslag verschijnen op het epische dashboard van ontdekking.

```
path: /quest
method: POST
query: teamId
```

Je kan altijd je [queeste opnieuw opvragen](https://htf.bewire.org/swagger-ui.html#/problem-controller/getQuestUsingGET) met een schat aan wereldproblemen, betoverende tools en de kostbare hints die hen vergezellen. Dit kun je doen door de volgende avontuurlijke poort te openen:

```
path: /problems/{teamId}
method: GET
```

### Front-end taak

Jouw front-end taak is het ophalen van je queeste, deze stylen, en tonen in een pagina.

Van ons krijg je alvast een web component met een HTML template en de functionaliteit om je antwoord te sturen naar onze API.

Je bent vrij in je keuze van front-end frameworks. Wij hebben een startup project voorzien voor de 3 meest populaire frameworks.

Clone één van de volgende repositories.


```
git clone https://github.com/CollideNV/htf-2023-angular.git
```
```
git clone https://github.com/CollideNV/htf-2023-vue.git
```
```
git clone https://github.com/CollideNV/htf-2023-react.git
```

### Gebruik web component

De nodige setup en installatie van de web component is voorzien in de startup projecten.

De component heeft de HTML tag "htf-2023" en accepteert 2 attributen, `quest` en `url`

#### Attribuut quest

Je kan je queeste als object of als JSON string meegeven.

Voorbeeld angular:
```
<htf-2023 [quest]="quest"></htf-2023>
```
Voorbeeld vue:
```
<htf-2023 .quest="quest"></htf-2023>
```
Voorbeeld react:
```
<htf-2023 quest={JSON.stringify(quest)}></htf-2023>
```

#### Attribuut url

Wanneer je een tool selecteert, verschijnt een knop met de aanduiding "Use Tool" . Als standaardoptie wordt naast deze knop een invoerveld weergegeven waarin je je antwoord kunt invoeren.


Optioneel heb je ook de mogelijkheid om de URL van je back-end door te geven. In dat geval wordt het invoerveld vervangen door een functionaliteit waarbij de component je antwoord ophaalt bij jouw back-end.

De component maakt een call naar:

```
url: http://{url}/{toolId}
method: POST
body: ingredients
```

#### Classen

Je kan gebruik maken van de volgende classen om je queeste te stylen:

```
problem 
problem-name 
description 
tool 
tool-name 
effect 
challenge 
recipe 
ingredients 
remainingAttempts 
difficulty

```

Optionele classen:

```
solved (van toepassing bij problem en tool) active (geselecteerde tool)

```

### Wereldproblemen

Met het starten van je queeste worden 3 wereldproblemen op je afgevuurd.

Elk wereldprobleem heeft 3 effectieve tools waarvan je minstens 2 correct moet gebruiken om een wereldprobleem op te lossen.

### Tools vinden

Bij elk probleem krijg je een lijst van tools die het probleem mogelijk kunnen verhelpen. Maar let op, niet elke tool is even efficiënt. Hoe efficiënter de tool, hoe moeilijker de opgave en hoe hoger de punten gaan zijn.

Bij elke tool krijg je de id, de uitleg wat deze doet, het recept (de opgave) en de ingrediënten (input voor de opgave).

Om een tool te gebruiken, gebruik je volgende endpoint met je resultaat van de opgave:

```
path: /use/{toolId}
method: POST
query: ?formula=<jouw oplossing>
```

> **Let op!** Voor sommige tools kan je maar een aantal keer de formule doorgeven voordat dit hulpmiddel stuk gaat. Je kan deze tool dan helaas **niet meer gebruiken**.
>

### Badges & Score

Zodra je een tool correct hebt gebruikt, krijg je een badge voor deze tool. Je kan jouw behaalde badges bekijken per wereldprobleem op het epische dashboard van ontdekking.

Heb je twee tools van een wereldprobleem correct gebruikt? Dan heb je dit wereldprobleem al goed verholpen en krijg je een score! Je kan ervoor kiezen om de laatste tool te gebruiken om een hogere score of een ander wereldprobleem op te lossen. De mensheid bedankt je alvast!

### Queeste opgeven

Mocht je problemen ondervinden met je queeste en wil je liever opnieuw beginnen. Dan kan je jouw queeste stoppen door de juiste poort op te roepen. De score van jouw succesvolle wereldproblemen blijf je behouden.

```
path: /quest/{teamId}/abandon
method: POST
```
