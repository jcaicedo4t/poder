import { sql } from "@vercel/postgres"

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body

    // Validar que se proporcione un ID
    if (!id) {
      return res.status(400).json({ error: "Se requiere un ID de evento" })
    }

    try {
      // Eliminar el evento de la base de datos
      const result = await sql`
        DELETE FROM calendarevents 
        WHERE id = ${id}
        RETURNING id;
      `

      // Verificar si se eliminó algún evento
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Evento no encontrado" })
      }

      res.status(200).json({ success: true, message: "Evento eliminado correctamente", id: result.rows[0].id })
    } catch (error) {
      console.error("Error al eliminar el evento:", error)
      res.status(500).json({ error: "Error al eliminar el evento de la base de datos" })
    }
  } else {
    res.status(405).json({ error: "Método no permitido" })
  }
}
