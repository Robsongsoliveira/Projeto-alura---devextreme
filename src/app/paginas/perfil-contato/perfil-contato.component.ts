import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../componentes/container/container.component';
import { Contato } from '../../componentes/contato/contato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { DxButtonModule } from 'devextreme-angular';
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    RouterLink,
    SeparadorComponent,
    CabecalhoComponent,
    DxButtonModule
  ],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})
export class PerfilContatoComponent implements OnInit{

  contato: Contato = {
    id: 0,
    nome: '',
    avatar: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
    ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
        this.contato = contato;
      });
    }
  }

  async excluir() {
    const confirmacao = await confirm(
      'Tem certeza que deseja excluir este contato?',
      'Excluir contato'
    );

    if(confirmacao && this.contato.id) {
      this.contatoService.excluirContato(this.contato.id).subscribe(() => {
        this.router.navigateByUrl('/lista-contatos')
      })
    }
  }
}
