import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult[0].server_version;

  const databaseMaxConectionsResult = await database.query(
    "SHOW max_connections",
  );

  const databaseMaxConectionsValue = parseInt(
    databaseMaxConectionsResult[0].max_connections,
  );

  const databaseOpenedConnectionResult = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname= $1;`,
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionResult[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMaxConectionsValue,
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
