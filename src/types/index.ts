export interface News {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
} 