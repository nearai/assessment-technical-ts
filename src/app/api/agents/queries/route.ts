import { NextResponse } from 'next/server';
import { matchAgents } from '@/app/matching/engine';
import { getAgents } from '@/lib/agentRepository';
import { logQuery } from '@/utils/logging';
import { measurePerformance } from '@/utils/performance';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }
    
    const startTime = performance.now();
    
    // Get all available agents
    const availableAgents = await getAgents();
    
    // Match agents to the query
    const matchedAgents = matchAgents(query, availableAgents);
    
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    // Log the query and performance metrics
    logQuery(query, matchedAgents, executionTime);
    
    // Record performance metrics
    measurePerformance('agent_matching', executionTime);
    
    return NextResponse.json({
      agents: matchedAgents,
      executionTime: `${executionTime.toFixed(2)}ms`
    });
  } catch (error) {
    console.error('Error processing query:', error);
    return NextResponse.json(
      { error: 'Failed to process query' },
      { status: 500 }
    );
  }
}