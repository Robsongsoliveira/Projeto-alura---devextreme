import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DxSelectBoxModule } from 'devextreme-angular';

interface EstadoIbge {
  id: number;
  sigla: string;
  nome: string;
}

interface CidadeIbge {
  id: number;
  nome: string;
}

export interface LocalidadeSelecionada {
  estadoId: number;
  estadoSigla: string;
  estadoNome: string;
  cidadeId: number;
  cidadeNome: string;
}

@Component({
  selector: 'app-localidade',
  standalone: true,
  imports: [
    CommonModule,
    DxSelectBoxModule
  ],
  templateUrl: './localidade.component.html',
  styleUrl: './localidade.component.css'
})
export class LocalidadeComponent implements OnInit {
  @Output() localidadeSelecionada = new EventEmitter<LocalidadeSelecionada>();

  estados: EstadoIbge[] = [];
  cidades: CidadeIbge[] = [];

  estadoSelecionado?: EstadoIbge;
  cidadeSelecionada?: CidadeIbge;

  carregandoEstados = false;
  carregandoCidades = false;

  private readonly apiBase = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarEstados();
  }

  buscarEstados(): void {
    this.carregandoEstados = true;

    this.http
      .get<EstadoIbge[]>(`${this.apiBase}/estados?orderBy=nome`)
      .subscribe({
        next: estados => {
          this.estados = estados;
          this.carregandoEstados = false;
        },
        error: () => {
          this.carregandoEstados = false;
        }
      });
  }

  alterarEstado(estado: EstadoIbge | null): void {
    this.estadoSelecionado = estado ?? undefined;
    this.cidadeSelecionada = undefined;
    this.cidades = [];

    if (!estado) {
      return;
    }

    this.buscarCidades(estado.sigla);
  }

  buscarCidades(uf: string): void {
    this.carregandoCidades = true;

    this.http
      .get<CidadeIbge[]>(`${this.apiBase}/estados/${uf}/municipios?orderBy=nome`)
      .subscribe({
        next: cidades => {
          this.cidades = cidades;
          this.carregandoCidades = false;
        },
        error: () => {
          this.carregandoCidades = false;
        }
      });
  }

  alterarCidade(cidade: CidadeIbge | null): void {
    this.cidadeSelecionada = cidade ?? undefined;

    if (!this.estadoSelecionado || !this.cidadeSelecionada) {
      return;
    }

    this.localidadeSelecionada.emit({
      estadoId: this.estadoSelecionado.id,
      estadoSigla: this.estadoSelecionado.sigla,
      estadoNome: this.estadoSelecionado.nome,
      cidadeId: this.cidadeSelecionada.id,
      cidadeNome: this.cidadeSelecionada.nome
    });
  }
}
