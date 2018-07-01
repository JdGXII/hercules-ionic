import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public alertCtrl: AlertController, private afAuth: AngularFireAuth) {
    
  }

  displayAlert(alertTitle, alertSub){
    if(alertSub == "Error: The email address is badly formatted."){
      alertSub = "Direccion de correo invalida.";
    }
    if(alertSub == "Error: Password should be at least 6 characters"){
      alertTitle = "Problema con la contraseña"
      alertSub = "Contraseña debe ser al menos 6 caracteres.";
    }
    let theAlert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ['OK']
    });
    theAlert.present();
  }

  logOut(){
    this.afAuth.auth.signOut()
      .then(loggedOut => this.displayAlert("Saliste de la aplicacion", "Te esperamos de vuelta"))
      .catch(err => this.displayAlert("Error", err));
  }

}
