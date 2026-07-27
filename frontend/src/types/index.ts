export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Profile {
  id: number;
  username: string
  display_name: string;
  bio: string;
  avatar: string | null;
  following: number[];
  followers_count: number;
  following_count: number;
}

export interface Comment {
  id: number;
  user: User;
  tit: number;
  content: string;
  author?: string | { username: string }
  created_at: string;
}

export interface Tit {
  id: number
  author: string
  author_avatar: string | null
  content: string
  created_at: string
  likes_count: number
  comments_count: number
  is_liked: boolean
}

export interface AuthTokens {
  access: string;
  refresh: string;
}