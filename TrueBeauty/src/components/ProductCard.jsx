import {
  Link,
} from "react-router-dom";

import {
  resolveImage,
} from "../utils/image.js";

import {
  formatPrice,
} from "../utils/format.js";

function ProductCard({
  product,
}) {
  return (
    <article className="product-card">
      <img
        src={
          resolveImage(
            product.image
          )
        }
        alt={
          product.name ||
          "Producto True Beauty"
        }
        onError={(event) => {
          event.currentTarget.src =
            "/images/placeholder-product.svg";
        }}
      />

      <div className="product-info">
        <h3>
          {product.name}
        </h3>

        <p className="category">
          {product.category}
        </p>

        <p className="price">
          {formatPrice(
            product.price
          )}
        </p>

        <div className="card-actions">
          <button
            type="button"
            onClick={() =>
              alert(
                `${product.name} agregado al carrito (demo).`
              )
            }
          >
            Agregar
          </button>

          <Link
            to={
              `/products/${product.id}`
            }
          >
            Ver más
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;