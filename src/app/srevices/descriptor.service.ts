import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpEventType,HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Descriptor } from '../model/Descriptor';

//import 'rxjs/add/operator/toPromise';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DescriptorService {

  baseUrl: string='http://localhost:8081/api/v1';
 // private baseUrl = '/api/v1';

  constructor(private http: HttpClient) { }

  getDescriptor(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.baseUrl + '/upload', formData)
        .pipe(
            tap(descriptor => console.log(descriptor)),
           
        );
}

  
  upload(formData){
    return this.http.post('/api/v1/upload', formData, {
      reportProgress: true,
      observe: 'events'   
  }).subscribe(events => {
    if(events.type == HttpEventType.UploadProgress) {
        console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
    } else if(events.type === HttpEventType.Response) {
        console.log(events);
    }
});
  
  }


  download (){
   
    return this.http.get(this.baseUrl+'/download',{
      
      responseType: 'arraybuffer'
    })
  }

  createDescriptor(descriptor: Object): Observable<Object> {
    return this.http.post<Descriptor>(this.baseUrl+'/descriptor', descriptor);
    
 
  }
  addDescriptor(descriptor: Object): Observable<any> {
    return this.http.post<Descriptor>(this.baseUrl+'/saveConfigDescriptor', descriptor);
    
 
  }

  updateDescriptor(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteDescriptor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getDescriptorList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}