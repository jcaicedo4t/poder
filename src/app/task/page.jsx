import { sql } from "@vercel/postgres";

export default async function Task() {
  const { rows } = await sql`SELECT * from habits`;
  // console.log(rows);
  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>{JSON.stringify(row)}</div>
      ))}
    </div>
  );
}
