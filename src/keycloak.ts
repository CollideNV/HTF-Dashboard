import Keycloak from 'keycloak-js';

let keycloakInstance: Keycloak | null = null;

export function createKeycloak(): Keycloak {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: 'https://security.bewire.services/',
      realm: 'hack-the-future',
      clientId: 'htf',
    });
  }
  return keycloakInstance;
}

export function getKeycloak(): Keycloak | null {
  return keycloakInstance;
}

export function resetKeycloak(): void {
  keycloakInstance = null;
}

export default createKeycloak;
