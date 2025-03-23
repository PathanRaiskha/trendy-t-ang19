import { Component, inject, OnInit } from '@angular/core';
import { AppSettingsService } from './shared/services/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  
  title = 'trendy-t-ang19';
  //_appConfigService = inject(AppSettingsService);
  ngOnInit(): void {
    //this._appConfigService.loadAppConfig();
  }
}
