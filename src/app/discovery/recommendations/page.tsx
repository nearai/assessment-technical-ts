"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AgentCard from '../components/AgentCard';
import Link from 'next/link';

interface Agent {
  id: string;
  name: string;
  capabilities: string;
  historicalPerformance: number;
  availability: boolean;
  imageUrl?: string;
}

interface RecommendationResult {
  agent: Agent;
  explanation: string;
}

export default function Recommendations() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setError('No query provided');
      setIsLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/agents/queries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(data.agents);
        setExecutionTime(data.executionTime);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to search
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Recommended Agents
          </h1>
          {query && (
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Based on: &quot;{query}&quot;
            </p>
          )}
          {executionTime && (
            <p className="mt-2 text-sm text-gray-500">
              Results found in {executionTime}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">No matching agents found. Please try a different query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((recommendation, index) => (
              <AgentCard 
                key={recommendation.agent.id || index}
                agent={recommendation.agent}
                explanation={recommendation.explanation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
