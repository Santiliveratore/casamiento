import React, { useState } from 'react'

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dieta: 'No',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('El plazo de inscripción finalizó. Por favor, contactate directamente con los novios.')
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
          className="rsvp-button"
        >
          Enviar
        </button>
      </form>

      {message && <div className="rsvp-message">{message}</div>}
    </>
  )
}
