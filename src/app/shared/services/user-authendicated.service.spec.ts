import { TestBed } from '@angular/core/testing';

import { UserAuthendicatedService } from './user-authendicated.service';

describe('UserAuthendicatedService', () => {
  let service: UserAuthendicatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthendicatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
