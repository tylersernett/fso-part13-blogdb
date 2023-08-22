-- hours spent: 2 + 1.5 + 1 + 2.5 + 1 = 8
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

INSERT INTO blogs (author, url, title, likes)
VALUES ('Cool Guy', 'www.cool.com/2', 'Another Test 2', 3);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Mr Cool', 'www.cool.com/2222', 'Wow its cool', 22);

INSERT INTO blogs (author, url, title, likes)
VALUES ('New Author', 'www.cool.com/new', 'New kid on the block', 1);


INSERT INTO users (username, name)
VALUES ('test', 'John Doe');


{
	"author": "Mr Cool",
	"url": "mrcool.com",
	"title": "Auth test"
}

{
	"username":"testup",
	"password":"secret"
}

--create user
{
	"username":"test@test.com",
	"name": "T Testy",
	"password":"secret"
}

--create blog
{
	"author": "Mr Cool",
	"url": "mrcool.com",
	"title": "Year test",
	"likes": 2,
	"year": 1985
}