import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ForestFinderComponent } from './forest-finder.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ForestService } from '../../_services/forest.service';
import { RemovePuncPipe } from './remove-punc.pipe';
import { HttpModule, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ScalarObservable } from 'rxjs/observable/ScalarObservable';
import { SpacesToDashesPipe } from '../../../_pipes/spaces-to-dashes.pipe';
import { MockActivatedRoute, MockRouter } from '../../../_mocks/routes.mock';
import { MockService } from '../../../_services/mock.service';
import { UtilService } from '../../../_services/util.service';

describe('ForestFinderComponent', () => {
  let component: ForestFinderComponent;
  let fixture: ComponentFixture<ForestFinderComponent>;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;
  let mockService: MockService;

  const mockResponse = [
    {
      id: 1,
      forestName: 'Forest National Forest',
      description: 'ForestName'
    }
  ];

  beforeEach(
    async(() => {
      mockActivatedRoute = new MockActivatedRoute({ data: {} });
      mockRouter = new MockRouter();
      mockService = new MockService();
      TestBed.configureTestingModule({
        declarations: [ForestFinderComponent, RemovePuncPipe, SpacesToDashesPipe],
        imports: [HttpModule, Ng2AutoCompleteModule, RouterTestingModule],
        providers: [
          UtilService,
          { provide: ForestService, useClass: ForestService },
          { provide: XHRBackend, useClass: MockBackend },
          { provide: MockService, use: mockService }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestFinderComponent);
    component = fixture.componentInstance;
    inject([ForestService, XHRBackend], (service, mockBackend) => {
      mockService.mockResponse(mockBackend, mockResponse);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    });
  });

  it('should filter the forests for the typeahead', () => {
    fixture.whenStable().then(() => {
      expect(component.forestSearchResults('hood') instanceof ScalarObservable);
    });
  });

  it('should filter the forests for the typeahead', () => {
    inject([ForestService, XHRBackend], (service, mockBackend) => {
      mockService.mockResponse(mockBackend, mockResponse);

      service.getAll().subscribe(result => {
        expect(result[0].forestName).toBe('Forest National Forest');
        fixture.detectChanges();
        expect(component.forestListFormatter(component.forests[0])).toEqual('ForestName');
      });
    });
  });

  it(
    'should get forest object',
    inject([ForestService, XHRBackend], (service, mockBackend) => {
      mockService.mockResponse(mockBackend, mockResponse);

      service.getAll().subscribe(result => {
        expect(result[0].forestName).toBe('Forest National Forest');
      });
    })
  );
});
