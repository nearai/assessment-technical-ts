/* eslint-disable @typescript-eslint/no-unused-vars */
exports.up = pgm => {
  pgm.createTable('match_history', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('uuid_generate_v4()') },
    query_id: { type: 'text', notNull: true },
    agent_id: { type: 'uuid', notNull: true, references: 'agents(id)' },
    rank: { type: 'integer', notNull: true },
    selected: { type: 'boolean', notNull: true, default: false },
    timestamp: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') }
  });

  // Create indexes for faster lookups
  pgm.createIndex('match_history', 'query_id');
  pgm.createIndex('match_history', 'agent_id');
};

exports.down = pgm => {
  pgm.dropTable('match_history');
};