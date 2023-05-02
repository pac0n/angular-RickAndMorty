import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


const myComponents = [
  CharacterDetailsComponent,
  CharacterListComponent
];


@NgModule({
  declarations: [ ...myComponents],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    InfiniteScrollModule
  ],
  exports: [ ...myComponents]
})
export class CharactersModule { }
