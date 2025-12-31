import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  AnimationTriggerMetadata
} from '@angular/animations';

export const dropdownAnimation: AnimationTriggerMetadata = trigger('dropdown', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px)' }),
    animate(
      '200ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    )
  ]),
  transition(':leave', [
    animate('150ms ease-out', style({ opacity: 0 }))
  ])
]);

export const tagAnimation: AnimationTriggerMetadata = trigger('tag', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate(
      '200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      style({ opacity: 1, transform: 'scale(1)' })
    )
  ]),
  transition(':leave', [
    animate('150ms ease-out', style({ opacity: 0, transform: 'scale(0.8)' }))
  ])
]);

export const optionListAnimation: AnimationTriggerMetadata = trigger('optionList', [
  transition(':enter', [
    query('.option', [
      style({ opacity: 0, transform: 'translateY(-5px)' }),
      stagger(15, [
        animate(
          '150ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ], { optional: true })
  ])
]);

export const selectAnimations = [dropdownAnimation, tagAnimation, optionListAnimation];
