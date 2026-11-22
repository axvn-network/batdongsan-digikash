import { User } from "./user";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  thumbnail?: string | null;
  category: string;
  authorId: string;
  author?: User;
  publishedAt?: string | null;
  createdAt: string;
}
