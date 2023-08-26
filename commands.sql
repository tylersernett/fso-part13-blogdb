-- hours spent: 2 + 1.5 + 1 + 2.5 + 1 + 2 + 1.5 + 1.5 = 13

--1 flyctl proxy 5432 -a fso-part13-blog-postgres
--2 npm run dev
--3 flyctl postgres connect -a fso-part13-blog-postgres
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
VALUES ('jd@test.com', 'John Doe');


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
{
	"username":"jd@test.com",
	"name": "John Doe",
	"password":"secret"
}
{
	"username":"x@test.com",
	"name": "Mr X",
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

{
	"author": "Mr Cool",
	"url": "mrcool.com",
	"title": "The 90s",
	"likes": 4,
	"year": 1999
}

{
	"author": "The Dude",
	"url": "thedude.com",
	"title": "White Russians",
	"likes": 10,
	"year": 1997
}

{
	"author": "Miles Davis",
	"url": "jazz.com",
	"title": "Being Cool",
	"likes": 13,
	"year": 1990
}

{
	"author": "Miles Davis",
	"url": "jazz.com",
	"title": "Being Even Cooler",
	"likes": 14,
	"year": 1999
}

{
	"author": "Miles Davis",
	"url": "jazz.com",
	"title": "This Should Fail",
	"likes": 1,
	"year": 2000
}

--login
{
	"username":"x@test.com",
	"password":"secret"
}

--readingLists POST
insert into reading_lists (user_id, blog_id) values (4, 1);
insert into reading_lists (user_id, blog_id) values (4, 3);

{
  "blogId": 4,
  "userId": 4
}