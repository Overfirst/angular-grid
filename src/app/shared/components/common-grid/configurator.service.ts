import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GridColumn } from "../../interfaces";

@Injectable({providedIn: 'root'})
export class ConfiguratorService {
  public viewList$ = new BehaviorSubject<string[]>([]);
  
  public views: { [key: string]: string[] } = {};

  public configs: { [key: string]: {
      [key: string]: GridColumn[]
    }
  } = {};

  private readonly VIEWS_KEY = 'GRID_VIEWS';
  private readonly CONFIGS_KEY = 'GRID_CONFIGS';

  // constructor() {
  //   const views = localStorage.getItem(this.VIEWS_KEY);
  //   const configs = localStorage.getItem(this.CONFIGS_KEY);

  //   if (views && configs) {
  //     this.views = JSON.parse(views);
  //     this.configs = JSON.parse(configs);
      
  //     console.log('views:', this.views);
  //     console.log('configs:', this.configs);
  //   }
  // }

  public loadConfig(gridID: string, item: string): GridColumn[] {
    return this.configs[gridID][item];
  }

  public setDefaultConfig(gridID: string, config: GridColumn[]): void {
    if (!this.views[gridID]) {
      this.views[gridID] = [];
    }

    if (!this.views[gridID].includes('Default')) {
      this.views[gridID].unshift('Default');
    }

    this.configs[gridID] = { 'Default': config };
    this.updateStorage();
  }

  public getViews(gridID: string): string[] {
    return this.views[gridID];
  }

  public createNewView(gridID: string): string {
    const viewName = `View ${this.views[gridID].length}`;
    
    this.views[gridID].push(viewName);
    const defaultConfig = this.configs[gridID]['Default'];

    const newConfig: GridColumn[] = [];
    
    defaultConfig.forEach((column: GridColumn, index) => {
      const clonedColumn: GridColumn = {...column};

      clonedColumn.validators = defaultConfig[index].validators;
      newConfig.push(clonedColumn);
    });

    this.configs[gridID][viewName] = newConfig;
    this.updateStorage();    

    return viewName;
  }

  private updateStorage(): void {
    // localStorage.setItem(this.VIEWS_KEY, JSON.stringify(this.views));
    // localStorage.setItem(this.CONFIGS_KEY, JSON.stringify(this.configs));
  }
}