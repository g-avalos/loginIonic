export type Role = 'ADMIN' | 'ALUMNO' | 'DOCENTE';

export interface Usuario {
  uid: string;
  email: string;
  nombre?: string;
  emailVerificado: boolean;
  password?: string;
  foto?: string;
  rol?: Role;
}
