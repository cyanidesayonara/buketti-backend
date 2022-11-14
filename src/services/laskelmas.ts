import { prisma } from '../../prisma';

const getAll = () => {
  return prisma.laskelma.findMany();
};

const createOne = (tyyppi: string, muutosId: number, kanta: string, vuosi: string, kehysjako: string, arvo: number)=> {

  return prisma.laskelma.create({
    data: { tyyppi, muutosId, kanta, vuosi, kehysjako, arvo }
  });
};

const updateOne = (id: number, tyyppi: string, muutosId: number, kanta: string, vuosi: string, kehysjako: string, arvo: number) => {

  return prisma.laskelma.update({
    where: { id },
    data: { tyyppi, muutosId, kanta, vuosi, kehysjako, arvo }
  });
};

export { getAll, createOne, updateOne };
