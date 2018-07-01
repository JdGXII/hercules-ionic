import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  items: FirebaseListObservable<any>;
  success:boolean;

  constructor(public alertCtrl: AlertController, private afAuth: AngularFireAuth,
              private storage: Storage, private fbDB: AngularFireDatabase) {
    
                this.items = fbDB.list('/users');
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

  storageControl(action, key?, value?){
    if(action == 'set'){
      return this.storage.set(key,value);
    }
    if(action == 'get'){
      return this.storage.get(key);
    }
    if(action == 'delete'){
      if(!key){
        this.displayAlert("Atencion", "Borrando toda la informacion de todos los usuarios");
        return this.storage.clear();
      }
      else{
        this.displayAlert(key, "Borrando este usuario");
        return this.storage.remove(key);
      }
    }
  }

  saveNewUser(user){
    let userObj = {
      creation: new Date().toDateString(),
      lastLogin: new Date().toLocaleString(),
      id: ''
    }
    this.items.push({
      username: user,
      creation: userObj.creation,
      lastLogin: userObj.lastLogin
    })
    .then(res => {
      userObj.id = res.key;
      return this.storageControl('set', user, userObj);
    });

    return this.storageControl('get', user);
  }

  updateUser(theUser, theUserData){
    let newData = {
      creation: theUserData.creation,
      lastLogin: new Date().toLocaleString(),
      id: theUserData.id
    }
    this.items.update(newData.id, {
      lastLogin: newData.lastLogin
    });
    return this.storageControl('set', theUser, newData);
  }

  logOn(user, password){
    return this.afAuth.auth.signInWithEmailAndPassword(user, password)
      .then(result => {
        this.storageControl('get', user)
        .then(returned => {
          if(!returned) {
            this.saveNewUser(user)
            .then(res => this.displayAlert(user, "Nueva cuenta creada para este usuario"));
          }
          else{
            this.updateUser(user, returned)
            .then(updated => console.log(user, updated))
          }
        })

        this.success = true;
        return result;

      })
      .catch(err => {
        this.success = false;
        this.displayAlert("Error al entrar a la aplicacion", err);
        return err;
      });
  }

}
