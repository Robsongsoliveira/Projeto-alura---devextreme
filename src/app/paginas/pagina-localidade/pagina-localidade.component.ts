import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { ContainerComponent } from '../../componentes/container/container.component';
import { LocalidadeComponent, LocalidadeSelecionada } from '../../componentes/localidade/localidade.component';

@Component({
  selector: 'app-pagina-localidade',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    CabecalhoComponent,
    LocalidadeComponent
  ],
  templateUrl: './pagina-localidade.component.html',
  styleUrl: './pagina-localidade.component.css'
})
export class PaginaLocalidadeComponent {
  localidade?: LocalidadeSelecionada;

  receberLocalidade(localidade: LocalidadeSelecionada): void {
    this.localidade = localidade;
  }
}
