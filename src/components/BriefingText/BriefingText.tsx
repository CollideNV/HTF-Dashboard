
import styles from './BriefingText.module.scss'

const BriefingText = () => ( <div className={styles.BriefingText}>
        <h1>🌌 Collide Space Center 🌌</h1>
<p>Welkom bij het Collide Space Center! Dit project roept een nieuwe generatie van digitale pioniers en kosmische avonturiers op om de mysteries van het universum te ontsluieren en de grenzen van technologie te verleggen. Samen ontwikkelen we nieuwe technologieën en tools om de uitdagingen van de ruimte te overwinnen.</p>
<h2>🌠 Over het Project</h2>
<p>In dit project werk je samen met je team om vergeten ruimte-tools te ontdekken en wereldproblemen op te lossen. Jullie verkennen de uitgestrekte paden van de kosmos door middel van geavanceerde technologieën, en ontwikkelen nieuwe tools en verbeteringen die de toekomst van ruimteverkenning vormgeven.</p>
<h3>Doelstellingen</h3>
<ul>
<li>Ontdek en gebruik vergeten ruimte-tools om kosmische problemen op te lossen.</li>
<li>Ontwikkel nieuwe technologieën door gebruik te maken van moderne fullstack-technologieën.</li>
<li>Werk samen met je team om de beste oplossingen te vinden en badges en punten te verdienen.</li>
</ul>
<h2>🛠️ Installatie</h2>
<p>Volg de onderstaande stappen om het project lokaal op je machine te installeren:</p>
<ol>
<li>
<p><strong>Clone de repository</strong>:</p>
<pre><code className="language-bash">git clone https://github.com/CollideNV/htf-2024-angular.git
git clone https://github.com/CollideNV/htf-2024-vue.git
git clone https://github.com/CollideNV/htf-2024-react.git
</code></pre>
</li>
<li>
<p><strong>Navigeer naar de gewenste projectmap</strong>:</p>
<pre><code className="language-bash">cd htf-2024-angular  # of htf-2024-vue of htf-2024-react
</code></pre>
</li>
<li>
<p><strong>Installeer de afhankelijkheden</strong>:</p>
<pre><code className="language-bash">npm install
</code></pre>
</li>
<li>
<p><strong>Start de applicatie</strong>:</p>
<pre><code className="language-bash">npm start
</code></pre>
</li>
</ol>
<p>Je applicatie zou nu lokaal moeten draaien!</p>
<h2>🚀 Hoe te Gebruiken</h2>
<ol>
<li>
<p><strong>Maak een team aan</strong>: Bedenk samen met je team een naam en stuur deze via onze API om je team aan te maken. Vergeet niet je unieke team-ID te noteren!</p>
<pre><code className="language-bash">POST /team
Body: {'{'}&quot;name&quot;: &quot;&lt;jouw team naam&gt;&quot;{'}'}
</code></pre>
</li>
<li>
<p><strong>Start je quest</strong>: Gebruik je unieke team-ID om een nieuwe quest te starten.</p>
<pre><code className="language-bash">POST /quest
Query: teamId=&lt;jouw team ID&gt;
</code></pre>
</li>
<li>
<p><strong>Gebruik tools en los problemen op</strong>: Verken de problemen en gebruik de juiste tools om ze op te lossen. Let op de efficiëntie van elke tool en werk samen met je team om de beste resultaten te behalen.</p>
<pre><code className="language-bash">GET /quest/{'{'}teamId{'}'}
POST /use/{'{'}toolId{'}'}?formula=&lt;jouw oplossing&gt;
</code></pre>
</li>
<li>
<p><strong>Bekijk je voortgang en verdien badges</strong>: Behaal badges en verbeter je score door problemen op te lossen en tools efficiënt te gebruiken.</p>
</li>
</ol>
<h2>🌌 API Endpoints</h2>
<p>Hier zijn de belangrijkste API endpoints die je nodig hebt om deel te nemen aan de quest:</p>
<ul>
<li>
<p><strong>Team Aanmaken</strong>:</p>
<pre><code className="language-http">POST /team
Body: {'{'}&quot;name&quot;: &quot;&lt;jouw team naam&gt;&quot;{'}'}
</code></pre>
</li>
<li>
<p><strong>Quest Starten</strong>:</p>
<pre><code className="language-http">POST /quest
Query: teamId=&lt;jouw team ID&gt;
</code></pre>
</li>
<li>
<p><strong>Quest Opvragen</strong>:</p>
<pre><code className="language-http">GET /quest/{'{'}teamId{'}'}
</code></pre>
</li>
<li>
<p><strong>Tool Gebruiken</strong>:</p>
<pre><code className="language-http">POST /use/{'{'}toolId{'}'}?formula=&lt;jouw oplossing&gt;
</code></pre>
</li>
<li>
<p><strong>quest Opgeven</strong>:</p>
<pre><code className="language-http">POST /quest/{'{'}teamId{'}'}/abandon
</code></pre>
</li>
</ul>
<h2>🤝 Bijdragen</h2>
<p>Bijdragen aan dit project zijn altijd welkom! Voel je vrij om een pull request in te dienen of een issue te openen om suggesties voor verbeteringen te bespreken.</p>
<ol>
<li>Fork de repository</li>
<li>Maak een nieuwe branch (<code>git checkout -b feature-branch</code>)</li>
<li>Commit je wijzigingen (<code>git commit -m 'Add a new feature'</code>)</li>
<li>Push naar de branch (<code>git push origin feature-branch</code>)</li>
<li>Open een Pull Request</li>
</ol>
<p>Bedankt voor het deelnemen aan het avontuur met het Collide Space Center! Heel veel succes!🌠🛠️</p>

    </div>
);

export default BriefingText;
