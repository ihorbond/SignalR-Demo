export class AppConfig {
  private _config: { [key: string]: string };
  constructor() {
    this._config = {
      
    }
  }

  public get config(): any {
    return this._config;
  }

  public get = (key: any): string => this._config[key];

}
