CREATE TABLE IF NOT EXISTS Users (
    ID UUID NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    AccessLevel VARCHAR(6) NOT NULL
)