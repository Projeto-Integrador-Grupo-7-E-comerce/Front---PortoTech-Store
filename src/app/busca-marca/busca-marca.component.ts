import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { carrinho } from '../environments/carrinho';
import { ItemCarrinho } from '../model/ItemCarrinhoModel';
import { ProdutoModel } from '../model/ProdutoModel';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-busca-marca',
  templateUrl: '../inicio/inicio.component.html',
  styleUrls: ['../inicio/inicio.component.css'],
})
export class BuscaMarcaComponent implements OnInit {
  public listaProdutos: ProdutoModel[] = [];
  private marca: string = '';
  constructor(private router: Router, private acRoute: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.acRoute.params.subscribe(resp=>{
      this.marca = (resp['marca']);
      this.produtoService.buscarProdutosByMarca(this.marca).subscribe((resp: ProdutoModel[]) => {
        this.listaProdutos = resp;
      });
    });
  }
  adicionarCarrinho(produto: ProdutoModel) {
    for (let item of carrinho) {
      console.log(produto);
      console.log(item.produto);
      if (produto.idProduto == item.produto.idProduto) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Produto Adicionado ao Carrinho',
          showConfirmButton: false,
          timer: 1500
        });
        item.qtde++;
        return;
      }
    }
    const itemCarrinho: ItemCarrinho = new ItemCarrinho();
    itemCarrinho.produto = produto;
    itemCarrinho.qtde = 1;
    carrinho.push(itemCarrinho);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Produto Adicionado ao Carrinho',
      showConfirmButton: false,
      timer: 1500
    });
  }

  exibirCarrossel(): Boolean {

    return false;
  }
}
