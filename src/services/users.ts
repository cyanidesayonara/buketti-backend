import { prisma } from '../../prisma';

const getAll = () => {
  return prisma.user.findMany();
};

const getOne = (id: number) => {
  return prisma.user.findUnique({
    where: { id }
  });
};

const upsertOne = (name: string, email: string) => {
  return prisma.user.upsert({
    where: { email },
    update: { name },
    create: { name, email }
  });
};

const updateOne = (id: number, name: string, email: string) => {
  return prisma.user.update({
    where: { id },
    data: { name, email }
  });
};

const deleteOne = (id: number) => {
  return prisma.user.delete({
    where: { id }
  });
};

export { getAll, getOne, upsertOne, updateOne, deleteOne };
