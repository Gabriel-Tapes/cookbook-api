CREATE TABLE IF NOT EXISTS Recipes (
    ID UUID NOT NULL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    ingredients VARCHAR(5000)[] NOT NULL,
    HowToPrepare VARCHAR(5000) NOT NULL
)