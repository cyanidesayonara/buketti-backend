import { prisma } from '../../prisma';

const getAll = () => {
  return prisma.user.findMany({
    include: { editorContents: true }
  });
};

const getOne = (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: { editorContents: true }
  });
};

const upsertOne = (name: string, email: string) => {
  return prisma.user.upsert({
    where: { email },
    update: { name },
    create: { name, email },
    include: { editorContents: true }
  });
};

const updateOne = (id: number, name: string, email: string) => {
  return prisma.user.update({
    where: { id },
    data: { name, email },
    include: { editorContents: true }
  });
};

const deleteOne = (id: number) => {
  return prisma.user.delete({
    where: { id },
    include: { editorContents: true }
  });
};

export { getAll, getOne, upsertOne, updateOne, deleteOne };
