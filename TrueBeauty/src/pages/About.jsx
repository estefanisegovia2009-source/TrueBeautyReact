function About() {
  const certificates = [
    {
      src: "/images/certificado-html.png",
      alt: "Certificado Desarrollo Web con HTML",
    },
    {
      src: "/images/certificado-sql.png",
      alt: "Certificado Introducción a Bases de Datos y SQL",
    },
    {
      src: "/images/certificado-python.png",
      alt: "Certificado Introducción a Python",
    },
    {
      src: "/images/certificado-javascript.png",
      alt: "Certificado JavaScript desde cero",
    },
  ];

  return (
    <main className="about-page">
      <section className="developer-card">
        <div className="dev-avatar">
          <img
            src="/images/Perfilpersonal.png"
            alt="Foto de Estefani Segovia"
          />
        </div>

        <div className="dev-info">
          <h2>Desarrolladora</h2>

          <h3>Estefani Segovia</h3>

          <p>
            Estudiante de la Escuela Técnica de la Universidad de Buenos Aires,
            con interés en el desarrollo web, la ciberseguridad, la programación
            y la creación de proyectos digitales.
          </p>
        </div>
      </section>

      <section className="seccion">
        <h2>Experiencia y Formación</h2>

        <article className="card">
          <h3>Experiencia laboral</h3>

          <p>
            Actualmente me encuentro en formación académica y desarrollando
            proyectos prácticos para fortalecer mis conocimientos en desarrollo
            web, programación y ciberseguridad.
          </p>
        </article>

        <article className="card">
          <h3>Formación profesional</h3>

          <div className="card-certificados">
            {certificates.map((certificate) => (
              <img
                key={certificate.src}
                src={certificate.src}
                alt={certificate.alt}
              />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default About;
