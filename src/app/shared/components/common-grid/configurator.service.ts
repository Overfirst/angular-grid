import { Injectable } from "@angular/core";
import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query";
import { BehaviorSubject } from "rxjs";
import { ColumnsConfig, ColumnsSimpleConfig, GridColumnSimple, GridView } from "../../interfaces";

@Injectable({providedIn: 'root'})
export class ConfiguratorService {
  private views: { [key: string]: GridView[] } = {};
  private obs: { [key: string]: BehaviorSubject<boolean>; } = {};

  private readonly VIEWS_KEY = 'GRID_VIEWS';
  public readonly DEFAULT_VIEW_NAME = 'Default';

  constructor() {
    const views = localStorage.getItem(this.VIEWS_KEY);

    if (!views) {
      return;
    }

    try {
      this.views = JSON.parse(views);
      console.log('Configurator views parse error successfully');
    } catch (error) {
      console.log('Configurator views parse error:', error);
      this.views = {};
    }
  }
  
  public createDefaultView(gridID: string, config: ColumnsConfig, sort: SortDescriptor[], filter: CompositeFilterDescriptor): GridView {
    const view: GridView = {
      name: this.DEFAULT_VIEW_NAME,
      config: this.simplifyConfig(config),
      filter: {
        logic: filter.logic,
        filters: [...filter.filters]
      },
      sort: [...sort]
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
      sort: [...defaultView.sort]
    }

    this.views[gridID].push(view);
    console.log('createNewView:', view);
    this.updateStorage();
    return view;
  }

  public getViewsList(gridID: string): string[] {
    return this.views[gridID].map(view => view.name);
  }

  public getView(gridID: string, viewName: string): GridView {
    const view = this.views[gridID].find(view => view.name === viewName)!;
    console.log('viewSelectionChanged:', view);
    return view;
  }

  public updateView(gridID: string, viewName: string, config: ColumnsConfig, filter: CompositeFilterDescriptor, sort: SortDescriptor[]): GridView {
    const targetIndex = this.views[gridID].findIndex(view => view.name === viewName);
    const targetView = this.views[gridID][targetIndex];

    const updatedView = {
      name: targetView.name,
      config: this.simplifyConfig(config),
      filter: {
        logic: filter.logic,
        filters: [...filter.filters]
      },
      sort: [...sort]
    }

    this.views[gridID][targetIndex] = updatedView;
    this.updateStorage();
    console.log('updateView:', updatedView);
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

  public canInitView(gridID: string): void {
    this.obs[gridID].next(true);
  }

  public waitInitView(gridID: string): BehaviorSubject<boolean> {
    if (!this.obs[gridID]) {
      this.obs[gridID] = new BehaviorSubject<boolean>(false);
    }

    return this.obs[gridID];
  }

  private updateStorage(): void {
    console.log('updateStorage...', this.views);
    localStorage.setItem(this.VIEWS_KEY, JSON.stringify(this.views));
  }
}