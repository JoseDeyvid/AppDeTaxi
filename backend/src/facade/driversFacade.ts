import prisma from "../prisma";

export async function checkHasDriver(id: number): Promise<boolean> {
    try {
        const driver = await prisma.driver.findFirst({
            where: {
                id: id
            }
        })

        return !!driver
    } catch (error) {
        return false
    }
}

async function getDriverById(id: number) {

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
        if (driver.minKm <= (distance / 1000)) {
            return true;
        }
    }
    return false;
}