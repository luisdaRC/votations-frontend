import { Injectable } from '@angular/core';
import { Usuario } from '../../models/Usuario.interface';
import { UsuarioControl} from '../../models/UsuarioControl.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario: Usuario;
  public usuarioControl: UsuarioControl;
  public token: string;
  public refresh: string;


  constructor(public http: HttpClient, public router: Router) {
    this.upStorage();
  }


  public getIdPh(): string {
    return this.usuario.idPropiedadHorizontal || '';
  }
  public getIdPhControl(): string {
    return this.usuarioControl.idPropiedadHorizontal;
  }
  public getUsuario(): Usuario {
    return this.usuario;
  }
  public getUsuarioControl(): UsuarioControl {
    return this.usuarioControl;
  }
  public getToken(): string {
    return this.token;
  }
  public getRefresh(): string {
    return this.refresh;
  }

  public isAdmin(){
    return this.getRoles().includes('ADMINISTRADOR');
  }

  public isSuperAdmin(){
    return this.getRoles().includes('SUPER_ADMINISTRADOR');
  }

  public getRoles(){
    return this.usuario.roles;
  }

  public getRol(rol: string): boolean{

    return this.usuario ? this.usuario.roles.includes(rol) : false;
  }

  public getRolControl(){
    return this.usuarioControl.rol;
  }

  public getRolPhMan(roles: string[]) {

    const ROLES_CORE = ['SUPER_ADMINISTRADOR', 'ADMINISTRADOR'];

    const ROL = roles.find(elemt => elemt == 'SUPER_ADMINISTRADOR' || elemt == 'ADMINISTRADOR');
    return ROL ? ROL : roles.filter(x => !ROLES_CORE.includes(x))[0];
  }

  public upStorage(): void {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.refresh = localStorage.getItem('refresh');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

    } else {
      this.token = '';
      this.refresh = '';
      this.usuario = null;
      this.usuarioControl = JSON.parse(localStorage.getItem('usuario'));
    }

  }

  public saveStorage(token: string, refresh: string, usuario: Usuario): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  public saveStorageControl(usuario: UsuarioControl): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioControl = usuario;
  }

  public logout(): void {
    this.usuario = null;
    this.usuarioControl = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  public postIniciarSesion(user: Usuario) {
    return this.http.post(environment.url_sgph + 'auth/signin', user).pipe(map((data: any) => {
      this.saveStorage(data.token, data.refresh, {
        email: data.email,
        idPersona: data.id,
        roles: data.roles,
        nombre: data.nombre,
        apellido: data.apellido,
        idPropiedadHorizontal: data.idPropiedadHorizontal,
        nombrePH: data.nombrePH,
        cambiarContraseña: data.cambiarContraseña
      });
      return data;
    }));
  }

  public postLoginControl(user: UsuarioControl) {
    return this.http.post(environment.url_control + 'personal-apoyo/signin', user).pipe(map((data: any) => {
      this.saveStorageControl({
        nombres: data.nombres,
        email: data.email,
        rol: data.rol,
        idPropiedadHorizontal: data.idPropiedadHorizontal,
        nombrePH: data.nombrePH
      });
      return data;
    }));
  }


  public postCambiarContrasena(pass){ // Usar para realizar cambios de pass de revisor y secretario
    return this.http.post(environment.url_sgph  + 'auth/change-password', pass, this.getTokenHeaders());
  }

  public setPhByUser(idPropiedadHorizontal){
    this.usuario.idPropiedadHorizontal = idPropiedadHorizontal;
    this.saveStorage(this.token, this.refresh, this.usuario);

  }

  public inSession(): boolean {
    if (this.token.length > 5
      || this.getRolControl().includes('REVISOR')
      || this.getRolControl().includes('SECRETARIO')) return true;
    return false;
  }
  public getTokenHeaders(){
    const headers =  new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
    return {headers};
  }

}
