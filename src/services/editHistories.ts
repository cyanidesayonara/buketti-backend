import { prisma } from '../../prisma';

const getAll = () => {
  return prisma.editHistory.findMany();
};

const getOne = (id: number) => {
  return prisma.editHistory.findUnique({
    where: { id }
  });
};

const deleteOne = (id:number) => {
  return prisma.editHistory.delete({
    where: { id }
  });
};

export { getAll, getOne, deleteOne };
