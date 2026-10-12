import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";

import Loader from "../components/Loader.jsx";

import StatusMessage from "../components/StatusMessage.jsx";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/users.service.js";

import { formatDate } from "../utils/format.js";

const emptyValues = {
  name: "",
  email: "",
  password: "",
  birthDate: "",
  province: "",
};

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: emptyValues,
  });

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      setStatus({
        type: "error",

        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const startCreate = () => {
    setSelectedUser(null);

    reset(emptyValues);

    setStatus({
      type: "",
      message: "",
    });
  };

  const startEdit = (user) => {
    setSelectedUser(user);

    reset({
      name: user.name ?? "",

      email: user.email ?? "",

      password: user.password ?? "",

      birthDate: user.birthDate ? String(user.birthDate).slice(0, 10) : "",

      province: user.province ?? "",
    });

    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({
        behavior: "smooth",

        block: "start",
      }),
    );
  };

  const onSubmit = async (data) => {
    try {
      setSaving(true);

      setStatus({
        type: "",
        message: "",
      });

      const payload = {
        ...data,

        createdAt: selectedUser?.createdAt || new Date().toISOString(),
      };

      if (selectedUser) {
        const updated = await updateUser(selectedUser.id, payload);

        setUsers((current) =>
          current.map((user) => (user.id === selectedUser.id ? updated : user)),
        );

        setStatus({
          type: "success",

          message: "Usuario actualizado correctamente en MockAPI.",
        });
      } else {
        const created = await createUser(payload);

        setUsers((current) => [created, ...current]);

        setStatus({
          type: "success",

          message: "Usuario creado correctamente en MockAPI.",
        });
      }

      startCreate();
    } catch (error) {
      setStatus({
        type: "error",

        message: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`¿Seguro que querés eliminar a ${user.name}?`)) {
      return;
    }

    try {
      await deleteUser(user.id);

      setUsers((current) => current.filter((item) => item.id !== user.id));

      if (selectedUser?.id === user.id) {
        startCreate();
      }

      setStatus({
        type: "success",

        message: "Usuario eliminado correctamente de MockAPI.",
      });
    } catch (error) {
      setStatus({
        type: "error",

        message: error.message,
      });
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-title">
        <h1>Administrador de usuarios</h1>

        <p>Gestioná los usuarios registrados en True Beauty.</p>
      </section>

      <StatusMessage type={status.type}>{status.message}</StatusMessage>

      <section className="admin-section">
        <div className="admin-section-heading">
          <h2>Listado de usuarios</h2>

          <button className="secondary-btn" type="button" onClick={loadUsers}>
            Actualizar lista
          </button>
        </div>

        {loading ? (
          <Loader text="Cargando usuarios..." />
        ) : (
          <div className="table-container">
            <table className="products-table users-table">
              <thead>
                <tr>
                  <th>Nombre</th>

                  <th>Email</th>

                  <th>Nacimiento</th>

                  <th>Provincia</th>

                  <th>Alta</th>

                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6">No hay usuarios cargados.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>{formatDate(user.birthDate)}</td>

                      <td>{user.province}</td>

                      <td>{formatDate(user.createdAt)}</td>

                      <td className="actions">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => startEdit(user)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDelete(user)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section" ref={formRef}>
        <h2>
          {selectedUser ? `Editar: ${selectedUser.name}` : "Crear usuario"}
        </h2>

        <form
          className="admin-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="userName">Nombre completo</label>

            <input
              id="userName"
              type="text"
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
            />

            {errors.name && (
              <small className="field-error">{errors.name.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="userEmail">Email</label>

            <input
              id="userEmail"
              type="email"
              {...register("email", {
                required: "El email es obligatorio",

                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                  message: "Email inválido",
                },
              })}
            />

            {errors.email && (
              <small className="field-error">{errors.email.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="userPassword">Contraseña</label>

            <input
              id="userPassword"
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",

                minLength: {
                  value: 6,

                  message: "Mínimo 6 caracteres",
                },
              })}
            />

            {errors.password && (
              <small className="field-error">{errors.password.message}</small>
            )}

            <small className="form-help">
              La contraseña se edita, pero no se muestra en la tabla.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="userBirthDate">Fecha de nacimiento</label>

            <input
              id="userBirthDate"
              type="date"
              {...register("birthDate", {
                required: "La fecha es obligatoria",
              })}
            />

            {errors.birthDate && (
              <small className="field-error">{errors.birthDate.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="userProvince">Provincia</label>

            <input
              id="userProvince"
              type="text"
              {...register("province", {
                required: "La provincia es obligatoria",
              })}
            />

            {errors.province && (
              <small className="field-error">{errors.province.message}</small>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={saving}>
              {saving
                ? "Guardando..."
                : selectedUser
                  ? "Guardar cambios"
                  : "Crear usuario"}
            </button>

            {selectedUser && (
              <button
                type="button"
                className="cancel-btn"
                onClick={startCreate}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

export default AdminUsers;
