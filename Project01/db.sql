CREATE TABLE IF NOT EXISTS Users (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    team TEXT
);

CREATE TABLE IF NOT EXISTS Pokemon (
    pokemonID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    picture TEXT
); 

CREATE TABLE IF NOT EXISTS UsersToPokemon (
    userID INTEGER,
    pokemonID INTEGER, 
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (pokemonID) REFERENCES Pokemon(pokemonID)
);