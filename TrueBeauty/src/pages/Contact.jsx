import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import StatusMessage from "../components/StatusMessage.jsx";

function Contact() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage(
      "Mensaje preparado correctamente. Esta entrega no conecta el formulario de contacto a un backend.",
    );

    event.currentTarget.reset();
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <h1>Contacto</h1>

        <p>
          ¿Tenés alguna consulta? Escribinos y te responderemos a la brevedad.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-form-box">
          <h2>Envianos un mensaje</h2>

          <StatusMessage type="success">{message}</StatusMessage>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>

              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingresá tu nombre completo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Correo electrónico</label>

              <input
                type="email"
                id="contactEmail"
                name="email"
                placeholder="ejemplo@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>

              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Escribí tu consulta..."
                minLength="20"
                maxLength="1000"
                required
              />
            </div>

            <button type="submit">Enviar mensaje</button>
          </form>
        </div>

        <div className="contact-info-box">
          <h2>Información de contacto</h2>

          <article className="info-card">
            <FontAwesomeIcon icon={faLocationDot} className="contact-icon" />

            <div>
              <h3>Dirección</h3>

              <p>Buenos Aires, Argentina</p>
            </div>
          </article>

          <article className="info-card">
            <FontAwesomeIcon icon={faPhone} className="contact-icon" />

            <div>
              <h3>Teléfono</h3>

              <p>11 2865-6255</p>
            </div>
          </article>

          <article className="info-card">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />

            <div>
              <h3>Email</h3>

              <p>estefani.segovia2009@gmail.com</p>
            </div>
          </article>

          <article className="info-card">
            <FontAwesomeIcon icon={faClock} className="contact-icon" />

            <div>
              <h3>Horarios</h3>

              <p>Lunes a viernes de 8 a 18 hs</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Contact;
