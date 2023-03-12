import { API } from "@/types/api";
import type { PresignedPost } from "@aws-sdk/s3-presigned-post";
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
    return request("GET", url);
  },
  post<Q = object, R = object>(url: string, body: Q): Promise<R> {
    return request("POST", url, body);
  },
  put<Q = object, R = object>(url: string, body: Q): Promise<R> {
    return request("PUT", url, body);
  },
  delete<Q = object, R = object>(url: string, body: Q): Promise<R> {
    return request("DELETE", url, body);
  },
};

export function apiGetMe() {
  return client.get<UserPayload>("/api/user");
}

export async function putAuthor(body: API.PutAuthorRequestBody) {
  return client.put<API.PutAuthorRequestBody, API.PutAuthorResponseBody>(
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

export async function postImage(body: API.PostImageRequestBody) {
  return client.post<API.PostImageRequestBody, API.PostImageResponseBody>(
    "/api/image",
    body
  );
}

export async function deleteImage(body: API.DeleteImageRequestBody) {
  return client.delete<API.DeleteImageRequestBody, API.NoBody>(
    "/api/image",
    body
  );
}

export async function postSignedUrl(post: PresignedPost, blob: Blob) {
  const body = Object.keys(post.fields).reduce((p, c) => {
    p.append(c, post.fields[c])
    return p
  }, new FormData())
  body.append(
    'file',
    blob
  );
  const res = await fetch(post.url, {
    method: 'POST',
    body
  })
  if (!res.ok) {
    throw new Error(await res.text())
  }
}
