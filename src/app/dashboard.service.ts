import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  /*
    Get all the information of Obregon exposed on the server
  */
  getObregon() {
    return this.http.get('/obregon/').map((result) => {
      return result;
    });
  }

  /*
    Get all the information of Hermosillo exposed on the server
  */
  getHillo() {
    return this.http.get('/hermosillo/').map((result) => {
      return result;
    });
  }

  /*
    Get all the information of Navojoa exposed on the server
  */
  getNavo() {
    return this.http.get('/navojoa/').map((result) => {
      return result;
    });
  }

  /*
    Get all the information of Nogales exposed on the server
  */
  getNogal() {
    return this.http.get('/nogales/').map((result) => {
      return result;
    });
  }

}
