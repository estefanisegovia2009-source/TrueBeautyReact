import { BASE_URL } from "./api.config.js";

const PRODUCTS_URL =
  `${BASE_URL}/products`;

async function parseResponse(
  response,
  fallbackMessage
) {
  if (!response.ok) {
    let detail = "";

    try {
      const data =
        await response.json();

      detail =
        data?.message
          ? `: ${data.message}`
          : "";
    } catch {
      
    }

    throw new Error(
      `${fallbackMessage}${detail}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getProducts() {
  try {
    const response =
      await fetch(PRODUCTS_URL);

    return await parseResponse(
      response,
      "No se pudieron cargar los productos"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al cargar productos"
    );
  }
}

export async function getProductById(id) {
  try {
    const response =
      await fetch(
        `${PRODUCTS_URL}/${id}`
      );

    return await parseResponse(
      response,
      "No se pudo cargar el producto"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al cargar el producto"
    );
  }
}

export async function createProduct(data) {
  try {
    const response =
      await fetch(
        PRODUCTS_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(data),
        }
      );

    return await parseResponse(
      response,
      "No se pudo crear el producto"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al crear el producto"
    );
  }
}

export async function updateProduct(
  id,
  data
) {
  try {
    const response =
      await fetch(
        `${PRODUCTS_URL}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(data),
        }
      );

    return await parseResponse(
      response,
      "No se pudo actualizar el producto"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al actualizar el producto"
    );
  }
}

export async function deleteProduct(id) {
  try {
    const response =
      await fetch(
        `${PRODUCTS_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

    return await parseResponse(
      response,
      "No se pudo eliminar el producto"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al eliminar el producto"
    );
  }
}