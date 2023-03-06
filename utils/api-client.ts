import { API } from "@/types/api";
import type { UserPayload } from "./token";

async function post<Q = object, R = object>(url: string, body: Q): Promise<R> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    try {
      throw new Error(await res.json());
    } catch {
      throw new Error(res.statusText);
    }
  }
  return res.json();
}

export function apiGetMe() {
  return get<UserPayload>("/api/user");
}

export async function postSubmission(body: API.PostSubmissionRequestBody) {
  return post<API.PostSubmissionRequestBody, API.PostSubmissionResponseBody>(
    "/api/submission",
    body
  );
}
