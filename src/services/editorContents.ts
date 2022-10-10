import { prisma } from '../../prisma';

const getAll = () => {
  return prisma.editorContent.findMany();
};

const getOne = (id: number) => {
  return prisma.editorContent.findUnique({
    where: { id }
  });
};

const createOne = async (content: string) => {
  const user = await prisma.user.findUnique({
    where: { id: 1 }
  });
  return prisma.editorContent.create({
    data: { content, userId: user?.id ?? null }
  });
};

const updateOne = (id: number, content: string) => {
  return prisma.editorContent.update({
    where: { id },
    data: { content }
  });
};

const deleteOne = (id:number) => {
  return prisma.editorContent.delete({
    where: { id }
  });
};

export { getAll, getOne, createOne, updateOne, deleteOne };
