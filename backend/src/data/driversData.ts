import prisma from "../prisma";

const driversData = [
    {
        id: 1,
        name: "Homer Simpson",
        description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
        review: {
            rating: 2,
            comment: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts."
        },
        value: 2.50,
        minKm: 1
    },
    {
        id: 2,
        name: "Dominic Toretto",
        description: "Ei, aqui é o Dom .Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        vehicle: "Dodge Charger R/T 1970 modificado",
        review: {
            rating: 4,
            comment: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!"
        },
        value: 5.00,
        minKm: 5
    },
    {
        id: 3,
        name: "James Bond",
        description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        vehicle: "Aston Martin DB5 clássico",
        review: {
            rating: 5,
            comment: "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto."
        },
        value: 10.00,
        minKm: 10
    }
]

type Driver = {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number;
        comment: string;
    };
    value: number;
    minKm: number;
}

export async function checkHasDriver(id: number): Promise<boolean> {
    try {
        const driver = await prisma.driver.findFirst({
            where: {
                id: id
            }
        })

        return !!driver
    } catch (error) {
        console.log("Ta no catch: ")
        return false
    }
}

export async function getDriverById(id: number) {

    const driver = await prisma.driver.findFirst({
        where: {
            id: id
        }
    })


    return driver;
}

export async function distanceIsValidToDriver(distance: number, driverId: number) {
    const driver = await getDriverById(driverId);
    if (driver) {
        if (driver.minKm <= (distance/1000)) {
            return true;
        }
    }
    return false;
}

export default driversData;