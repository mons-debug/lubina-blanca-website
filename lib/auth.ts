import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "lubinablanca-secret-key-change-in-production"
);

// Default admin credentials (hashed password for "lubinablanca2024")
const ADMIN_USERS = [
  {
    id: "1",
    username: "admin",
    // Password: lubinablanca2024
    passwordHash: "$2b$10$42KN4v9qdRh2pM89B4Dzteg2A2lhe4rw548ZY6WXhGbF4LDvdLH8i",
  },
];

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);

  return token;
}

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return { userId: payload.userId as string };
  } catch {
    return null;
  }
}

export async function validateCredentials(
  username: string,
  password: string
): Promise<{ id: string; username: string } | null> {
  const user = ADMIN_USERS.find((u) => u.username === username);
  
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  
  if (!isValid) {
    return null;
  }

  return { id: user.id, username: user.username };
}

export async function getSessionFromCookie(cookieHeader: string | null): Promise<{ userId: string } | null> {
  if (!cookieHeader) {
    return null;
  }

  const token = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("admin_token="))
    ?.split("=")[1];

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

