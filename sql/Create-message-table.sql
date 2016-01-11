use apartmentsharedb;
CREATE TABLE messages (

id BINARY(16) NOT NULL,

fromuser BINARY(16) NOT NULL,

touser BINARY(16) NOT NULL,

text VARCHAR(1000) NOT NULL,

FOREIGN KEY (fromuser) REFERENCES users(id),

FOREIGN KEY (touser) REFERENCES users(id),

creation_timestamp DATETIME not null default current_timestamp,

PRIMARY KEY (id)

);