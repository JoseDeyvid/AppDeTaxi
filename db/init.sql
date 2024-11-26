CREATE TABLE "Driver" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    vehicle VARCHAR(255) NOT NULL,
    review_rating NUMERIC(2, 1) NOT NULL,
    review_comment TEXT NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    min_km NUMERIC(10, 2) NOT NULL
);
CREATE TABLE "Ride" (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    customer_id INT NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    distance NUMERIC(10, 2) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    driver_id INT NOT NULL REFERENCES "Driver"(id),
    driver_name VARCHAR(255) NOT NULL,
    value NUMERIC(10, 2) NOT NULL
);
INSERT INTO "Driver" (
        id,
        name,
        description,
        vehicle,
        review_rating,
        review_comment,
        value,
        min_km
    )
VALUES (
        1,
        'Homer Simpson',
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        'Plymouth Valiant 1973 rosa e enferrujado',
        2.0,
        'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
        2.50,
        1
    ),
    (
        2,
        'Dominic Toretto',
        'Ei, aqui é o Dom .Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        'Dodge Charger R/T 1970 modificado',
        4.0,
        'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
        5.00,
        5
    ),
    (
        3,
        'James Bond',
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        'Aston Martin DB5 clássico',
        5.0,
        'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        10.00,
        10
    );