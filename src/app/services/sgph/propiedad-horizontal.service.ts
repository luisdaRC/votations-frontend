import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PropiedadHorizontal } from '../../models/PropiedadHorizontal.interface';
import { BienPrivado } from '../../models/BienPrivado.interface';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropiedadHorizontalService {


  constructor(private http: HttpClient, private userService: UserService) {
  }

// Study the way nilson and ariel register a new user with new role to apply the same. Start with ariel interview

  public postAdministrador(administrador: any) {
    return this.http.post(environment.url_sgph + 'propiedad-horizontal/administrador', administrador, this.userService.getTokenHeaders());
  }

  public getAdministrador() {
    let headers = this.userService.getTokenHeaders().headers;
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get(environment.url_sgph + 'propiedad-horizontal/administrador', {headers});
  }

  public getEmailPropietario(email: string) {
    return this.http.get(environment.url_sgph + 'propietario/' + email, this.userService.getTokenHeaders());
  }

  public postConsejoPropietario(idPropietario: number) {
    return this.http.post(environment.url_sgph + 'propietario/consejo?idPropietario=' + idPropietario, {}, this.userService.getTokenHeaders());
  }

  public deleteConsejoPropietario(idPropietario: number) {
    return this.http.delete(environment.url_sgph + 'propietario/consejo?idPropietario=' + idPropietario, this.userService.getTokenHeaders());
  }


  public getConsejoPropietario() {
    return this.http.get(environment.url_sgph + 'propietario/consejo?idPropiedadHorizontal=' + this.userService.getUsuario().idPropiedadHorizontal, this.userService.getTokenHeaders());

  }

  public getEmailPersona(email: string) {
    return this.http.get(environment.url_sgph + 'persona/' + email, this.userService.getTokenHeaders());
  }

  public pathPersona(persona: any, email: string) {
    return this.http.patch(environment.url_sgph + 'persona/' + email, persona, this.userService.getTokenHeaders());
  }


  public getAllBienPrivado(page = 0, size = 8) {
    return this.http.get(`${environment.url_sgph}bien-privado?idPropiedadHorizontal=${this.userService.getUsuario().idPropiedadHorizontal}&size=${size}&page=${page}`, this.userService.getTokenHeaders());
  }

  public getAllPropietario(page = 0, size = 8) {

    return this.http.get(`${environment.url_sgph}propietario?idPropiedadHorizontal=${this.userService.getUsuario().idPropiedadHorizontal}&size=${size}&page=${page}`, this.userService.getTokenHeaders());
  }

  public getAllResidente(page = 0, size = 8) {
    return this.http.get(`${environment.url_sgph}residente?idPropiedadHorizontal=${this.userService.getUsuario().idPropiedadHorizontal}&size=${size}&page=${page}`, this.userService.getTokenHeaders());
  }

  public getEstadisticas() {
    return this.http.get(environment.url_sgph + 'propiedad-horizontal/estadisticas?idPropiedadHorizontal=' + this.userService.getUsuario().idPropiedadHorizontal, this.userService.getTokenHeaders());
  }

  public getBienPrivado(index: number) {
    return this.http.get(environment.url_sgph + 'bien-privado/' + index, this.userService.getTokenHeaders());
  }

  public postAnuncio(anuncio: any) {
    const formData = new FormData();

    formData.append('titulo', anuncio.titulo);
    formData.append('tipo', anuncio.tipo);
    formData.append('dirigido', anuncio.dirigido);
    const fecha = anuncio.fechaEvento || new Date(Date.now());
    formData.append('fechaEvento', fecha.toISOString());
    formData.append('mensaje', anuncio.mensaje);
    formData.append('files', anuncio.archivo);
    formData.append('idPropiedadHorizontal', this.userService.getUsuario().idPropiedadHorizontal);

    return this.http.post(environment.url_sgph + 'anuncios', formData, this.userService.getTokenHeaders());
  }

  public getPropiedadesAsociadas() {
    return this.http.get(environment.url_sgph + 'propiedad-horizontal/list', this.userService.getTokenHeaders());
  }

  public getPersonaByIdentificacion(numeroIdentificacion: string, tipoIdentificacion: string) {
    return this.http.get(environment.url_sgph + 'persona?numeroDocumento=' + numeroIdentificacion + '&tipoDocumento=' + tipoIdentificacion, this.userService.getTokenHeaders());
  }

  public getIdPh() {
    return this.http.get(environment.url_sgph + 'propiedad-horizontal/list', this.userService.getTokenHeaders());
  }

  public getListPh(ids: number[]) {
    return this.http.get(environment.url_sgph.concat('propiedad-horizontal/listNames').concat(this.getQueryParamsIdPh(ids)), this.userService.getTokenHeaders());
  }


  private getQueryParamsIdPh(ids: number[]) {

    let queryParamsResult = '?idsPropiedadHorizontal=';
    if (ids.length > 0) {
      queryParamsResult = queryParamsResult.concat(ids[0].toString());
      const listIds = this.withoutThis(ids, ids[0]); // Take a look at doing by myself what this function does
      listIds.forEach(idPh => {
        queryParamsResult = queryParamsResult.concat('?idsPropiedadHorizontal=' + idPh.toString());
      });
    }
    return queryParamsResult;
  }

  private withoutThis(ids: number[], id: number){
    const newArray = [];
    let i;
    for (i = 1; i < ids.length; i++){
        newArray[i] = ids[i];
    }
    return newArray;
  }
}
