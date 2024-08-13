
import styles from './BriefingText.module.scss'

const BriefingText = () => ( <div className={styles.BriefingText}>
        <h1>Briefing - Collide Jungle Institute</h1>
<p>In de schaduw van een dreiging die de toekomst van ontelbare dier- en plantensoorten verduistert, roepen wij een gloednieuwe generatie digitale pioniers en ecologische avonturiers op om zich aan te sluiten bij het CJI. Dit instituut is ons antwoord op de roep van de wildernis, een hoopvolle oase in een wereld vol uitdagingen, waar we koesteren wat de natuur ons schenkt en streven naar het behoud van haar schatten. Samen gaan we op een epische reis om de prachtige flora en fauna van de jungle te koesteren en te beschermen.</p>
<p>Met de kracht van fullstack technologieën, ontsluit je geheime toegang tot vergeten API-tools. Maar, wees gewaarschuwd, niet alle van deze digitale gereedschappen zijn even trefzeker. Samen met je moedige metgezellen, ontsluit je de poorten naar creativiteit en smeed je gloednieuwe API-tools om de onontgonnen paden van de digitale jungle te effenen, terwijl je de vergeten handleiding herschrijft en verbetert. Hier in deze spannende digitale wildernis, waar code de taal is en avontuur wacht bij elke regel, zijn jullie de moderne ontdekkingsreizigers die de digitale horizon verbreden.</p>
<h2>TL;DR</h2>
<p>In een epische zoektocht om de mensheid te redden van de dreigende afgrond, treden we in de voetsporen van digitale schatzoekers. Onze missie: vergeten tools te ontdekken, als verborgen artefacten van hoop. Deze verloren tools ontsluiten we door codering en de resultaten sturen we op, of wie weet zelfs door de lucht via postduiven.</p>
<p>Vrees niet, we sturen jullie niet onvoorbereid op deze queeste. Als geschenk uit het digitale rijk krijgen jullie een jungle handleiding, een schatkaart van kennis, om jullie bij te staan op deze avontuurlijke reis.</p>
<h2>Hoe ga je te werk?</h2>
<p>Om te beginnen, bedenk samen met je digitale avonturiers een krachtige teamnaam. Maak je team aan via onze API door je teamnaam op te sturen. Zodra dit gebeurd is, krijg je jouw unieke nummer terug.</p>
<pre><code>path: /team
method: POST
body: {'{'}&quot;name&quot;: &quot;&lt;jouw team naam&gt;&quot;{'}'}
</code></pre>
<blockquote>
<p><strong>Let op!</strong> vergeet deze zeker niet te noteren 🪶 op een stukje perkament 📜 en deel deze met niemand 🤫.</p>
</blockquote>
<h3>Queeste starten</h3>
<p>Met jouw unieke nummer kan je nu jouw queeste starten. Spreek onze API opnieuw aan en vraag om een nieuwe queeste te starten met jouw unieke nummer.</p>
<p>Wanneer je de roep van avontuur beantwoordt en je queeste begint, zal jouw dappere team als bij toverslag verschijnen op het epische dashboard van ontdekking.</p>
<pre><code>path: /quest
method: POST
query: teamId
</code></pre>
<p>Je kan altijd je <a href="https://htf.bewire.org/swagger-ui.html#/problem-controller/getQuestUsingGET">queeste opnieuw opvragen</a> met een schat aan wereldproblemen, betoverende tools en de kostbare hints die hen vergezellen. Dit kun je doen door de volgende avontuurlijke poort te openen:</p>
<pre><code>path: /problems/{'{'}teamId{'}'}
method: GET
</code></pre>
<h3>Front-end taak</h3>
<p>Jouw front-end taak is het ophalen van je queeste, deze stylen, en tonen in een pagina.</p>
<p>Van ons krijg je alvast een web component met een HTML template en de functionaliteit om je antwoord te sturen naar onze API.</p>
<p>Je bent vrij in je keuze van front-end frameworks. Wij hebben een startup project voorzien voor de 3 meest populaire frameworks.</p>
<p>Clone één van de volgende repositories.</p>
<pre><code>git clone https://github.com/CollideNV/htf-2023-angular.git
</code></pre>
<pre><code>git clone https://github.com/CollideNV/htf-2023-vue.git
</code></pre>
<pre><code>git clone https://github.com/CollideNV/htf-2023-react.git
</code></pre>
<h3>Gebruik web component</h3>
<p>De nodige setup en installatie van de web component is voorzien in de startup projecten.</p>
<p>De component heeft de HTML tag &quot;htf-2023&quot; en accepteert 2 attributen, <code>quest</code> en <code>url</code></p>
<h4>Attribuut quest</h4>
<p>Je kan je queeste als object of als JSON string meegeven.</p>
<p>Voorbeeld angular:</p>
<pre><code>&lt;htf-2023 [quest]=&quot;quest&quot;&gt;&lt;/htf-2023&gt;
</code></pre>
<p>Voorbeeld vue:</p>
<pre><code>&lt;htf-2023 .quest=&quot;quest&quot;&gt;&lt;/htf-2023&gt;
</code></pre>
<p>Voorbeeld react:</p>
<pre><code>&lt;htf-2023 quest={'{'}JSON.stringify(quest){'}'}&gt;&lt;/htf-2023&gt;
</code></pre>
<h4>Attribuut url</h4>
<p>Wanneer je een tool selecteert, verschijnt een knop met de aanduiding &quot;Use Tool&quot; . Als standaardoptie wordt naast deze knop een invoerveld weergegeven waarin je je antwoord kunt invoeren.</p>
<p>Optioneel heb je ook de mogelijkheid om de URL van je back-end door te geven. In dat geval wordt het invoerveld vervangen door een functionaliteit waarbij de component je antwoord ophaalt bij jouw back-end.</p>
<p>De component maakt een call naar:</p>
<pre><code>url: http://{'{'}url{'}'}/{'{'}toolId{'}'}
method: POST
body: ingredients
</code></pre>
<h4>Classen</h4>
<p>Je kan gebruik maken van de volgende classen om je queeste te stylen:</p>
<pre><code>problem 
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

</code></pre>
<p>Optionele classen:</p>
<pre><code>solved (van toepassing bij problem en tool) active (geselecteerde tool)

</code></pre>
<h3>Wereldproblemen</h3>
<p>Met het starten van je queeste worden 3 wereldproblemen op je afgevuurd.</p>
<p>Elk wereldprobleem heeft 3 effectieve tools waarvan je minstens 2 correct moet gebruiken om een wereldprobleem op te lossen.</p>
<h3>Tools vinden</h3>
<p>Bij elk probleem krijg je een lijst van tools die het probleem mogelijk kunnen verhelpen. Maar let op, niet elke tool is even efficiënt. Hoe efficiënter de tool, hoe moeilijker de opgave en hoe hoger de punten gaan zijn.</p>
<p>Bij elke tool krijg je de id, de uitleg wat deze doet, het recept (de opgave) en de ingrediënten (input voor de opgave).</p>
<p>Om een tool te gebruiken, gebruik je volgende endpoint met je resultaat van de opgave:</p>
<pre><code>path: /use/{'{'}toolId{'}'}
method: POST
query: ?formula=&lt;jouw oplossing&gt;
</code></pre>
<blockquote>
<p><strong>Let op!</strong> Voor sommige tools kan je maar een aantal keer de formule doorgeven voordat dit hulpmiddel stuk gaat. Je kan deze tool dan helaas <strong>niet meer gebruiken</strong>.</p>
</blockquote>
<h3>Badges &amp; Score</h3>
<p>Zodra je een tool correct hebt gebruikt, krijg je een badge voor deze tool. Je kan jouw behaalde badges bekijken per wereldprobleem op het epische dashboard van ontdekking.</p>
<p>Heb je twee tools van een wereldprobleem correct gebruikt? Dan heb je dit wereldprobleem al goed verholpen en krijg je een score! Je kan ervoor kiezen om de laatste tool te gebruiken om een hogere score of een ander wereldprobleem op te lossen. De mensheid bedankt je alvast!</p>
<h3>Queeste opgeven</h3>
<p>Mocht je problemen ondervinden met je queeste en wil je liever opnieuw beginnen. Dan kan je jouw queeste stoppen door de juiste poort op te roepen. De score van jouw succesvolle wereldproblemen blijf je behouden.</p>
<pre><code>path: /quest/{'{'}teamId{'}'}/abandon
method: POST
</code></pre>

    </div>
);

export default BriefingText;
