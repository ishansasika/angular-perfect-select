import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComponentPlaygroundComponent } from '../../components/playground/component-playground/component-playground.component';
import { SELECT_METADATA } from '../../data/select-metadata';
import { ComponentMetadata } from '../../models/playground.types';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, ComponentPlaygroundComponent],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {
  metadata: ComponentMetadata = SELECT_METADATA;

  constructor(private route: ActivatedRoute) {
    // Future: Load different component metadata based on route param
    this.route.params.subscribe(params => {
      const componentId = params['componentId'];
      // For now, we only have 'select' component
      if (componentId && componentId !== 'select') {
        console.warn(`Component '${componentId}' not found, defaulting to 'select'`);
      }
    });
  }
}
