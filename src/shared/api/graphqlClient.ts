const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL no esta definida en el .env");
}

const GRAPHQL_ENDPOINT = `${API_URL.replace(/\/+$/, "")}/graphql`;

interface GraphQLError {
  message: string;
}

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: GraphQLError[];
}

interface GraphqlRequestOptions {
  signal?: AbortSignal;
}

export async function graphqlRequest<
  TData,
  TVariables extends object = Record<string, never>
>(
  query: string,
  variables?: TVariables,
  options?: GraphqlRequestOptions
): Promise<TData> {
  const token = localStorage.getItem("token");

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    signal: options?.signal,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query,
      variables: variables ?? {},
    }),
  });

  let result: GraphQLResponse<TData> = {};

  try {
    result = (await response.json()) as GraphQLResponse<TData>;
  } catch {
    result = {};
  }

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Sesion expirada.");
  }

  if (!response.ok) {
    if (import.meta.env.DEV) {
      const backendMessage = result.errors?.map((error) => error.message).join(", ");
      throw new Error(backendMessage || `Error GraphQL (${response.status})`);
    }

    throw new Error("No fue posible completar la consulta GraphQL.");
  }

  if (result.errors && result.errors.length > 0) {
    if (import.meta.env.DEV) {
      throw new Error(result.errors.map((error) => error.message).join(", "));
    }

    throw new Error("La consulta GraphQL regreso errores.");
  }

  if (!result.data) {
    throw new Error("La respuesta GraphQL no contiene datos.");
  }

  return result.data;
}
