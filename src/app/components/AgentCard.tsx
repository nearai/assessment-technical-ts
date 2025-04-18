"use client";
import React from 'react';
import Image from 'next/image';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    capabilities: string;
    historicalPerformance: number;
    availability: boolean;
    imageUrl?: string;
  };
  explanation?: string;
}

export default function AgentCard({ agent, explanation }: AgentCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
          {agent.imageUrl ? (
            <Image
              src={agent.imageUrl}
              alt={agent.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-2xl">👤</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-lg">{agent.name}</h3>
          <p className="text-sm text-gray-600">
            Performance: {(agent.historicalPerformance * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-gray-500">
            {agent.availability ? 'Available' : 'Unavailable'}
          </p>
        </div>
      </div>
      
      <div className="mt-3">
        <h4 className="text-sm font-medium">Capabilities:</h4>
        <p className="text-sm text-gray-700">{agent.capabilities}</p>
      </div>
      
      {explanation && (
        <div className="mt-3 pt-3 border-t">
          <h4 className="text-sm font-medium">Why this agent?</h4>
          <p className="text-sm text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
}