import { prisma } from '../../prisma';

const getAll = () => {
  return prisma.editorContent.findMany({
    include: { user: true }
  });
};

const getOne = (id: number) => {
  return prisma.editorContent.findUnique({
    where: { id },
    include: { user: true }
  });
};

const createOne = async (content: string) => {
  const user = await prisma.user.findUnique({
    where: { id: 1 }
  });
  const editorContent = await prisma.editorContent.create({
    data: { content, userId: user?.id ?? null },
    include: { user: true }
  });
  await prisma.editHistory.create({
    data: { contentId: editorContent.id, userId: user?.id ?? null }
  });
  return editorContent;
};

const updateOne = async (id: number, content: string) => {
  const editorContent = await prisma.editorContent.update({
    where: { id },
    data: { content },
    include: { user: true }
  });
  await prisma.editHistory.create({
    data: { contentId: editorContent.id, userId: editorContent.userId }
  });
  return editorContent;
};

const deleteOne = (id:number) => {
  return prisma.editorContent.delete({
    where: { id },
    include: { user: true }
  });
};

export { getAll, getOne, createOne, updateOne, deleteOne };
