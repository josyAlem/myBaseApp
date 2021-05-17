import { trigger, state, animate, style, transition } from '@angular/animations';
import * as nestEnums from '@nest/nest-enums';

export function nestSlideAnimation(type:nestEnums.animation) {
    if(type==nestEnums.animation.Slide_From_Bottom)
    return slideFromBottom();
    else if(type==nestEnums.animation.Slide_From_Top)
    return slideFromUp();
}


function slideFromBottom() {
    return trigger('nestRouterTransition', [
        state('void', style({ 'padding-top': '20px', opacity: '0' })),
        state('*', style({ 'padding-top': '0px', opacity: '1' })),
        transition(':enter', [
            animate('0.33s ease-out', style({ opacity: '1', 'padding-top': '0px' }))
        ])
    ]);
}

function slideFromUp() {
    return trigger('nestRouterTransition', [
        state('void', style({ 'margin-top': '-10px', opacity: '0' })),
        state('*', style({ 'margin-top': '0px', opacity: '1' })),
        transition(':enter', [
            animate('0.2s ease-out', style({ opacity: '1', 'margin-top': '0px' }))
        ])
    ]);
}