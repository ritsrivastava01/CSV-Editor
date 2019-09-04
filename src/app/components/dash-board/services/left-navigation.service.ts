import { ipcRenderer } from 'electron';
import { filter } from 'rxjs/operators';
import { INavigationItem } from './left-navigation.service';
import { Injectable } from '@angular/core';
import { Observable, Observer, of, Subject } from 'rxjs';

export class LeftNavigationService {
  navigationItems: INavigationItem[] = [];
  private NavigationListSubject = new Subject<Array<INavigationItem>>();
  private NavigationItemSubject = new Subject<INavigationItem>();

  constructor() {
    this.navigationItems.push({ id: 1, label: 'page.left-panel.welcome', isActive: true });
    this.navigationItems.push({
      id: 2,
      label: 'page.left-panel.what-we-do',
      isActive: false
    });
    this.navigationItems.push({
      id: 3,
      label: 'page.left-panel.upload-files',
      isActive: false
    });
    this.navigationItems.push({
      id: 4,
      label: 'page.left-panel.get-in-touch',
      isActive: false
    });
  }

  // Observable string streams
  navigationItemsObservable = this.NavigationListSubject.asObservable();
  activeNavigationItemObservable = this.NavigationItemSubject.asObservable();

  getNavigationList = () => {
    this.NavigationListSubject.next(this.navigationItems);
  }
  LeftNavigationClicked = (item: INavigationItem) => {
    this.navigationItems.find(x => x.isActive).isActive = false;
    this.navigationItems.find(x => x.id === item.id).isActive = true;
    this.NavigationListSubject.next(this.navigationItems);
    this.NavigationItemSubject.next(this.navigationItems.find(x => x.isActive));
  }
}

export interface INavigationItem {
  id: number;
  label: string;
  isActive: boolean;
}
