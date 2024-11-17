import { Component, OnInit, inject } from '@angular/core';
import { IPokemon } from '../../models';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { PokemonsService } from '../../services/pokemons.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    MatDialogContent,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit {

  public pokemonFormGroup: FormGroup = new FormGroup({ });
  public isLoading = true;

  private readonly data = inject<IPokemon>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private pokemonsService = inject(PokemonsService);

  public ngOnInit(): void {
    this.getPokemonDetails();
  }

  public getFormControl(name: string): FormControl {
    return this.pokemonFormGroup.get(name) as FormControl;
  }

  private getPokemonDetails(): void {
    this.pokemonsService.getPokemonById(this.data.id).subscribe((pokemon: any) => {
      this.pokemonFormGroup = this.fb.group({
        id: [pokemon.id],
        name: [pokemon.name],
        height: [pokemon.height],
        weight: [pokemon.weight],
        types: [pokemon.types?.map((item: any) => item.type?.name) || []],
        image: [pokemon.sprites?.other?.dream_world?.front_default || ''],
        abilities: [pokemon.abilities?.map((item: any) => item.ability?.name) || []],
        order: [pokemon.order],
      });

      this.isLoading = false;
    })
  }
}
