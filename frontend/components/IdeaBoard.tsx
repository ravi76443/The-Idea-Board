'use client';

import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { IdeaCard } from './IdeaCard';
import { IdeaSkeleton } from './IdeaSkeleton';
import { fetchIdeas, upvoteIdea } from '../lib/api';
import type { Idea } from '../types';

export function IdeaBoard() {
  const { data, error, isLoading } = useSWR('/api/ideas', fetchIdeas, {
    refreshInterval: 5000, // Poll every 5 seconds
  });

  const [upvotingIds, setUpvotingIds] = useState<Set<number>>(new Set());

  const handleUpvote = async (id: number) => {
    if (upvotingIds.has(id)) return;

    setUpvotingIds(prev => new Set(prev).add(id));

    try {
      // Optimistic update
      mutate('/api/ideas', (currentData: any) => {
        if (!currentData) return currentData;
        
        return {
          ...currentData,
          data: currentData.data.map((idea: Idea) =>
            idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
          ),
        };
      }, false);

      // Actually perform the upvote
      await upvoteIdea(id);
      
      // Revalidate to ensure consistency
      mutate('/api/ideas');
    } catch (error) {
      console.error('Failed to upvote idea:', error);
      
      // Revert optimistic update on error
      mutate('/api/ideas');
    } finally {
      setUpvotingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Latest Ideas</h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <IdeaSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-red-900">Error Loading Ideas</h2>
        <p className="text-red-700 mt-2">
          We couldn't load the ideas right now. Please try refreshing the page.
        </p>
      </div>
    );
  }

  const ideas = data?.data || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Latest Ideas
          <span className="ml-2 text-sm text-gray-500">
            ({ideas.length} {ideas.length === 1 ? 'idea' : 'ideas'})
          </span>
        </h2>
        <button
          onClick={() => mutate('/api/ideas')}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">💡</div>
          <h3 className="text-lg font-medium text-gray-900">No ideas yet</h3>
          <p className="text-gray-600 mt-2">
            Be the first to share an idea! Use the form above to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {ideas.map((idea: Idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onUpvote={() => handleUpvote(idea.id)}
              isUpvoting={upvotingIds.has(idea.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
