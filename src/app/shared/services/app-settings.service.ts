import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private _http = inject(HttpClient); // ✅ Use Angular's new inject() function
  public settings: any= {}; 

  constructor() {}

    loadAppConfig() {
    try {
      //console.log("===before reading appSettings.json");
      this._http.get("assets/jsons/appSettings.json").subscribe(res=>{
        this.settings=res;
      console.log("=========== AppSettings Loaded Successfully ======="+this.settings);

      });
    } catch (error) {
      console.log("====Error loading AppSettings.json:", error);
    }
  }

  GetAppSettings() {
    return this.settings;
  }
}
