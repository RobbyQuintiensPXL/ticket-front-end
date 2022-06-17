import { Injectable} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class MockedKeycloakService extends KeycloakService {
  init() {
    return Promise.resolve(true);
  }

  getKeycloakInstance() {
    return {
      loadUserInfo: () => {
        let callback;
        Promise.resolve().then(() => {
          callback({
            userName: 'name'
          });
        });
        return {
          success: (fn) => callback = fn
        };
      }
    } as any;
  }
}
