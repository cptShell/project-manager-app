export type TaskDto = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: Array<{ filename: string; filesize: number }>;
};
