DROP TABLE IF EXISTS books;

CREATE TABLE
    books (
        isbn VARCHAR(100) PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        author VARCHAR(100),
        genre VARCHAR(100)
    );

INSERT INTO
    books (isbn, title, author, genre)
VALUES
    (
        '9780780797086',
        'Harry Potter and the Sorcerer''s Stone.',
        'J.K. Rowling',
        'Fantasy'
    ),
    (
        '9781338878936',
        'Harry Potter and the Chamber of Secrets.',
        'J.K. Rowling',
        'Fantasy'
    ),
    (
        '9781338815283',
        'Harry Potter and the Prisoner of Azkaban.',
        'J.K. Rowling',
        'Fantasy'
    ),
    (
        '9781338878950',
        'Harry Potter and the Goblet of Fire.',
        'J.K. Rowling',
        'Fantasy'
    ),
    (
        '9780545791434',
        'Harry Potter and the Order of the Phoenix.',
        'J.K. Rowling',
        'Fantasy'
    ),
    (
        '9783551354068',
        'Harry Potter and the Half-Blood Prince.',
        'J.K. Rowling',
        'Fantasy'
    ),
    (
        '9780545010221',
        'Harry Potter and the Deathly Hallows.',
        'J.K. Rowling',
        'Fantasy'
    );