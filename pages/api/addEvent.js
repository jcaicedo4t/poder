import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, name, description, start_time, end_time } = req.body;

    // Validar los datos de entrada
    if (!user_id || !name || !description || !start_time || !end_time) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
      const result = await sql`
        INSERT INTO calendarevents (user_id, title, description, start_time, end_time)
        VALUES (${user_id}, ${name}, ${description}, ${start_time}, ${end_time})
        RETURNING *;
      `;

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting habit:', error);
      res.status(500).json({ error: 'Error al insertar el evento en la base de datos' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
