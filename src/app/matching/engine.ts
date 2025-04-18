/**
 * Matches agents to a query based on semantic similarity and historical performance.
 */
function calculateSemanticSimilarity(query: string, capabilities: string): number {
  const queryWords = query.toLowerCase().split(/\s+/);
  const capabilityWords = capabilities.toLowerCase().split(/\s+/);
  
  let matchCount = 0;
  for (const queryWord of queryWords) {
    if (capabilityWords.includes(queryWord)) {
      matchCount++;
    }
  }
  
  return matchCount / queryWords.length;
}

export function matchAgents(
  query: string, 
  availableAgents: Array<{ id: string; capabilities: string; historicalPerformance: number }>, 
  topN: number = 3
): Array<{ agent: { id: string; capabilities: string; historicalPerformance: number }; explanation: string }> {
  const results: Array<{ agent: { id: string; capabilities: string; historicalPerformance: number }; score: number }> = [];

  for (const agent of availableAgents) {
    const similarity = calculateSemanticSimilarity(query, agent.capabilities);
    const performance = agent.historicalPerformance;
    
    const score = similarity * 0.5 + performance * 0.5;
    results.push({ agent, score });
  }
  
  const sortedResults = results.sort((a, b) => b.score - a.score);
  
  return sortedResults.slice(0, topN).map(result => ({
    agent: result.agent,
    explanation: `This agent matched your query with a similarity score of ${(result.score * 100).toFixed(0)}%.`
  }));
}