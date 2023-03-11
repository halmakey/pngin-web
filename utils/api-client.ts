import { API } from "@/types/api";
import type { UserPayload } from "./token";

async function request<Q = object, R = object>(
  method: string,
  url: string,
  body?: Q
): Promise<R> {
  const res = await fetch(url, {
    method,
    headers: body
      ? {
          "Content-Type": "application/json",
        }
      : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    try {
      throw new Error(await res.json());
    } catch {
      throw new Error(res.statusText);
    }
  }
  return res.json();
}

const client = {
  get<T>(url: string): Promise<T> {
    return request("GET", url)
  },
  post<Q = object, R = object>(url: string, body: Q): Promise<R> {
    return request("POST", url, body);
  },
  delete<Q = object, R = object>(url: string, body: Q): Promise<R> {
    return request("DELETE", url, body);
  }
}

export function apiGetMe() {
  return client.get<UserPayload>("/api/user");
}

export async function postAuthor(body: API.PostAuthorRequestBody) {
  return client.post<API.PostAuthorRequestBody, API.PostAuthorResponseBody>(
    "/api/author",
    body
  );
}

export async function deleteAuthor(body: API.DeleteAuthorRequestBody) {
  return client.delete<API.DeleteAuthorRequestBody, API.NoBody>(
    "/api/author",
    body
  );
}
