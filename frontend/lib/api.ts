import type { Idea, IdeasResponse, IdeaResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
}

export async function fetchIdeas(): Promise<IdeasResponse> {
  try {
    const response = await fetchWithErrorHandling<IdeasResponse>(`${API_URL}/api/ideas`);
    return response;
  } catch (error) {
    console.error('Failed to fetch ideas:', error);
    throw error;
  }
}

export async function createIdea(text: string): Promise<IdeaResponse> {
  try {
    const response = await fetchWithErrorHandling<IdeaResponse>(`${API_URL}/api/ideas`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    return response;
  } catch (error) {
    console.error('Failed to create idea:', error);
    throw error;
  }
}

export async function upvoteIdea(id: number): Promise<IdeaResponse> {
  try {
    const response = await fetchWithErrorHandling<IdeaResponse>(`${API_URL}/api/ideas/${id}/upvote`, {
      method: 'POST',
    });
    return response;
  } catch (error) {
    console.error('Failed to upvote idea:', error);
    throw error;
  }
}
