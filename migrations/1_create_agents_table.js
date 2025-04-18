/* eslint-disable @typescript-eslint/no-unused-vars */
exports.up = pgm => {
  // Create extension for UUID generation if it doesn't exist
  pgm.createExtension('uuid-ossp', { ifNotExists: true });

  pgm.createTable('agents', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('uuid_generate_v4()') },
    name: { type: 'text', notNull: true },
    capabilities: { type: 'text', notNull: true },
    historical_performance: { type: 'float', notNull: true, default: 0.5 },
    availability: { type: 'boolean', notNull: true, default: true },
    image_url: { type: 'text' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') }
  });

};

exports.down = pgm => {
  pgm.dropTable('agents');
};