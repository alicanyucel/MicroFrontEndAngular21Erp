import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { RealtimeService } from '../../core/services/realtime.service';

@Component({
  selector: 'app-realtime-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './realtime.page.html',
  styleUrl: './realtime.page.css'
})
export class RealtimePageComponent {
  private readonly formBuilder = inject(UntypedFormBuilder);
  protected readonly realtime = inject(RealtimeService);
  protected readonly socketUrl = signal('wss://erp.example.com/live');
  protected readonly messageForm = this.formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(2)]]
  });

  protected connect(): void {
    this.realtime.connect(this.socketUrl());
  }

  protected send(): void {
    if (this.messageForm.invalid) {
      this.messageForm.markAllAsTouched();
      return;
    }

    this.realtime.sendMessage(this.messageForm.getRawValue().content);
    this.messageForm.reset({ content: '' });
  }
}
