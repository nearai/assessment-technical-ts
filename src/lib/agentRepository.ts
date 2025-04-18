// Agent data access
import { query } from './db';

export interface Agent {
  id: string;
  name: string;
  capabilities: string;
  historicalPerformance: number;
  availability: boolean;
  imageUrl?: string;
}

/**
 * Gets all available agents
 * @returns Array of agents
 */
export async function getAgents(): Promise<Agent[]> {
  try {
    const result = await query('SELECT * FROM agents WHERE availability = true');
    return result.rows.map((row: {
      id: string;
      name: string;
      capabilities: string;
      historical_performance: number;
      availability: boolean;
      image_url?: string;
    }) => ({
      id: row.id,
      name: row.name,
      capabilities: row.capabilities,
      historicalPerformance: row.historical_performance,
      availability: row.availability,
      imageUrl: row.image_url,
    }));
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
}

/**
 * Gets an agent by ID
 * @param id - The agent ID
 * @returns The agent or null if not found
 */
export async function getAgentById(id: string): Promise<Agent | null> {
  try {
    const result = await query('SELECT * FROM agents WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      capabilities: row.capabilities,
      historicalPerformance: row.historical_performance,
      availability: row.availability,
      imageUrl: row.image_url,
    };
  } catch (error) {
    console.error(`Error fetching agent with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Updates an agent's historical performance
 * @param id - The agent ID
 * @param performance - The new performance value (0-1)
 * @returns The updated agent
 */
export async function updateAgentPerformance(id: string, performance: number): Promise<Agent | null> {
  try {
    // Ensure performance is between 0 and 1
    const normalizedPerformance = Math.max(0, Math.min(1, performance));
    
    const result = await query(
      'UPDATE agents SET historical_performance = $1 WHERE id = $2 RETURNING *',
      [normalizedPerformance, id]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      capabilities: row.capabilities,
      historicalPerformance: row.historical_performance,
      availability: row.availability,
      imageUrl: row.image_url,
    };
  } catch (error) {
    console.error(`Error updating performance for agent with ID ${id}:`, error);
    throw error;
  }
}