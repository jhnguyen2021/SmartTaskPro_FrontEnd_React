import api from '../../lib/axios';
import type { LoginInput, RegisterInput, AuthResponse } from './types'


export async function loginApi(body: LoginInput): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', body);
  return data;
}
export async function registerApi(body: RegisterInput): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', body);
  return data;
}
