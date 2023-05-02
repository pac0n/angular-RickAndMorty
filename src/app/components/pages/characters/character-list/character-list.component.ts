import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { CharacterService } from '@app/shared/services/character.service';
import { Character } from '@app/shared/components/interfaces/character.interfaces';

import { take, filter } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { DOCUMENT } from '@angular/common';

type RequestInfo = {
  next: string;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  info: RequestInfo = {
    next: ''
  }

  showGoUpButton = false;

  private pageNum = 1;
  private query: string = '';
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(
    @Inject(DOCUMENT) private document:Document, 
    private characterSvc: CharacterService, 
    private route: ActivatedRoute,
    private router: Router
    ){
      this.onUrlChanged();
    }

  ngOnInit(): void {
    //this. getDataFromService();
    this.getCharactersByQuery();
  }

  @HostListener('window:scroll', [])
  onWindowScroll():void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  onScrollDown():void{
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromService();
    }
  }

  onScrollTop():void{
    this.document.body.scrollTop = 0; // Safari
    this.document.documentElement.scrollTop = 0; // Other
  }

  private onUrlChanged(): void {

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      })
  }

  private getCharactersByQuery(): void {

    this.route.queryParamMap.pipe(
      take(1)
    ).subscribe((params: ParamMap) => {

      console.log('Params: ', params);

      this.query = params.get('q');
      this.getDataFromService();
    });
  }

  private getDataFromService(): void {
    this.characterSvc.searchCharacters(this.query, this.pageNum)
    .pipe(take(1))
    .subscribe((res: any) => {

      console.log('Query es: ' + this.query)

      if(res?.results?.length){

        console.log('Response: ', res);
        const { info, results} = res;
        this.characters = [...this.characters, ...results];
        this.info = info;
      } else {
        this.characters = [];
      }
    });
  }

}
