CREATE TABLE companies
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    login      VARCHAR(50) UNIQUE NOT NULL,
    password   VARCHAR(100)       NOT NULL,
    full_name  VARCHAR(100)       NOT NULL,
    company_id INTEGER REFERENCES companies (id) default null,
    role       VARCHAR(20)        NOT NULL
);


CREATE TABLE tasks
(
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(100)                      NOT NULL,
    description TEXT                              NOT NULL,
    company_id  INTEGER REFERENCES companies (id) NOT NULL,
    parent_id   INTEGER REFERENCES tasks (id) default null,
    day         INT CHECK (day > 0)               NOT NULL
);

CREATE TABLE user_tasks
(
    id           SERIAL PRIMARY KEY,
    user_id      INTEGER REFERENCES users (id) NOT NULL,
    task_id      INTEGER REFERENCES tasks (id) NOT NULL,
    start_at     VARCHAR(64)                   NOT NULL,
    end_at       VARCHAR(64)                   NOT NULL,
    started_date VARCHAR(64) DEFAULT NULL,
    ended_date   VARCHAR(64) DEFAULT NULL,
    status       VARCHAR(20)                   NOT NULL
);