import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Character } from '@shared/components/interfaces/character.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  searchCharacters(query = '', page = 1){
    
    //console.log('Query es: ' + query + ' y page es: ' + page);

    if(query==undefined){

      const filter = `${environment.baseUrlAPI}/?name=&page=${page}`;
    
      return this.http.get<Character[]>(filter);

    }

    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    
    return this.http.get<Character[]>(filter);
  }

  getDetails(id: number){

    console.log('El id es: ' + id);

    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`);
  }
}
