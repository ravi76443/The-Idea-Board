export interface Idea {
  id: number;
  text: string;
  votes: number;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

export interface IdeasResponse extends ApiResponse<Idea[]> {
  data: Idea[];
  count: number;
}

export interface IdeaResponse extends ApiResponse<Idea> {
  data: Idea;
}
