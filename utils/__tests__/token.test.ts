import { advanceTo } from "jest-date-mock";
import { createToken, verifyToken } from "../token";

beforeEach(() => {
  advanceTo(1674974716841);
});

test("generate token", async () => {
  const result = createToken("session-id", "user-id", 60);
  await expect(result).resolves.toMatch(
    /^eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9\.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsInVzZXIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc0OTc0NzE2LCJleHAiOjE2NzQ5NzQ3NzZ9\./
  );
});

test("verify token: ok", async () => {
  const token =
    "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsInVzZXIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc0OTc0NzE2LCJleHAiOjE2NzQ5NzQ3NzZ9.AOAqHyL-TJM8Cdy6CbRxcnUvXPK4khOwamM6KkSnYtkcklMW1jnwb13QWTkldWwZXrhdrfKVVA3vdcKInabfWtWLAQeiy7BXu6XLa1sYVm5YVZtnpDVDwGQjcTQbPbGiwL7CaIpQFaXIUsJTpjADy24kkkrqZZXmqm0teZxeoDdmCn3V";
  const result = verifyToken(token);
  await expect(result).resolves.toEqual({
    exp: 1674974776,
    iat: 1674974716,
    session: "session-id",
    user: "user-id",
  });
});

test("verify token: ng: invalid alg", async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6Im5vbmUifQ.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsInVzZXIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc0OTc0NzE2LCJleHAiOjE2NzQ5NzQ3NzZ9";
  await expect(verifyToken(token)).rejects.toThrowError("Invalid Compact JWS");
});

test("verify token: ng: expired", async () => {
  Date.now = jest.fn(() => 1674974777000);
  jest.spyOn(global, "Date").mockImplementation(() => new Date(1674974777000));

  const token =
    "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoic2Vzc2lvbi1pZCIsInVzZXIiOiJ1c2VyLWlkIiwiaWF0IjoxNjc0OTc0NzE2LCJleHAiOjE2NzQ5NzQ3NzZ9.AO_4fQQn3f9tUquL7JeuOQFeFDY8URkSqcmpZVHXM-lctafrr-cpGP0t_1Ndk2n7ZjiMd8B2_pYo6h_ZwJZBaMlmAOeKGoIzgwrf3OIBK4he7rPmYHLa7-kbs1piCnFKiTwBhVjhX2XW5_rsCBJO0bzqAMibV7GQFD9s2IEvS5NQB2_5";
  await expect(verifyToken(token)).rejects.toThrowError("signature verification failed");
});
