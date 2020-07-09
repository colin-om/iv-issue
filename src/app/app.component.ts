import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { IdentityProvider } from '../providers/identity/identity';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private identity: IdentityProvider) {
    this.initializeApp();
  }

  private async initializeApp() {
    await this.identity.ready();
    await this.platform.ready();
    this.splashScreen.hide();
    this.statusBar.styleDefault();
  }
}

