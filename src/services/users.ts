import { prisma } from '../../prisma';

const getAll = () => {
  return prisma.user.findMany();
};

const getOne = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id: id
    }
  });
};

const upsertOne = (name: string, email: string) => {
  return prisma.user.upsert({
    where: {
      email: email
    },
    update: {
      name: name
    },
    create: {
      name: name,
      email: email,
    }
  });
};

const updateOne = (id: number, name: string, email: string) => {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
    }
  });
};

const deleteOne = (id:number) => {
  return prisma.user.delete({
    where: {
      id: id,
    },
  });
};

export { getAll, getOne, upsertOne, updateOne, deleteOne };
