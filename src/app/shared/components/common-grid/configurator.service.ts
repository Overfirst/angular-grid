import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ColumnsConfig, ColumnsSimpleConfig, GridColumnSimple, GridView } from "../../interfaces";

@Injectable({providedIn: 'root'})
export class ConfiguratorService {
  private views: { [key: string]: GridView[] } = {};
  private obs: { [key: string]: BehaviorSubject<boolean> } = {};
  private selectedViews: { [key: string]: string } = {}

  private readonly VIEWS_KEY = 'GRID_VIEWS';
  private readonly SELECTED_VIEWS_KEY = 'GRID_SELECTED_VIEWS';
  public readonly DEFAULT_VIEW_NAME = 'Default';

  constructor() {
    function parse(key: string): any {
      const json = localStorage.getItem(key);
      let obj = {};

      if (!json) {
        return obj;
      }
  
      try {
        obj = JSON.parse(json);
      } catch (error) {
        obj = {};
      }

      return obj;
    }

    this.views = parse(this.VIEWS_KEY);
    this.selectedViews = parse(this.SELECTED_VIEWS_KEY);
  }
  
  public createDefaultView(gridID: string, defaultView: GridView): GridView {
    const view: GridView = {
      name: defaultView.name,
      config: this.simplifyConfig(defaultView.config),
      filter: {
        logic: defaultView.filter.logic,
        filters: [...defaultView.filter.filters]
      },
      sort: [...defaultView.sort],
      pageSize: defaultView.pageSize
    }

    if (!this.views[gridID]) {
      this.views[gridID] = [];
    }

    this.views[gridID][0] = view;
    this.updateStorage();
    return view;
  }

  public createView(gridID: string): GridView {
    const defaultView = this.views[gridID][0];

    const view: GridView = {
      name: `View ${this.views[gridID].length}`,
      config: defaultView.config.map(col => ({...col})),
      filter: {
        logic: defaultView.filter.logic,
        filters: [...defaultView.filter.filters]
      },
      sort: [...defaultView.sort],
      pageSize: defaultView.pageSize
    }

    this.views[gridID].push(view);
    this.selectedViews[gridID] = view.name;
    
    this.updateStorage();
    return view;
  }

  public getViewsList(gridID: string): string[] {
    return this.views[gridID].map(view => view.name);
  }

  public getView(gridID: string, viewName: string): GridView {
    this.selectedViews[gridID] = viewName;
    this.saveSelectedView();

    return this.views[gridID].find(view => view.name === viewName)!;
  }

  public updateView(gridID: string, currentView: GridView): GridView {
    const targetIndex = this.views[gridID].findIndex(view => view.name === currentView.name);
    const targetView = this.views[gridID][targetIndex];

    const updatedView = {
      name: targetView.name,
      config: this.simplifyConfig(currentView.config),
      filter: {
        logic: currentView.filter.logic,
        filters: [...currentView.filter.filters]
      },
      sort: [...currentView.sort],
      pageSize: currentView.pageSize
    }

    this.views[gridID][targetIndex] = updatedView;
    this.updateStorage();
    return updatedView;
  }

  private simplifyConfig(config: ColumnsConfig): ColumnsSimpleConfig {
    const simpleConfig = config.map(col => {
      const simpleCol: GridColumnSimple = { alias: col.alias };

      if (col.title) { simpleCol.title = col.title; }
      if (col.width) { simpleCol.width = col.width; }
      if (col.hidden !== undefined) { simpleCol.hidden = col.hidden; }
      if (col.type) { simpleCol.type = col.type; }
      if (col.filter) { simpleCol.filter = col.filter; }
      if (col.filterable) { simpleCol.filterable = col.filterable; }

      return simpleCol;
    });

    return simpleConfig;
  }

  public canInitView(gridID: string, can = true): void {
    this.obs[gridID].next(can);
  }

  public waitInitView(gridID: string): BehaviorSubject<boolean> {
    if (!this.obs[gridID]) {
      this.obs[gridID] = new BehaviorSubject<boolean>(false);
    }

    return this.obs[gridID];
  }

  public getSelectedView(gridID: string): string {
    return this.selectedViews[gridID] || '';
  }

  private updateStorage(): void {
    this.saveSelectedView();
    localStorage.setItem(this.VIEWS_KEY, JSON.stringify(this.views));
  }

  private saveSelectedView(): void {
    localStorage.setItem(this.SELECTED_VIEWS_KEY, JSON.stringify(this.selectedViews));
  }
}