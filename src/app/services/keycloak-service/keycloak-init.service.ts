import {KeycloakService} from 'keycloak-angular';

export function KeycloakInitService(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
          await keycloak.init({
            config: {
              url: 'http://localhost:8080/',
              realm: 'JEvents',
              clientId: 'JEvents-public',
            },
            initOptions: {
              onLoad: 'check-sso',
              checkLoginIframe: false
            },
            loadUserProfileAtStartUp: false,
            enableBearerInterceptor: true,
            bearerExcludedUrls: ['/assets', '/event/events', '/event/locations', '/events/:id'],
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    )
      .catch((e) => {
        console.log('Error thrown in init ' + e);
      });
  };
}
