import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTruckFast,
  faCreditCard,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import ProductCard from "../components/ProductCard.jsx";

import Loader from "../components/Loader.jsx";

import StatusMessage from "../components/StatusMessage.jsx";

import { getProducts } from "../services/products.service.js";

function Home() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (active) {
          setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <section className="home-banner">
        <div className="home-banner-content">
          <h1>True Beauty</h1>

          <p>Maquillaje para realzar tu belleza natural.</p>

          <Link to="/products">Ver productos</Link>
        </div>
      </section>

      <section className="hero">
        <div className="hero-text">
          <h2>Productos pensados para cada estilo</h2>

          <p>
            En True Beauty encontrás maquillaje moderno, delicado y de calidad.
            Nuestra tienda está pensada para acompañarte en tu rutina diaria y
            ayudarte a destacar tu belleza natural.
          </p>
        </div>

        <div className="hero-image">
          <img
            src="/images/Portada.jpg"
            alt="Presentación de maquillaje True Beauty"
          />
        </div>
      </section>

      <section className="featured-products">
        <h2>Productos destacados</h2>

        {loading && <Loader text="Cargando productos destacados..." />}

        <StatusMessage type="error">{error}</StatusMessage>

        {!loading && !error && products.length === 0 && (
          <StatusMessage>No hay productos cargados todavía.</StatusMessage>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="benefits">
        <article className="benefit-card">
          <FontAwesomeIcon icon={faTruckFast} className="benefit-icon" />

          <h3>Envíos</h3>

          <p>Realizamos envíos a todo el país.</p>
        </article>

        <article className="benefit-card">
          <FontAwesomeIcon icon={faCreditCard} className="benefit-icon" />

          <h3>Pagos seguros</h3>

          <p>Pagá con tarjeta, transferencia o medios digitales.</p>
        </article>

        <article className="benefit-card">
          <FontAwesomeIcon icon={faStar} className="benefit-icon" />

          <h3>Calidad</h3>

          <p>Productos seleccionados para tu rutina diaria.</p>
        </article>
      </section>
    </main>
  );
}

export default Home;
