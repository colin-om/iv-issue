import { Component } from '@angular/core';
import { IdentityProvider } from '../../providers/identity/identity';
import { VaultErrorCodes } from '@ionic-enterprise/identity-vault';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hasSession: boolean;
  remainingAttempts: number;

  constructor(
    private identity: IdentityProvider,
  ) {}

  ionViewWillEnter() {
    this.checkSession();
  }

  async loginClicked() {
    await this.identity.userLogin();
    this.checkSession();
  }

  async unlockClicked() {
    const hasSession = await this.identity.hasStoredSession();

    if (hasSession) {
      await this.tryRestoreSession();
    }
  }

  private async tryRestoreSession() {
    try {
      await this.identity.unlock();
      await this.updateAttempts();
      alert('Vault unlocked');
      return await this.identity.restoreSession();
    } catch (error) {
      this.updateAttempts();

      if (this.notFailedOrCancelled(error)) {
        await this.checkSession();
        throw error;
      }
    }
  }

  private notFailedOrCancelled(error) {
    return error.code !== VaultErrorCodes.AuthFailed && error.code !== VaultErrorCodes.UserCanceledInteraction;
  }

  private async checkSession() {
    this.hasSession = await this.identity.hasStoredSession();
    this.updateAttempts();
  }

  private async updateAttempts() {
    const vault = await this.identity.getVault();
    this.remainingAttempts = await vault.remainingAttempts();
  }
}
