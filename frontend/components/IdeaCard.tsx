import { useState } from 'react';
import type { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  onUpvote: () => void;
  isUpvoting: boolean;
}

export function IdeaCard({ idea, onUpvote, isUpvoting }: IdeaCardProps) {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const ideaDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - ideaDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <article className="card p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 mr-4">
          <p className="text-gray-900 text-lg leading-relaxed break-words">
            {idea.text}
          </p>
          <time 
            className="text-sm text-gray-500 mt-3 block"
            dateTime={idea.created_at}
            title={new Date(idea.created_at).toLocaleString()}
          >
            {formatTimeAgo(idea.created_at)}
          </time>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-2xl font-bold text-primary-600">
              {idea.votes}
            </span>
            <span className="block text-xs text-gray-500 uppercase tracking-wide">
              Vote{idea.votes !== 1 ? 's' : ''}
            </span>
          </div>
          
          <button
            onClick={onUpvote}
            disabled={isUpvoting}
            className={`btn ${
              isUpvoting 
                ? 'btn-secondary' 
                : 'border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300 focus:ring-primary-500'
            } px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            aria-label={`Upvote idea: ${idea.text.substring(0, 50)}...`}
          >
            {isUpvoting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-1"></div>
                Voting...
              </>
            ) : (
              <>
                👍 Vote
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
