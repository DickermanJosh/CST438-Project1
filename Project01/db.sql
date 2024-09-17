CREATE TABLE IF NOT EXISTS user (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    team TEXT
);

CREATE TABLE IF NOT EXISTS pokemon (
    pokemonID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    picture TEXT
); 

CREATE TABLE IF NOT EXISTS UsersToPokemon (
    userID INTEGER,
    pokemonID INTEGER, 
    FOREIGN KEY (userID) REFERENCES user(userID),
    FOREIGN KEY (pokemonID) REFERENCES pokemon(pokemonID)
);