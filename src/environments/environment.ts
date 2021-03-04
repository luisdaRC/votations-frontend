// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { environment as defaultEnvironment } from './environment.defaults';

export const environment = {
  ...defaultEnvironment,
  production: false,
  url_sgph: 'https://sgph-services-dev.herokuapp.com/',
  url_verificacion_identidad: '',
  url_actividades_asamblearias: '',
  url_votaciones: '',
  url_control: 'https://control-microservice.herokuapp.com/'
//  url_control: 'http://localhost:8084/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * url_control: 'https://control-microservice----herokuapp.com/'
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
