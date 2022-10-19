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
  const editorContent = await prisma.editorContent.create({
    data: { content, userId: user?.id ?? null }
  });
  await prisma.editHistory.create({
    data: { contentId: editorContent.id, userId: user?.id ?? null }
  });
  return editorContent;
};

const updateOne = async (id: number, content: string) => {
  const editorContent = await prisma.editorContent.update({
    where: { id },
    data: { content }
  });
  await prisma.editHistory.create({
    data: { contentId: editorContent.id, userId: editorContent.userId }
  });
  return editorContent;
};

const deleteOne = (id:number) => {
  return prisma.editorContent.delete({
    where: { id }
  });
};

export { getAll, getOne, createOne, updateOne, deleteOne };
