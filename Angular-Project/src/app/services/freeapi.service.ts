import { Injectable } from "@angular/core"
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class freeApiService{

    constructor(private httpClient: HttpClient){

    }
    getCars(): Observable <any>{
        return this.httpClient.get("http://localhost:3000/api/cars")
    }
    saveCars(params): Observable <any>{
        return this.httpClient.post("http://localhost:3000/api/cars",params)
    }
    deleteCar(id): Observable <any>{
        const url = `http://localhost:3000/api/cars/${id}`
        return this.httpClient.delete(url)
    }
}

