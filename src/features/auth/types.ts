export type LoginInput = { email: string; password: string };
export type RegisterInput = { name?: string; email: string; password: string };
export type AuthResponse = { token: string; user: { id: string; email: string; name?: string } };
