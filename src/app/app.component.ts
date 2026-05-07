import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <div class="container">
      <h1>📷 Anı Yakala!</h1>
      <p>Bu özel günümüzde çektiğiniz kareleri bizimle paylaşın.</p>

      <!-- Kamera veya Galeri seçimi için input -->
      <label class="upload-btn" [class.disabled]="isUploading()">
        <input
          type="file"
          accept="image/*"
          (change)="onFileSelected($event)"
          [disabled]="isUploading()"
        />
        {{ isUploading() ? 'Yükleniyor...' : 'Fotoğraf Seç / Çek' }}
      </label>

      @if (isUploading()) {
        <p class="status">Fotoğrafınız gönderiliyor, lütfen bekleyin... ⏳</p>
      }

      @if (uploadSuccess()) {
        <p class="success">Harika! Fotoğraf başarıyla bize ulaştı. 💖</p>
      }

      @if (errorMessage()) {
        <p class="error">Bir hata oluştu: {{ errorMessage() }}</p>
      }
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: sans-serif;
        padding: 2rem;
        min-height: 80vh;
      }
      h1 {
        color: #333;
        margin-bottom: 0.5rem;
      }
      p {
        color: #666;
        margin-bottom: 2rem;
        font-size: 1.1rem;
      }
      .upload-btn {
        display: inline-block;
        padding: 18px 35px;
        font-size: 1.3rem;
        font-weight: bold;
        background-color: #2c3e50;
        color: white;
        border-radius: 12px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s;
      }
      .upload-btn:hover {
        background-color: #1a252f;
      }
      .upload-btn.disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
      }
      .upload-btn input {
        display: none;
      }
      .status {
        color: #f39c12;
        font-weight: bold;
        margin-top: 20px;
        font-size: 1.1rem;
      }
      .success {
        color: #2ecc71;
        font-weight: bold;
        margin-top: 20px;
        font-size: 1.1rem;
      }
      .error {
        color: #e74c3c;
        font-weight: bold;
        margin-top: 20px;
        font-size: 1.1rem;
      }
    `,
  ],
})
export class AppComponent {
  title = 'wedding-shots';

  private http = inject(HttpClient);

  // Apps Script Web App URL'ni buraya yapıştır
  private scriptUrl = 'https://script.google.com/macros/s/AKfycbzQPraLDHcinRYzOk1YeP2XBOebLyy7VqrdxPlbcPUB-IGLegzDmQBQk6cPiL1IIGN0/exec';

  isUploading = signal<boolean>(false);
  uploadSuccess = signal<boolean>(false);
  errorMessage = signal<string>('');

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadFile(input.files[0]);
    }
  }

  uploadFile(file: File) {
    this.isUploading.set(true);
    this.uploadSuccess.set(false);
    this.errorMessage.set('');

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Data URL içinden sadece Base64 kısmını al
      const base64String = (reader.result as string).split(',')[1];

      const payload = {
        base64: base64String,
        mimeType: file.type,
        fileName: `${Date.now()}_${file.name}`,
      };

      // CORS hatalarını önlemek için JSON.stringify ile gönderip responseType'ı text alıyoruz
      this.http
        .post(this.scriptUrl, JSON.stringify(payload), { responseType: 'text' })
        .subscribe({
          next: () => {
            this.isUploading.set(false);
            this.uploadSuccess.set(true);
          },
          error: (err) => {
            console.error('Yükleme hatası:', err);
            this.isUploading.set(false);
            this.errorMessage.set(
              'Bağlantı sorunu oluştu, lütfen tekrar deneyin.',
            );
          },
        });
    };

    reader.onerror = () => {
      this.isUploading.set(false);
      this.errorMessage.set('Dosya cihazdan okunamadı.');
    };
  }
}
