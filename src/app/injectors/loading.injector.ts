import {
  inject,
  InjectionToken,
  Provider,
  Signal,
  signal,
} from '@angular/core';

export interface ILoadingInjector {
  start(): void;
  stop(): void;
  showing: Signal<boolean>;
}

export const LOADING_INJECTOR_TOKEN = new InjectionToken<ILoadingInjector>(
  'LOADING_INJECTOR_TOKEN'
);

export const provideLoading = (): Provider => ({
  provide: LOADING_INJECTOR_TOKEN,
  useFactory: (): ILoadingInjector => {
    const showingSignal = signal<boolean>(false);

    return {
      start: (): void => {
        showingSignal.set(true);
      },
      stop: (): void => {
        showingSignal.set(false);
      },
      showing: showingSignal.asReadonly(),
    };
  },
});

export const injectLoading = () => inject(LOADING_INJECTOR_TOKEN);
