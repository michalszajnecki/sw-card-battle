# Star Wars - Battle Cards

## Development / Tests

To start developing the application locally, you should create a Firebase Project.

1. Run `npm i`
2. Create a `.env` file with Firebase credentials
3. Run `npm run dev`

## Tests

The project contains unit tests and e2e tests, made with the default Nuxt testing library - `@nuxt/test-utils`. For unit tests, I chose `vitest`, and for e2e tests, `playwright`.

- Unit tests can be run with `npm run test`
- e2e tests can be run with `npm run e2e`

## Game Modes

### Single Player Mode

Play locally and save your win-lose progress in Firebase DB. You will be given 5 random cards from the resource type that you selected before entering the game room. You can leave the game after each round or stay till the end testing your luck with an ever-decreasing number of available cards.

### Multiplayer Mode

Host or Join a multiplayer game room and fight with logged-in players. Each player will get a deck of 5 random cards from the resource type selected by the room host. After each battle, you will see a result screen with the current battle score. When you spend all cards, you can go back to the lobby and start again.

To host a multiplayer battle, click the "HOST MULTIPLAYER GAME" button, choose the resource type, and wait for players to join your game room.

## User Stats

You can access your current stats using the top bar menu button "OPEN USER STATS". The modal will present your win-lose ratio calculated as a percent.

## Cards

Right now, cards are kept inside JSON files in the tools folder. Later on, we can move the data to a separate collection in the database to give Game Administrators the ability to add, remove, and modify cards.

Developers can use `swapi-tech-scraper.js` to scrape new data from SWAPI. The scraper will try to download data from the API and proceed to generate a common card object.



```
description: string;
uid: string;
attack: number;
name: string;
```
## Routes

### Public

- `index` - Landing page for the game. Contains legal notice, welcome paragraph, and CTA button.
- `login` - Login/signup page, where users can create a new account or log into an existing one.

### Private

- `game/lobby` - Lobby page, where users can create game rooms, join already created games, or start a single-player game.
- `game/singlePlayerRoom` - Special version of the game room where the current user will play against a computer enemy.
- `game/[gameRoomId]` - Game room, where `gameRoomId` is a uid of the game host.

