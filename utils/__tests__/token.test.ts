import { advanceTo } from "jest-date-mock";
import { createToken, verifyToken } from "../token";

beforeEach(() => {
  advanceTo(1674974716841);
});

test("generate token", async () => {
  const result = createToken(
    {
      id: "test-user-id",
      username: "test-user-name",
      discriminator: "0123",
      avatarUrl: "test-avatar-url",
    },
    60
  );
  await expect(result).resolves.toMatch(
    /^eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9\.eyJ1c2VyIjp7ImlkIjoidGVzdC11c2VyLWlkIiwidXNlcm5hbWUiOiJ0ZXN0LXVzZXItbmFtZSIsImRpc2NyaW1pbmF0b3IiOiIwMTIzIiwiYXZhdGFyVXJsIjoidGVzdC1hdmF0YXItdXJsIn0sImlhdCI6MTY3NDk3NDcxNiwiZXhwIjoxNjc0OTc0Nzc2fQ\./
  );
});

test("verify token: ok", async () => {
  const token =
    "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoidGVzdC11c2VyLWlkIiwidXNlcm5hbWUiOiJ0ZXN0LXVzZXItbmFtZSIsImRpc2NyaW1pbmF0b3IiOiIwMTIzIiwiYXZhdGFyVXJsIjoidGVzdC1hdmF0YXItdXJsIn0sImlhdCI6MTY3NDk3NDcxNiwiZXhwIjoxNjc0OTc0Nzc2fQ.AfN3srZMXX6Rxi8bLMxDJ-vbeHEmDiLKnaMaQEHdzFWVdAulHTBJYltW9DU9SgxiXaUNsVeT-BDLhl9h4wAB3SeIAa5ytGcIk35HDyjqoNsWrdx8qw8YarOkYSUGc6DTG0SjakEju85ntM0l096NRdfPAAqUOQ1GGyE8EatQ-EmFQjLh";
  const result = verifyToken(token);
  await expect(result).resolves.toEqual({
    exp: 1674974776,
    iat: 1674974716,
    user: {
      id: "test-user-id",
      username: "test-user-name",
      discriminator: "0123",
      avatarUrl: "test-avatar-url",
    },
  });
});

test("verify token: ng: invalid alg", async () => {
  const token =
    "eyJ0eXAiOiJub25lIiwiYWxnIjoiSFMyNTYifQo.eyJ1c2VyIjp7ImlkIjoidGVzdC11c2VyLWlkIiwidXNlcm5hbWUiOiJ0ZXN0LXVzZXItbmFtZSIsImRpc2NyaW1pbmF0b3IiOiIwMTIzIiwiYXZhdGFyVXJsIjoidGVzdC1hdmF0YXItdXJsIn0sImlhdCI6MTY3NDk3NDcxNiwiZXhwIjoxNjc0OTc0Nzc2fQ";
  await expect(verifyToken(token)).rejects.toThrowError("Invalid Compact JWS");
});

test("verify token: ng: expired", async () => {
  advanceTo(1674974716841 + 1000 * 60 * 60);
  const token =
    "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoidGVzdC11c2VyLWlkIiwidXNlcm5hbWUiOiJ0ZXN0LXVzZXItbmFtZSIsImRpc2NyaW1pbmF0b3IiOiIwMTIzIiwiYXZhdGFyVXJsIjoidGVzdC1hdmF0YXItdXJsIn0sImlhdCI6MTY3NDk3NDcxNiwiZXhwIjoxNjc0OTc0Nzc2fQ.AfN3srZMXX6Rxi8bLMxDJ-vbeHEmDiLKnaMaQEHdzFWVdAulHTBJYltW9DU9SgxiXaUNsVeT-BDLhl9h4wAB3SeIAa5ytGcIk35HDyjqoNsWrdx8qw8YarOkYSUGc6DTG0SjakEju85ntM0l096NRdfPAAqUOQ1GGyE8EatQ-EmFQjLh";
  await expect(verifyToken(token)).rejects.toThrowError(
    '"exp" claim timestamp check failed'
  );
});
