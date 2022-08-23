import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReplyDialogComponent } from './message-reply-dialog.component';

describe('MessageReplyDialogComponent', () => {
  let component: MessageReplyDialogComponent;
  let fixture: ComponentFixture<MessageReplyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageReplyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageReplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
