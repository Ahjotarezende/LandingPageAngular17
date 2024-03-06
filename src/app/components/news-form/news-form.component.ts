import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [BtnPrimaryComponent, ReactiveFormsModule],
  providers: [NewsletterService],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss'
})
export class NewsFormComponent {
  newForm: FormGroup;
  loading = signal(false);

  constructor(private newsLetterService: NewsletterService) {
    this.newForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  onSubmit() {
    this.loading.set(true)
      this.newsLetterService.sendData(this.newForm.value.name, this.newForm.value.email).subscribe({
        next: () => {
          this.newForm.reset();
          this.loading.set(false);
        }
      })
  }
}
