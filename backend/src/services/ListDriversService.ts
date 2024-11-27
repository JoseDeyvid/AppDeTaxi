import prisma from "../prisma";

class ListDriversService {
    async execute() {
        try {
            const drivers = await prisma.driver.findMany();
            return drivers;
        } catch (error) {
            return {erro: "Não foi possível buscar os motoristas no nosso banco de dados!"}
        }
    }
}

export default ListDriversService;