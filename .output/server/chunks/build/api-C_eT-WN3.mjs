class ApiError extends Error {
  status;
  data;
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}
const api = $fetch.create({
  baseURL: "/api"
});
async function apiUpload(path, formData) {
  const res = await fetch(`/api${path}`, {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  if (!res.ok) {
    throw new ApiError(data.error || "Error en la solicitud.", res.status, data);
  }
  return data;
}

export { api as a, apiUpload as b };
//# sourceMappingURL=api-C_eT-WN3.mjs.map
