import { Usuario } from '../shared/model/usuario.interface';

export class RoleValidatorService {

  constructor() { }

  esAlumno(usuario: Usuario): boolean {
    return usuario.rol === 'ALUMNO';
  }

  esDocente(usuario: Usuario): boolean {
    return usuario.rol === 'DOCENTE';
  }

  esAdmin(usuario: Usuario): boolean {
    return usuario.rol === 'ADMIN';
  }
}
