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

export async function postSubmission(body: API.PostSubmissionRequestBody) {
  return client.post<API.PostSubmissionRequestBody, API.PostSubmissionResponseBody>(
    "/api/submission",
    body
  );
}

export async function deleteSubmission(body: API.DeleteSubmissionRequestBody) {
  return client.delete<API.DeleteSubmissionRequestBody, API.NoBody>(
    "/api/submission",
    body
  );
}
