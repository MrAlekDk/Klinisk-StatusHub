CREATE TABLE IF NOT EXISTS organisations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        last_login DATETIME,
        organisation_id INTEGER NOT NULL,
        FOREIGN KEY (organisation_id) REFERENCES organisations(id)
    );

CREATE TABLE IF NOT EXISTS systems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        organisation_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        link TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (organisation_id) REFERENCES organisations(id)
    );

CREATE TABLE IF NOT EXISTS system_statuses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        system_id INTEGER NOT NULL,
        status TEXT NOT NULL,
        checked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        message TEXT,
        FOREIGN KEY (system_id) REFERENCES systems(id)
    );

CREATE TABLE IF NOT EXISTS contingency_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        system_id INTEGER NOT NULL UNIQUE,
        content TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (system_id) REFERENCES systems(id)
    );

CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        system_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        FOREIGN KEY (system_id) REFERENCES systems(id)
    );