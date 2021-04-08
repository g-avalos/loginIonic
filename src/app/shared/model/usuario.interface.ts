export type Role = 'ADMIN' | 'ALUMNO' | 'DOCENTE';

export interface Usuario {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  password?: string;
  dni?: number;
  photoURL?: string;
  rol?: Role;
}
