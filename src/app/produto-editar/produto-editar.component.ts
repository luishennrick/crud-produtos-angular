import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit {
  id: String = '';
  productForm: FormGroup;
  nome_produto: String = '';
  desc_produto: String = '';
  preco_produto: number ;
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduto(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
   'nome_produto' : [null, Validators.required],
   'desc_produto' : [null, Validators.required],
   'preco_produto' : [null, Validators.required]
 });
 }

 getProduto(id: any) {
  this.api.getProduto(id).subscribe(data => {
    this.id = data.id;
    this.productForm.setValue({
      nome_produto: data.nome_produto,
      desc_produto: data.desc_produto,
      preco_produto: data.preco_produto
    });
  });
}

updateProduto(form: NgForm) {
  this.isLoadingResults = true;
  this.api.updateProduto(this.id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/produto-detalhe/' + this.id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}
}