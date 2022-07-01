import { ProdutoService } from './../services/produto.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from '../model/ProdutoModel';
import { environment } from '../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gerenciar-produtos',
  templateUrl: './gerenciar-produtos.component.html',
  styleUrls: ['./gerenciar-produtos.component.css']
})
export class GerenciarProdutosComponent implements OnInit {

  public listaProdutos: ProdutoModel[] = []
  constructor(private router: Router, private produtoService: ProdutoService) {

  }
  ngOnInit() {
    this.produtoService.buscarProdutos().subscribe((lista: ProdutoModel[]) => {
      this.listaProdutos = lista;
    });
  }
  chamarPagProduto() {
    this.router.navigate(['/cadastroproduto']);
  }

  deletarProduto(id:number|string){

    this.produtoService.deleteProduto(Number(id)).subscribe(resp=>{

      this.ngOnInit();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Produto excluído!',
        showConfirmButton: false,
        timer: 1500
      });

    });
  }


  isAdmin(){
    return environment.isAdmin == true ;
  }


}
