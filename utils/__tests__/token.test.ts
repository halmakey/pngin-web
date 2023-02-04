import { advanceTo } from "jest-date-mock";
import { createToken, verifyToken } from "../token";

beforeEach(() => {
  advanceTo(1674974716841);
});

test("generate token", async () => {
  const result = createToken("session-id", 60);
  await expect(result).resolves.toMatch(
    /^eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9\.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsImlhdCI6MTY3NDk3NDcxNiwiZXhwIjoxNjc0OTc0Nzc2fQ\./
  );
});

test("verify token: ok", async () => {
  const token =
    "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsImlhdCI6MTY3NDk3NDcxNiwiZXhwIjoxNjc0OTc0Nzc2fQ.AVGrqXNEbHYMdStGKPk-S6gOP9_wpPCMQMQirqv16X8e5zGZlMModIzv_FdxGqs8CY5SteFS28JWX6Hpa1rL2RUnACJEvqyY-OYbDT4nTqcN4m0YYkCYFJQ9pW7t0CIkC1KzUexN4_qDaPXlWpxKeSTWvfg8T4zoH9oSfSvT4h9muNQz";
  const result = verifyToken(token);
  await expect(result).resolves.toEqual({
    exp: 1674974776,
    iat: 1674974716,
    session: "session-id",
  });
});

test("verify token: ng: invalid alg", async () => {
  const token =
    "eyJ0eXAiOiJub25lIiwiYWxnIjoiSFMyNTYifQo.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsImlhdCI6MTY3NDk3NDcxNiwiZXhwIjoxNjc0OTc0Nzc2fQ";
  await expect(verifyToken(token)).rejects.toThrowError("Invalid Compact JWS");
});

test("verify token: ng: expired", async () => {
  advanceTo(1670000000)
  const token =
    "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsImlhdCI6MTY3NDk3NDcxNiwiZXhwIjoxNjc0OTc0Nzc2fQ.AVGrqXNEbHYMdStGKPk-S6gOP9_wpPCMQMQirqv16X8e5zGZlMModIzv_FdxGqs8CY5SteFS28JWX6Hpa1rL2RUnACJEvqyY-OYbDT4nTqcN4m0YYkCYFJQ9pW7t0CIkC1KzUexN4_qDaPXlWpxKeSTWvfg8T4zoH9oSfSvT4h9muNQz";
  await expect(verifyToken(token)).rejects.toThrowError("Expired");
});
