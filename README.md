This is a demo application used to reproduce the issue reported in ticket #31447. This is a basic reproduction and so the unlock button is shown when the vault isn't actually locked. Minimising the app will cause the vault to be locked (lockAfter is set to 1ms).

Reproduction steps:

1. Log in on Android (session is logged in automatically, just enter a passcode).
2. Minimise the app and let the vault lock (timeout is set to 1ms for ease of testing).
3. Reopen the app and click unlock, entering the incorrect passcode (this will update the number at the top of your screen to vault.remainingAttempts()).
4. Hit unlock and enter the incorrect passcode until the vault is cleared and the login button is shown again.
5. Log in and set a passcode. This will refresh the number at the top of your screen and set it to vault.remainingAttempts().
6. Expect the number to be 5 but instead it is 0.
7. Minimise the app and lock the vault.
8. Hit unlock, entering the incorrect passcode and the number continues to decrease, never triggering TooManyFailedAttempts, and allowing an unlimited amount of unlock attempts.
