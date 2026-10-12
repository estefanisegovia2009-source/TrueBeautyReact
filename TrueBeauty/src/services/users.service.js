import { BASE_URL } from "./api.config.js";

const USERS_URL =
  `${BASE_URL}/users`;

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

export async function getUsers() {
  try {
    const response =
      await fetch(USERS_URL);

    return await parseResponse(
      response,
      "No se pudieron cargar los usuarios"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al cargar usuarios"
    );
  }
}

export async function getUserById(id) {
  try {
    const response =
      await fetch(
        `${USERS_URL}/${id}`
      );

    return await parseResponse(
      response,
      "No se pudo cargar el usuario"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al cargar el usuario"
    );
  }
}

export async function createUser(data) {
  try {
    const response =
      await fetch(
        USERS_URL,
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
      "No se pudo crear el usuario"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al crear el usuario"
    );
  }
}

export async function updateUser(
  id,
  data
) {
  try {
    const response =
      await fetch(
        `${USERS_URL}/${id}`,
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
      "No se pudo actualizar el usuario"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al actualizar el usuario"
    );
  }
}

export async function deleteUser(id) {
  try {
    const response =
      await fetch(
        `${USERS_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

    return await parseResponse(
      response,
      "No se pudo eliminar el usuario"
    );
  } catch (error) {
    throw new Error(
      error.message ||
      "Error de conexión al eliminar el usuario"
    );
  }
}