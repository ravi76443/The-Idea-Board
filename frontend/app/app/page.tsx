'use client';

import { useState } from 'react';
import { IdeaBoard } from '../../components/IdeaBoard';
import { createIdea } from '../../lib/api';
import type { Idea } from '../../types';
import { mutate } from 'swr';

export default function AppPage() {
  const [newIdeaText, setNewIdeaText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIdeaTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNewIdeaText(text);
    setCharacterCount(text.length);
  };

  const handleSubmitIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newIdeaText.trim() || newIdeaText.length > 280) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createIdea(newIdeaText);
      setNewIdeaText('');
      setCharacterCount(0);
      
      // Refresh the ideas list to show the new idea
      mutate('/api/ideas');
    } catch (error) {
      console.error('Failed to create idea:', error);
      // You might want to show a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Idea Board</h1>
              <p className="text-gray-600 mt-1">Share your ideas and vote for your favorites</p>
            </div>
            <a 
              href="/"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Submit Idea Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Share Your Idea</h2>
          
          <form onSubmit={handleSubmitIdea} className="space-y-4">
            <div>
              <textarea
                value={newIdeaText}
                onChange={handleIdeaTextChange}
                placeholder="What's your brilliant idea? (280 characters max)"
                className="input min-h-[100px] resize-none"
                maxLength={280}
                disabled={isSubmitting}
              />
              <div className="mt-1 flex justify-between items-center">
                <span className={`text-sm ${characterCount > 280 ? 'text-red-600' : 'text-gray-500'}`}>
                  {characterCount}/280 characters
                </span>
                {characterCount > 280 && (
                  <span className="text-sm text-red-600">
                    Character limit exceeded
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newIdeaText.trim() || characterCount > 280 || isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Idea'}
              </button>
            </div>
          </form>
        </div>

        {/* Ideas List */}
        <IdeaBoard />
      </main>
    </div>
  );
}
