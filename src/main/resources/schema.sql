CREATE TABLE IF NOT EXISTS USERS
(
    id       UUID         NOT NULL PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role     VARCHAR(20)  NOT NULL
);
CREATE TABLE IF NOT EXISTS CONVERSATIONS
(
    id            UUID NOT NULL PRIMARY KEY,
    name          VARCHAR(255),
    type          VARCHAR(10),
    create_date   TIMESTAMP,
    last_modified TIMESTAMP
);

CREATE TABLE IF NOT EXISTS MESSAGES
(
    id              UUID         NOT NULL PRIMARY KEY,
    message_text    VARCHAR(255),
    conversation_id UUID         NOT NULL,
    sender_id       UUID         NOT NULL,
    sender_name     VARCHAR(255) NOT NULL,
    time            TIMESTAMP    NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES USERS (id),
    FOREIGN KEY (conversation_id) REFERENCES CONVERSATIONS (id)
);


CREATE TABLE IF NOT EXISTS GROUP_MEMBER
(
    user_id         UUID      NOT NULL,
    conversation_id UUID      NOT NULL,
    joined_datetime TIMESTAMP NOT NULL,
    left_datetime   TIMESTAMP NULL,
    PRIMARY KEY (user_id, conversation_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (conversation_id) REFERENCES CONVERSATIONS (id)
);



