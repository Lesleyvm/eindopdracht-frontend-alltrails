# AllTrails; The hiking app for you.

## Inleiding 
Zelf houdt ik er van om te wandelen met de hond en nieuwe (losloop)gebieden te ontdekken in de natuur. Ik vind het echter altijd lastig om nieuwe plekken te vinden en ben erg veel tijd kwijt aan het zoeken op Google of gewoon maar rond rijden, hopen dat ik vanzelf iets tegen kom. Met dit probleem in gedachte heb ik AllTrails ontwikkelt. De applicatie die het mogelijk maakt om gemakkelijk mooie nieuwe plekken in de natuur de ontdekken. De applicatie is ontwikkeld als eindopdracht voor de Frontend Leerlijn, op NOVI Hogeschool.

![screenshot](src/assets/Screenshot-home.png)

## Applicatie starten
Om te beginnen clone je het project vanuit Git naar jouw lokale machine (een IDE naar keuze). Let goed op dat je bij het kopiëren van de link voor "SSH" kiest. 

Het eerste wat je doet is de packages die je nodig hebt uit de  `node_modules` installeren. Dit kun je doen met het volgende commando:

```shell
npm install
```

Zodra je dit gedaan hebt kun je beginnen met het runnen van de applicatie met behulp van het volgende commando: 

```shell
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) om de pagina in de browser te kunnen bekijken. Elke keer als je het bestand op slaat kun je de wijzingen hier terug zien. Gebruik de DevTools in je browser om jouw code te debuggen en belangrijke metadata op te halen.

## Overige commando's
Om verder te kunnen werken aan dit project is het belangrijk dat je eerst de huidige repository loskoppelt. Dit doe je met het volgende commando:

```shell
git remote remove origin
```
Vervolgens kun je op Git zelf een nieuwe respository aanmaken, en deze koppelen aan jouw project. Werk je met meerdere mensen aan hetzelfde project? Dan is het verstandig om op een feature branch te werken. Deze kun je aanmaken met het volgende commando:

```shell
git checkout -b name-of-branch
```
**Overige commando's die je veel zult gebruiken:**

* `git add .` om alle wijzigen te stagen.
* `git status` om de status van gestagede bestanden te zien.
* `git commit -m "description"` om alle wijzigingen te committen en klaar te zetten voor de push.
* `git log` om te zien welke commits er klaar staan voor de push.
* `git push origin name-of-branch` om wijzigingen naar Git te pushen als je op een feature branch werkt.
* `git push origin main` om wijzigingen naar Git te pushen als je op de main branch werkt.

> **Tip van Flip:**
Ben je jouw project aan het runnen en wil je Git commando's uitvoeren? Voer dan eerst de letter "Q" in de terminal om te stoppen met het runnen van de applicatie.

## Benodigheden

Voor deze applicatie is er gebruik gemaakt van NOVI-backend om het inloggen en registreren af te handelen. De documentatie daarvoor kun je [hier](https://github.com/hogeschoolnovi/novi-educational-backend-documentation/blob/main/README.md#0-test) terug vinden. Wat verder belangrijk is voor het runnen van de applicatie, is de API. Deze is namelijk nodig om de data over de parken op te kunnen halen doormiddel van netwerk requests.

  * De documentatie van de NPS API kun je [hier](https://www.nps.gov/subjects/developer/api-documentation.htm#/activities/parks) terug vinden. 
  * De data van de API kan niet opgehaald worden zonder een persoonlijke key. Deze key staat voor de veiligheid in een apart bestand, en deze wordt tijdens het pushen naar Git in gitignore geplaatst en hierdoor niet meegenomen. Het is dus van belang dat je zelf éénmalig een nieuw `.env` bestand aanmaakt in de root van jouw React project map. 
  * In dit bestand plaats je de volgende tekst: `VITE_NPS_API_KEY=hJ99K6po1RrlxynLK8tgQ4tzpR9quS7UQcOanoFX`

Tot slot kun je de link naar de Github Repository [hier](https://github.com/Lesleyvm/eindopdracht-frontend-alltrails) vinden.

Je bent er inmiddels helemaal klaar voor, so _let's get started!_  😉