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

export interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
  author: string;
  views: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  status: 'upcoming' | 'ongoing' | 'past';
  category: string;
}

export interface Bulletin {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  date: Date;
  category: string;
}

export interface SocialPost {
  id: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'youtube';
  content: string;
  imageUrl?: string;
  url: string;
  date: Date;
  stats: {
    likes: number;
    shares: number;
    comments: number;
  };
} 