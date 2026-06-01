import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterLink, DxButtonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  constructor(private router: Router) {}

  voltar() {
    this.router.navigateByUrl('/lista-contatos');
  }

  @Input() titulo: string = '';
  @Input() bannerSrc: string = '';
  @Input() telaInicial: boolean = false;
}
