import { TestBed } from '@angular/core/testing';

import { JsoninterceptorInterceptor } from './jsoninterceptor.interceptor';

describe('JsoninterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JsoninterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JsoninterceptorInterceptor = TestBed.inject(JsoninterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
