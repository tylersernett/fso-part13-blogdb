-- hours spent: 2 + 11:00 = 2
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES ('Test Testerson', 'www.test.com', 'The First Test');

INSERT INTO blogs (author, url, title, likes)
VALUES ('Cool Guy', 'www.cool.com', 'Another Test', 2);
