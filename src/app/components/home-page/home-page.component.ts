import { Component, OnInit, inject } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { IApiRespons, IPokemon, POKEMON_LOGO } from '../../models';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

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

  private pokemonsService = inject(PokemonsService);
  private readonly dialog = inject(MatDialog);
  
  public ngOnInit(): void {
    this.getData(0, this.pageSize);
  }

  public onPageChange(event: PageEvent): void {
    this.getData(event.pageIndex * event.pageSize, event.pageSize);
  }

  public selectPokemon(pokemon: IPokemon): void {
    this.openPokemonDetails(pokemon);
  }

  private getData(offset: number, perPage: number): void {
    this.pokemonsService.getPokemons(offset, perPage).subscribe((data: IApiRespons) => {
      this.totalItems = data.count;
      this.data = data.results?.map((pokemon: IPokemon) => {
        const id = pokemon.url?.split('/').filter(Boolean).pop() || '0';
        return { ...pokemon, id };
      })
    })
  }

  private openPokemonDetails(pokemon: IPokemon): void {
    this.dialog.open(PokemonDetailsComponent, {
      data: pokemon,
      maxWidth: '1000px',
      minWidth: '1000px',
    });
  }
}
