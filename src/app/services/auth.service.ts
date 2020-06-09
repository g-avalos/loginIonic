import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Usuario } from 'src/app/shared/model/usuario.interface';
import { Observable, of, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService  {
  public usuario$: Observable<Usuario>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, private router: Router) {
    this.usuario$ = this.afAuth.authState.pipe(
      switchMap((usuario) => {
        if (usuario) {
          return this.afs.doc<Usuario>(`usuarios/${usuario.uid}`).valueChanges();
        }

        return of(null);
      })
    );
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      await this.updateUsuario(result.user);

      return result.user;
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      this.enviarMailVerificacion();

      return result.user;
    } catch (error) {
      console.log("Error -> ", error);
    }
 }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  async enviarMailVerificacion(): Promise<void> {
    await (await this.afAuth.currentUser).sendEmailVerification();
  }

  async loginWithGoogle(): Promise<User> {
    try {
      const result = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());

      await this.updateUsuario(result.user);

      return result.user;
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  async loginWithGithub(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new auth.GithubAuthProvider());

      await this.updateUsuario(user);

      return user;
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log("Error -> ", error);
    }
  }

  private async updateUsuario(usuario: User) {
    console.log(usuario.uid);

    const usuarioRef : AngularFirestoreDocument<Usuario> = this.afs.doc<Usuario>(`usuarios/${usuario.uid}`);
    let userRol;

    try {
      userRol = (await usuarioRef.ref.get()).data()['rol'];
    } catch (error) {
      if (!userRol) {
        userRol = 'ALUMNO';
      }  
    }

    const datos: Usuario = {
      uid: usuario.uid,
      email: usuario.email,
      emailVerificado: usuario.emailVerified,
      foto: usuario.photoURL,
      nombre: usuario.displayName,
      rol: userRol
    };

    return usuarioRef.set(datos, { merge: true });
  }

  public userRedirect(user: User) {
    if (user) {
      if (user.emailVerified) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/confirmacion']);
      }
    } else {
      this.router.navigate(['/register']);
    }
  }
} 
