import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { createToken, verifyToken } from "../token";

test("generate token", () => {
  Date.now = jest.fn(() => 1674974716841);

  const token = createToken("session-id", "user-id", 60);
  expect(token).toMatch(
    /^eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9\.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsInVzZXIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc0OTc0NzE2LCJleHAiOjE2NzQ5NzQ3NzZ9\./
  );
});

test("verify token: ok", () => {
  const token =
    "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsInVzZXIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc0OTc0NzE2LCJleHAiOjE2NzQ5NzQ3NzZ9.AO_4fQQn3f9tUquL7JeuOQFeFDY8URkSqcmpZVHXM-lctafrr-cpGP0t_1Ndk2n7ZjiMd8B2_pYo6h_ZwJZBaMlmAOeKGoIzgwrf3OIBK4he7rPmYHLa7-kbs1piCnFKiTwBhVjhX2XW5_rsCBJO0bzqAMibV7GQFD9s2IEvS5NQB2_5";
  const result = verifyToken(token);
  expect(result).toEqual({
    exp: 1674974776,
    iat: 1674974716,
    session: "session-id",
    user: "user-id",
  });
});

test("verify token: ng: invalid alg", () => {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0K.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsInVzZXIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc0OTc0NzE2LCJleHAiOjE2NzQ5NzQ3NzZ9.L3evL8W1KIjxagrW_33Ko68qqKkUxmqXPRBnCch4ZjA";
  expect(() => verifyToken(token)).toThrowError(JsonWebTokenError);
});

test("verify token: ng: expired", () => {
  Date.now = jest.fn(() => 1674974777000);

  const token =
    "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsInVzZXIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc0OTc0NzE2LCJleHAiOjE2NzQ5NzQ3NzZ9.AO_4fQQn3f9tUquL7JeuOQFeFDY8URkSqcmpZVHXM-lctafrr-cpGP0t_1Ndk2n7ZjiMd8B2_pYo6h_ZwJZBaMlmAOeKGoIzgwrf3OIBK4he7rPmYHLa7-kbs1piCnFKiTwBhVjhX2XW5_rsCBJO0bzqAMibV7GQFD9s2IEvS5NQB2_5";
  expect(() => verifyToken(token)).toThrowError(TokenExpiredError);
});
