import { Component, OnInit, inject } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { IApiRespons, IPokemon, POKEMON_LOGO } from '../../models';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  public readonly POKEMON_LOGO = POKEMON_LOGO;
  public data: IPokemon[] = [];
  public displayedColumns: string[] = ['id', 'name'];
  public totalItems = 0;
  public pageSize = 10;

  public pokemonsService = inject(PokemonsService);
  
  public ngOnInit(): void {
    this.getData(0, this.pageSize);
  }

  public onPageChange(event: PageEvent): void {
    this.getData(event.pageIndex * event.pageSize, event.pageSize);
  }

  private getData(offset: number, perPage: number): void {
    this.pokemonsService.getPokemons(offset, perPage).subscribe((data: IApiRespons) => {
      this.totalItems = data.count;
      this.data = data.results?.map((pokemon: IPokemon) => {
        const id = pokemon.url?.split('/').filter(Boolean).pop();
        return { ...pokemon, id };
      })
    })
  }
}
