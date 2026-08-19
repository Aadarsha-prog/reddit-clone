// This folder will not be needed in future
// Once we start to work with databases
export type Post = {
  id: string;
  title: string;
  content: string;
  images: string[];
  // TODO: Replace with User Type
  createdBy: {
    id: string;
    name: string;
  };
};
