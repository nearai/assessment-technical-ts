// Match history storage
import { query } from './db';

export interface MatchHistory {
  id: string;
  queryId: string;
  agentId: string;
  rank: number;
  selected: boolean;
  timestamp: Date;
}

/**
 * Records a match between a query and an agent
 * @param queryId - The query ID
 * @param agentId - The agent ID
 * @param rank - The rank of the agent in the results (1-based)
 * @returns The created match history record
 */
export async function recordMatch(queryId: string, agentId: string, rank: number): Promise<MatchHistory> {
  try {
    const result = await query(
      'INSERT INTO match_history (query_id, agent_id, rank, selected, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [queryId, agentId, rank, false, new Date()]
    );
    
    const row = result.rows[0];
    return {
      id: row.id,
      queryId: row.query_id,
      agentId: row.agent_id,
      rank: row.rank,
      selected: row.selected,
      timestamp: row.timestamp,
    };
  } catch (error) {
    console.error('Error recording match:', error);
    throw error;
  }
}

/**
 * Updates a match history record to indicate the agent was selected
 * @param id - The match history record ID
 * @returns The updated match history record
 */
export async function markAsSelected(id: string): Promise<MatchHistory | null> {
  try {
    const result = await query(
      'UPDATE match_history SET selected = true WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id,
      queryId: row.query_id,
      agentId: row.agent_id,
      rank: row.rank,
      selected: row.selected,
      timestamp: row.timestamp,
    };
  } catch (error) {
    console.error(`Error marking match with ID ${id} as selected:`, error);
    throw error;
  }
}

/**
 * Gets the match history for a specific query
 * @param queryId - The query ID
 * @returns Array of match history records
 */
export async function getMatchHistoryForQuery(queryId: string): Promise<MatchHistory[]> {
  try {
    const result = await query(
      'SELECT * FROM match_history WHERE query_id = $1 ORDER BY rank',
      [queryId]
    );
    
    return result.rows.map(row => ({
      id: row.id,
      queryId: row.query_id,
      agentId: row.agent_id,
      rank: row.rank,
      selected: row.selected,
      timestamp: row.timestamp,
    }));
  } catch (error) {
    console.error(`Error fetching match history for query ${queryId}:`, error);
    throw error;
  }
}