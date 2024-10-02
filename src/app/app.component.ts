import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreLoaderComponent } from './features/character-list/components/pre-loader/pre-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PreLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hero-vision';
}
