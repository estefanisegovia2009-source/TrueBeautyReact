import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
  faGithub,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import {
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>
            True Beauty
          </h3>

          <p>
            Maquillaje para
            realzar tu belleza
            natural.
          </p>
        </div>

        <div className="footer-column">
          <h3>
            Redes
          </h3>

          <a
            href="mailto:estefani.segovia2009@gmail.com"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
            />

            Email
          </a>

          <a
            href="https://wa.me/541128656255"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
            />

            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/Estefani_segovia_/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
            />

            Instagram
          </a>

          <a
            href="https://github.com/estefanisegovia2009-source"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
            />

            GitHub
          </a>

          <span>
            <FontAwesomeIcon
              icon={faLocationDot}
            />

            Buenos Aires,
            Argentina
          </span>
        </div>

        <div className="footer-column">
          <h3>
            Contacto
          </h3>

          <p>
            Email:
            estefani.segovia2009@gmail.com
          </p>

          <p>
            Tel: 11 2865-6255
          </p>

          <p>
            Instagram:
            @Estefani_segovia_
          </p>

          <p>
            GitHub:
            estefanisegovia2009-source
          </p>

          <p>
            Dirección:
            Buenos Aires,
            Argentina
          </p>
        </div>
      </div>

      <p className="footer-copy">
        ©{" "}
        {new Date().getFullYear()}
        {" "}
        True Beauty
      </p>
    </footer>
  );
}

export default Footer;