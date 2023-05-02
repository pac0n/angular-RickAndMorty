import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Location } from '@angular/common';

import { CharacterService } from '@app/shared/services/character.service';
import { Character } from '@app/shared/components/interfaces/character.interfaces';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character$: Observable<Character>

  constructor(
    private route: ActivatedRoute, 
    private characterSvc: CharacterService,
    private location: Location
    ) {}

  ngOnInit(): void {
    
    this.route.params.pipe( take(1)).subscribe((params) => {
      const id = params['id'];
      this.character$ = this.characterSvc.getDetails(id);

    })    
  }

  onGoBack(): void {

    this.location.back();
  }

}
