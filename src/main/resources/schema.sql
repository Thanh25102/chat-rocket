CREATE TABLE IF NOT EXISTS USERS
(
    id       UUID         NOT NULL PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS CONVERSIONS
(
    id   UUID NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    TYPE VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS MESSAGES
(
    id              UUID NOT NULL PRIMARY KEY,
    message_text    VARCHAR(255),
    conversation_id UUID NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    time TIMESTAMP NOT NULL,
    FOREIGN KEY (conversation_id) REFERENCES CONVERSIONS (id)
);
CREATE TABLE IF NOT EXISTS GROUP_MEMBER
(
    user_id         UUID      NOT NULL,
    conversation_id UUID      NOT NULL,
    joined_datetime TIMESTAMP NOT NULL,
    left_datetime   TIMESTAMP  NULL,

    PRIMARY KEY (user_id, conversation_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (conversation_id) REFERENCES CONVERSIONS (id)
);


