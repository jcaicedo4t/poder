// pages/api/addHabit.js (Backend API Endpoint)
import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req)
    const { user_id, name, description, frequency } = req.body;

    try {
      const result = await sql`
        INSERT INTO habits (user_id, name, description, frequency)
        VALUES (${user_id}, ${name}, ${description}, ${frequency})
        RETURNING *;
      `;
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting habit:', error);
      res.status(500).json({ error: 'Error inserting habit' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
