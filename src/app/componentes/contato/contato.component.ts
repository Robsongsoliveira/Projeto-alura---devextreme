import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DxButtonModule
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  constructor(private router: Router) {}

  editarContato() {
    this.router.navigate(['/formulario', this.id]);
  }

  abrirPerfil() {
    this.router.navigate(['/perfil-contato', this.id]);
  }

  @Input() nome: string = ''
  @Input() telefone: string = ''
  @Input() id?: number;
  @Input() avatar: string | ArrayBuffer = '';
}
