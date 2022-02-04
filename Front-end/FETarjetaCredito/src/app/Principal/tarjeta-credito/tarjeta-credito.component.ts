import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaServiceService } from 'src/app/Services/tarjeta-service.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listadoTarjetas: any[] = [];

  form: FormGroup;
  id: number | undefined;

  accion = "Agregar";

  constructor(private fb: FormBuilder, private toastr: ToastrService, private service: TarjetaServiceService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.getTarjetas();
  }

  public getTarjetas(): any{
    this.service.getTarjetas().subscribe(
      data => {
        this.listadoTarjetas = data;
      }, error => {
        console.log(error);
    });
  }

  public deleteTarjeta(id: number): any{
    this.service.deleteTarjeta(id).subscribe(
      data => {
        this.toastr.success('La tarjeta ha sido eliminada', 'Cerrar');
        this.getTarjetas();
      }, error => {
        this.toastr.error('Algo ha ocurrido...', 'Cerrar');
        console.log(error);
      }
    );
  }

  public guardarTarjeta() : any {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }

    console.log(tarjeta);

    if(this.id == undefined){
      this.service.addTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('Tarjeta añadida', 'Cerrar');
        this.getTarjetas();
        this.form.reset();
      }, error => {
        this.toastr.error('Algo ha ocurrido...', 'Cerrar');
        console.log(error);
      });
    }else{
      tarjeta.id = this.id;

      this.service.putTarjeta(this.id, tarjeta).subscribe(data => {
        this.form.reset();
        this.accion = "Agregar";
        this.id = undefined;
        this.toastr.info('La tarjeta ha sido actualizada', 'Cerrar');
        this.getTarjetas();
      }, error => {
        this.toastr.error('Ha ocurrido algo...', 'Cerrar');
        console.log(error);
      });
    }
  }

  public editTarjeta(tarjeta: any): any {
    this.accion = 'Editar';
    this.id = tarjeta.id;
    
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    });
  }


}
