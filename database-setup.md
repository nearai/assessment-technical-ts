# Database Setup and Migration Guide

This document provides instructions for setting up the database and running migrations for the Agent Discovery application.

## Automated Setup with Docker

When using the development container (`.devcontainer`), the database is automatically set up with:
- User: postgres
- Password: postgres
- Database name: agent_discovery

The migrations are automatically run when the container starts, so no manual setup is required.

## Manual Setup Prerequisites

If you're not using the development container, you'll need:
- PostgreSQL installed and running
- Node.js and npm installed

## Configuration

The database connection is configured using environment variables. You can set these in a `.env` file in the project root:

```
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agent_discovery
```

Adjust these values according to your PostgreSQL setup.

## Database Setup

1. Create a new PostgreSQL database:

```bash
createdb agent_discovery
```

2. Install project dependencies:

```bash
npm install
```

## Running Migrations

The project uses `node-pg-migrate` for database migrations. The following npm scripts are available:

- `npm run migrate:up` - Run all pending migrations
- `npm run migrate:down` - Revert the most recent migration
- `npm run migrate:create <migration_name>` - Create a new migration file

### Initial Setup

To set up the database for the first time, run:

```bash
npm run migrate:up
```

This will:
1. Create the necessary tables (agents, match_history)
2. Add indexes for performance
3. Seed the agents table with initial data

## Database Schema

### Agents Table

Stores information about available agents:

- `id` (UUID, primary key): Unique identifier for the agent
- `name` (text): Name of the agent
- `capabilities` (text): Description of the agent's capabilities
- `historical_performance` (float): Performance score between 0 and 1
- `availability` (boolean): Whether the agent is currently available
- `image_url` (text, optional): URL to the agent's image
- `created_at` (timestamp): When the record was created
- `updated_at` (timestamp): When the record was last updated

### Match History Table

Stores the history of matches between queries and agents:

- `id` (UUID, primary key): Unique identifier for the match record
- `query_id` (text): Identifier for the query
- `agent_id` (UUID, foreign key): Reference to the agent
- `rank` (integer): The rank of the agent in the results
- `selected` (boolean): Whether the agent was selected
- `timestamp` (timestamp): When the match occurred
- `created_at` (timestamp): When the record was created
- `updated_at` (timestamp): When the record was last updated

## Troubleshooting

If you encounter issues with the database connection:

1. Ensure PostgreSQL is running
2. Verify the connection details in your `.env` file
3. Check the console for specific error messages
