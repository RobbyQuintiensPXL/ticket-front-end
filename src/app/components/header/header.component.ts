import {Component, OnInit} from '@angular/core';
import {KeycloakInstance, KeycloakProfile} from 'keycloak-js';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public role: string[];
  office = false;
  admin = false;
  menuOpen = false;
  username: KeycloakProfile;
  adminName: string;

  constructor(private readonly keycloak: KeycloakService) {
  }

  public async ngOnInit() {
    this.office = this.keycloak.getUserRoles().includes('jevents-office');
    this.admin = this.keycloak.getUserRoles().includes('jevents-admin');
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      if (this.office){
        this.username = this.keycloak.getKeycloakInstance().idTokenParsed.Organisation;
      } else {
        this.username = this.keycloak.getKeycloakInstance().idTokenParsed.name.split(' ')[0];
      }
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout(window.location.origin).then(() => this.keycloak.clearToken());
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
