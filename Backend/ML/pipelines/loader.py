import asyncpg
import re


def sanitize_identifier(name: str) -> str:
    """
    Sanitize SQL identifiers (table/column names) safely.
    Only allow letters, numbers, and underscore.
    """
    return re.sub(r'[^a-zA-Z0-9_]', '', name)


async def load_to_postgres(url: str, result: int, table_name: str, conn_string: str):
    try:
        # Sanitize table name to avoid injection
        safe_table = sanitize_identifier(table_name)

        # Connect to DB
        conn = await asyncpg.connect(conn_string)

        # Parameterized query → 100% SQL injection safe
        query = f"""
            INSERT INTO {safe_table} (url, result)
            VALUES ($1, $2)
        """

        # Insert values safely
        await conn.execute(query, url, result)

        await conn.close()
        print("inserted into DB (async)")

    except Exception as e:
        print(f"DB Insert Error: {e}")
