const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.usuario.createMany({
    data: [
      { cpf: "00000000000", nome: "Mestre", senha: "sagui", tipo: "mestre", saldo: 10000 },
      { cpf: "11111111111", nome: "Cliente Teste", senha: "gato", tipo: "cliente", saldo: 500 }
    ],
    skipDuplicates: true
  });
  console.log("Seed concluído!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });