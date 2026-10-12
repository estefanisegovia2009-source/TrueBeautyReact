import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import Loader from "../components/Loader.jsx";

import StatusMessage from "../components/StatusMessage.jsx";

import { getProductById } from "../services/products.service.js";

import { formatDate, formatPrice } from "../utils/format.js";

import { resolveImage } from "../utils/image.js";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="detail-main">
        <Loader text="Cargando producto..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="detail-main">
        <StatusMessage type="error">{error}</StatusMessage>

        <Link className="text-link" to="/products">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="detail-main">
        <StatusMessage>Producto no encontrado.</StatusMessage>
      </main>
    );
  }

  return (
    <main className="detail-main">
      <section className="detail-container">
        <div className="detail-photo">
          <img
            src={resolveImage(product.image)}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.src = "/images/placeholder-product.svg";
            }}
          />
        </div>

        <div className="detail-content">
          <span className="detail-tag">{product.category}</span>

          <h1>{product.name}</h1>

          <p className="detail-price">{formatPrice(product.price)}</p>

          <p className="detail-description">{product.description}</p>

          <p className="detail-date">
            Fecha de ingreso: {formatDate(product.createdAt)}
          </p>

          <div className="detail-buttons">
            <button
              type="button"
              onClick={() =>
                alert(`${product.name} agregado al carrito (demo).`)
              }
            >
              Agregar al carrito
            </button>

            <Link to="/products">Volver al catálogo</Link>
          </div>
        </div>
      </section>

      <section className="detail-extra">
        <h2>True Beauty</h2>

        <p>
          Productos seleccionados para acompañarte en tu rutina diaria y realzar
          tu belleza natural.
        </p>
      </section>
    </main>
  );
}

export default ProductDetail;
