import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  reg = {
    email: '',
    password1: '',
    password2: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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

  registerAccount(){
    if(this.reg.password1 != this.reg.password2){
      this.displayAlert('Problema con la contraseña', "Contraseñas no son iguales. Intentelo de nuevo.");
      this.reg.password1 = '';
      this.reg.password2 = '';
    }
    else{
      this.afAuth.auth.createUserWithEmailAndPassword(this.reg.email, this.reg.password1)
      .then(res => this.regSuccess(res))
      .catch(err => this.displayAlert('Error', err));
    }
  }

  regSuccess(result){
    this.displayAlert(result.email, 'Cuenta creada con exito');
    this.afAuth.auth.signInWithEmailAndPassword(this.reg.email, this.reg.password1)
    .then(res => this.navCtrl.push(HomePage))
    .catch(err => this.displayAlert('Error', err))
  }
}
