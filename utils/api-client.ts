import type { UserPayload } from "./token";

async function validate<T>(promise: Promise<Response>): Promise<T> {
  const res = await promise;
  if (!res.ok) {
    try {
      throw new Error(await res.json());
    } catch {
      throw new Error(res.statusText);
    }
  }
  const body = await res.json();
  return body;
}

export function apiGetMe() {
  return validate<UserPayload>(fetch("/api/user"));
}