import { Component } from '@angular/core';

export interface Item {
  name: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;

  username: string = '';
  password: string = '';

  items: Item[] = [];
  newItemName: string = '';

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.items = [];
    this.isLoggedIn = false;
  }

  addItem(name: string): void {
    this.items.push({
      name,
      isEditing: false,
    });
    this.newItemName = '';
  }

  deleteItem(item: Item): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
