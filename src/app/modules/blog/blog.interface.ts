export interface IBlog {
  title: string;
  image: string;
  category: string;
  author: string;
  introduction: string;
  content: string;
  tags?: string[];
  isDeleted?: boolean;
}
