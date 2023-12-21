import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// A way to more easily handle subscriptions
@Component({
    template: ''
})

export abstract class Destroyable implements OnDestroy {

    public destroy$: Subject<void> = new Subject();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
