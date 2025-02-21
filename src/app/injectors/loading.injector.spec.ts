import { TestBed } from '@angular/core/testing';
import {
  injectLoading,
  LOADING_INJECTOR_TOKEN,
  provideLoading,
} from './loading.injector';

describe('[Injector injectCurrency]', () => {
  let loadingInjector: ReturnType<typeof injectLoading>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideLoading()],
    });

    loadingInjector = TestBed.inject(LOADING_INJECTOR_TOKEN);
  });

  it('should be created', () => {
    expect(loadingInjector).toBeTruthy();
  });

  it('should start and stop', () => {
    loadingInjector.start();
    expect(loadingInjector.showing()).toBe(true);
    loadingInjector.stop();
    expect(loadingInjector.showing()).toBe(false);
  });
});
