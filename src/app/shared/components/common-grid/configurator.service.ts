import { Injectable } from "@angular/core";
import { ColumnsConfig, ColumnsSimpleConfig, GridViewPair } from "../../interfaces";

@Injectable({providedIn: 'root'})
export class ConfiguratorService {
  public views: { [key: string]: string[] } = {};
  public configs: { [key: string]: { [key: string]: ColumnsSimpleConfig } } = {};

  private readonly VIEWS_KEY = 'GRID_VIEWS';
  private readonly CONFIGS_KEY = 'GRID_CONFIGS';
  public readonly DEFAULT_KEY = 'Default';

  constructor() {
    const views = localStorage.getItem(this.VIEWS_KEY);
    const configs = localStorage.getItem(this.CONFIGS_KEY);

    if (views && configs) {
      this.views = JSON.parse(views);
      this.configs = JSON.parse(configs);
    }

    this.updateStorage();
  }

  public loadConfig(gridID: string, item: string): ColumnsSimpleConfig {
    return this.configs[gridID][item];
  }

  public setDefaultConfig(gridID: string, config: ColumnsConfig): void {
    if (!this.views[gridID]) {
      this.views[gridID] = [];
    }

    if (!this.views[gridID].includes(this.DEFAULT_KEY)) {
      this.views[gridID].unshift(this.DEFAULT_KEY);
    }

    if (!this.configs[gridID]) {
      this.configs[gridID] = {};
    }

    this.configs[gridID][this.DEFAULT_KEY] = this.toSimpleConfig(config);
    this.updateStorage();
  }

  public getViews(gridID: string): string[] {
    return this.views[gridID];
  }

  public createNewView(gridID: string): GridViewPair {
    const viewName = `View ${this.views[gridID].length}`;

    this.views[gridID].push(viewName);
    const defaultConfig = this.configs[gridID][this.DEFAULT_KEY];
    const newConfig: ColumnsSimpleConfig = [...defaultConfig];
    
    this.configs[gridID][viewName] = newConfig;
    this.updateStorage();    

    return { view: viewName, config: newConfig };
  }

  public removeView(gridID: string, removedView: string): string {
    this.views[gridID] = this.views[gridID].filter(view => view !== removedView)
    delete this.configs[gridID][removedView];

    this.updateStorage();
    return this.DEFAULT_KEY;
  }

  public updateCurrentView(gridID: string, view: string, config: ColumnsConfig): void {
    this.configs[gridID][view] = this.toSimpleConfig(config)
    this.updateStorage();
  }

  private updateStorage(): void {
    localStorage.setItem(this.VIEWS_KEY, JSON.stringify(this.views));
    localStorage.setItem(this.CONFIGS_KEY, JSON.stringify(this.configs));
  }

  private toSimpleConfig(config: ColumnsConfig): ColumnsSimpleConfig {
    const simpleConfig = config.map(col => {
      const simpleCol = {
        alias: col.alias,
        title: col.title,
        width: col.width,
        hidden: col.hidden,
        type: col.type,
        filter: col.filter,
        filterable: col.filterable
      };

      return simpleCol;
    });

    return simpleConfig;
  }
}