import React, { useState } from 'react'

// ⚠️ IMPORTANTE: Reemplaza esta URL con la URL de tu Google Apps Script desplegado
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwuwBzOh1NhSDXetdIXFsNFsn5HbGfApDFXUY0Q6ABUIk2Jh0wSR-MWbumkz7up0Sd9Kg/exec'

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dieta: 'No',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Con mode: 'no-cors' no podemos leer la respuesta, pero si llega aquí es que se envió
      setMessage('¡Confirmación enviada! 🎉')
      setFormData({ nombre: '', apellido: '', dieta: 'No' })

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error al enviar:', error)
      setMessage('Error al enviar. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="rsvp-form">
        <input
          type="text"
          name="nombre"
          
          value={formData.nombre}
          onChange={handleChange}
          required
          className="rsvp-input rsvp-nombre"
        />

        <input
          type="text"
          name="apellido"
          
          value={formData.apellido}
          onChange={handleChange}
          required
          className="rsvp-input rsvp-apellido"
        />

        <select
          name="dieta"
          value={formData.dieta}
          onChange={handleChange}
          className="rsvp-input rsvp-dieta"
        >
          <option value="No">No</option>
          <option value="Vegetariana">Vegetariana</option>
          <option value="Sin TACC">Sin TACC</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="rsvp-button"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      {message && <div className="rsvp-message">{message}</div>}
    </>
  )
}
