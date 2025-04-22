import { sql } from "@vercel/postgres"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await sql`SELECT * FROM tasks ORDER BY id DESC LIMIT 5`
      res.status(200).json(result.rows)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      res.status(500).json({ error: "Error fetching tasks" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
