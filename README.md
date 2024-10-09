
# 🌌 Collide Space Center 🌌

Welkom bij het Collide Space Center! Dit project roept een nieuwe generatie van digitale pioniers en kosmische avonturiers op om de mysteries van het universum te ontsluieren en de grenzen van technologie te verleggen. Samen ontwikkelen we nieuwe technologieën en tools om de uitdagingen van de ruimte te overwinnen.

## 🌠 Over het Project

In dit project werk je samen met je team om vergeten ruimte-tools te ontdekken en wereldproblemen op te lossen. Jullie verkennen de uitgestrekte paden van de kosmos door middel van geavanceerde technologieën, en ontwikkelen nieuwe tools en verbeteringen die de toekomst van ruimteverkenning vormgeven.

### Doelstellingen

- Ontdek en gebruik vergeten ruimte-tools om kosmische problemen op te lossen.
- Ontwikkel nieuwe technologieën door gebruik te maken van moderne fullstack-technologieën.
- Werk samen met je team om de beste oplossingen te vinden en badges en punten te verdienen.

## 🛠️ Installatie

Volg de onderstaande stappen om het project lokaal op je machine te installeren:

1. **Clone de repository**:

    ```bash
    git clone https://github.com/CollideNV/htf-2024-angular.git
    git clone https://github.com/CollideNV/htf-2024-vue.git
    git clone https://github.com/CollideNV/htf-2024-react.git
    ```

2. **Navigeer naar de gewenste projectmap**:

    ```bash
    cd htf-2024-angular  # of htf-2024-vue of htf-2024-react
    ```

3. **Installeer de afhankelijkheden**:

    ```bash
    npm install
    ```

4. **Start de applicatie**:

    ```bash
    npm start
    ```

Je applicatie zou nu lokaal moeten draaien!

## 🚀 Hoe te Gebruiken

1. **Maak een team aan**: Bedenk samen met je team een naam en stuur deze via onze API om je team aan te maken. Vergeet niet je unieke team-ID te noteren!

    ```bash
    POST /team
    Body: {"name": "<jouw team naam>"}
    ```

2. **Start je queeste**: Gebruik je unieke team-ID om een nieuwe queeste te starten.

    ```bash
    POST /quest
    Query: teamId=<jouw team ID>
    ```

3. **Gebruik tools en los problemen op**: Verken de problemen en gebruik de juiste tools om ze op te lossen. Let op de efficiëntie van elke tool en werk samen met je team om de beste resultaten te behalen.

    ```bash
    GET /problems/{teamId}
    POST /use/{toolId}?formula=<jouw oplossing>
    ```

4. **Bekijk je voortgang en verdien badges**: Behaal badges en verbeter je score door problemen op te lossen en tools efficiënt te gebruiken.

## 🌌 API Endpoints

Hier zijn de belangrijkste API endpoints die je nodig hebt om deel te nemen aan de queeste:

- **Team Aanmaken**:
  
  ```http
  POST /team
  Body: {"name": "<jouw team naam>"}
  ```

- **Queeste Starten**:

  ```http
  POST /quest
  Query: teamId=<jouw team ID>
  ```

- **Problemen Opvragen**:

  ```http
  GET /problems/{teamId}
  ```

- **Tool Gebruiken**:

  ```http
  POST /use/{toolId}?formula=<jouw oplossing>
  ```

- **Queeste Opgeven**:

  ```http
  POST /quest/{teamId}/abandon
  ```

## 🤝 Bijdragen

Bijdragen aan dit project zijn altijd welkom! Voel je vrij om een pull request in te dienen of een issue te openen om suggesties voor verbeteringen te bespreken.

1. Fork de repository
2. Maak een nieuwe branch (`git checkout -b feature-branch`)
3. Commit je wijzigingen (`git commit -m 'Add a new feature'`)
4. Push naar de branch (`git push origin feature-branch`)
5. Open een Pull Request

Bedankt voor het deelnemen aan het avontuur met het Collide Space Center! 🌠🛠️
