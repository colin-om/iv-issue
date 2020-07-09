import { Injectable } from '@angular/core';
import { DefaultSession, IonicIdentityVaultUser, AuthMode, VaultErrorCodes} from '@ionic-enterprise/identity-vault';
import { Platform } from 'ionic-angular';

@Injectable()
export class IdentityProvider extends IonicIdentityVaultUser<DefaultSession> {

  constructor(platform: Platform) {
    super(platform, {
      restoreSessionOnReady: false,
      unlockOnReady: false,
      unlockOnAccess: false,
      lockAfter: 1,
      hideScreenOnBackground: true,
    });
  }

  async userLogin() {
    await this.login({ username: 'test', token: 'test_token' }, AuthMode.PasscodeOnly);
  }

  async restoreSession(): Promise<DefaultSession> {
    try {
      return await super.restoreSession();
    } catch (error) {
      if (error.code === VaultErrorCodes.VaultLocked) {
        const vault = await this.getVault();
        await vault.clear();
      } else {
        throw error;
      }
    }
  }

  onVaultLocked() {
    console.log('vault locked');
  }
}
