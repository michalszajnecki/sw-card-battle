# Star Wars - Battle Cards

## Development / Tests

To start developing application locally, you should create Firebase Project.

1. Run `npm i`
2. Create `.env` file with Firebase credencials
3. Run `npm run dev`

## Tests

Project contains unit tests and e2e, made with default Nuxt testing library - `@nuxt/test-utils`. For unit test I coose `vitest` and for e2e `playwright`

- Unit tests can be run with `npm run test`
- e2e tests can be run with `npm run e2e`


## Game modes

### Single Player Mode

Play locally, and save you win-lose progress in Firebase DB. You will be given 5 random cards from resource type that you selected before entering game room. You can leave game after each round, or stay till the end testing your luck wich ever decrasing number of avaiable cards.

### Multiplayer Mode

Host or Join multiplayer game room, and fight with logged in players. Each player will get deck of 5 random cards from resource type selected by room host. After each battle you will see result screen with current battle score. When you will spend all cards, you can go back to lobby and start again.

To host multiplayer battle, click "HOST MULTIPLAYER GAME" button, choose resource type, and wait for player to join your game room.

## User Stats

You can access your current stats using topbar menu button "OPEN USER STATS". Modal will present your win-lose ratio calculated as percent.

## Cards

Right now cards, are kept inside JSON's in tools folder. Later on, we can move data to separate collection in database, to give Game Administrators ability to add, remove, and modify cards.

Developers can use swapi-tech-scraper.js to scrape new data from swapi. Scrapper will try to download data from API, and proceed to generate common card object. 

```
description: string;
uid: string;
attack: number;
name: string;
```

## Routes

### Public

- `index` - Landing page for game. Contains legal notice, welcome paragraph and CTA button
- `login` - Login/signup page, where users can create new account, or log to existing one

### Private

- `game/lobby` - Lobby page, where users can create game rooms, join already created games or start singleplayer game
- `game/singlePlayerRoom` - Special version of game room where current user will play against computer enemy. 
- `game/[gameRooomId]` - Game room, where `gameRoomId` is a uid of game host.

