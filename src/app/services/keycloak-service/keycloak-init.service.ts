import {KeycloakService} from 'keycloak-angular';

export function KeycloakInitService(
  keycloak: KeycloakService
) {
  return () => keycloak.init({
    config: {
      url: 'http://localhost:8080/',
      realm: 'JEvents',
      clientId: 'JEvents-public',
    },
    initOptions: {
      checkLoginIframe: false,
    },
  });
}
