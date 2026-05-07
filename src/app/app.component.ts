import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="background-wrap">
      <div class="glass-card">
        <div class="header-section">
          <div class="icon-ring">
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
          </div>
          <h1>Anılarımızı Yakalayın</h1>
          <p>
            En mutlu günümüzde çektiğiniz o güzel kareleri bizimle paylaşır
            mısınız? 💍✨
          </p>
        </div>

        <div class="action-section">
          <label class="upload-btn" [class.disabled]="isUploading()">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style="margin-right: 10px;"
            >
              <path
                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
              ></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <input
              type="file"
              accept="image/*"
              multiple
              (change)="onFilesSelected($event)"
              [disabled]="isUploading()"
            />
            Galeriden Seç veya Fotoğraf Çek
          </label>
          <p class="hint-text">
            💡 İpucu: Sorunsuz bir yükleme için tek seferde en fazla 15 fotoğraf
            seçebilirsiniz.
          </p>
        </div>

        @if (selectedFiles().length > 0 && !isUploading()) {
          <div class="selection-info slide-in">
            <div class="file-count">
              <span class="badge">{{ selectedFiles().length }}</span>
              <span>kare gönderilmeyi bekliyor</span>
            </div>
            <button class="send-btn" (click)="startUpload()">
              {{
                errorMessage() ? 'Kalanları Tekrar Dene 🔄' : 'Hemen Gönder 🚀'
              }}
            </button>
          </div>
        }

        @if (isUploading()) {
          <div class="status-box slide-in loading">
            <div class="spinner"></div>
            <p class="progress-title">{{ uploadProgress() }}</p>
            <p class="warning-text">
              Lütfen işlem tamamlanana kadar ekranı kilitlemeyin veya sayfayı
              kapatmayın 🙏
            </p>
          </div>
        }

        @if (uploadSuccess()) {
          <div class="status-box slide-in success">
            <p>
              🎉 Muhteşem! Fotoğraflarınız albümümüze eklendi. Çok teşekkür
              ederiz! ❤️
            </p>
          </div>
        }

        @if (errorMessage()) {
          <div class="status-box slide-in error">
            <p>{{ errorMessage() }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      :host {
        display: block;
        min-height: 100vh;
      }
      ::ng-deep body {
        margin: 0;
        padding: 0;
      }

      .background-wrap {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background: linear-gradient(
          135deg,
          #ff9a9e 0%,
          #fecfef 50%,
          #a1c4fd 100%
        );
        background-size: 200% 200%;
        animation: gradientMove 10s ease infinite;
      }

      @keyframes gradientMove {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .glass-card {
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 255, 255, 0.6);
        border-radius: 30px;
        padding: 40px 30px;
        width: 100%;
        max-width: 450px;
        box-shadow:
          0 25px 50px rgba(0, 0, 0, 0.15),
          inset 0 0 0 1px rgba(255, 255, 255, 0.5);
        text-align: center;
      }

      .header-section {
        margin-bottom: 25px;
      }

      .icon-ring {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #ff0844 0%, #ffb199 100%);
        color: white;
        border-radius: 50%;
        margin-bottom: 20px;
        box-shadow: 0 10px 25px rgba(255, 8, 68, 0.4);
      }

      h1 {
        font-family: 'Georgia', 'Times New Roman', serif;
        color: #2c1e31;
        font-size: 2.2rem;
        font-style: italic;
        font-weight: 700;
        margin-bottom: 12px;
      }

      p {
        color: #5a4b5e;
        font-size: 1.05rem;
        line-height: 1.5;
        margin: 0;
      }

      .action-section {
        margin-bottom: 20px;
      }

      .upload-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 18px 24px;
        font-size: 1.15rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #ffffff;
        border-radius: 16px;
        cursor: pointer;
        box-shadow: 0 10px 20px rgba(118, 75, 162, 0.3);
        transition: all 0.3s ease;
      }

      .upload-btn:hover:not(.disabled) {
        transform: translateY(-3px);
        box-shadow: 0 15px 25px rgba(118, 75, 162, 0.4);
      }

      .upload-btn:active:not(.disabled) {
        transform: translateY(1px);
      }
      .upload-btn.disabled {
        background: #cbd5e0;
        box-shadow: none;
        cursor: not-allowed;
      }
      .upload-btn input {
        display: none;
      }

      .hint-text {
        font-size: 0.9rem;
        color: #718096;
        margin-top: 12px;
        font-weight: 500;
        line-height: 1.4;
      }

      .selection-info {
        background: rgba(255, 255, 255, 0.6);
        border-radius: 20px;
        padding: 20px;
        margin-top: 25px;
        border: 2px dashed #ffb199;
      }

      .file-count {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 15px;
        color: #4a3f4e;
        font-weight: 600;
        font-size: 1.05rem;
      }

      .badge {
        background: #ff0844;
        color: #fff;
        padding: 6px 14px;
        border-radius: 20px;
        font-weight: 800;
        font-size: 1.2rem;
        box-shadow: 0 4px 10px rgba(255, 8, 68, 0.3);
      }

      .send-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 16px;
        font-size: 1.15rem;
        font-weight: 700;
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        color: white;
        border: none;
        border-radius: 14px;
        cursor: pointer;
        box-shadow: 0 10px 20px rgba(17, 153, 142, 0.3);
        transition: all 0.3s ease;
      }

      .send-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 25px rgba(17, 153, 142, 0.4);
      }

      .status-box {
        margin-top: 20px;
        padding: 20px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        font-weight: 600;
      }

      .status-box.loading {
        background: rgba(255, 255, 255, 0.8);
        color: #764ba2;
        border: 2px solid #e2d1f9;
      }
      .status-box.success {
        background: #f0fff4;
        color: #276749;
        border: 2px solid #c6f6d5;
        font-size: 1.05rem;
      }
      .status-box.error {
        background: #fff5f5;
        color: #c53030;
        border: 2px solid #fed7d7;
        font-size: 1.05rem;
      }

      .progress-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: #2d3748;
        margin-top: 5px;
      }

      .warning-text {
        font-size: 0.9rem !important;
        font-weight: 500;
        color: #e53e3e !important;
        line-height: 1.4;
      }

      .spinner {
        width: 35px;
        height: 35px;
        border: 4px solid rgba(118, 75, 162, 0.2);
        border-radius: 50%;
        border-top-color: #764ba2;
        animation: spin 1s ease-in-out infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .slide-in {
        animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'wedding-shots';

  private http = inject(HttpClient);

  private scriptUrl =
    'https://script.google.com/macros/s/AKfycbzQPraLDHcinRYzOk1YeP2XBOebLyy7VqrdxPlbcPUB-IGLegzDmQBQk6cPiL1IIGN0/exec';

  selectedFiles = signal<File[]>([]);
  isUploading = signal<boolean>(false);
  uploadProgress = signal<string>('');
  uploadSuccess = signal<boolean>(false);
  errorMessage = signal<string>('');

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (input.files.length > 15) {
        this.selectedFiles.set([]);
        this.uploadSuccess.set(false);
        this.errorMessage.set(
          'Sistemin yorulmaması için tek seferde en fazla 15 fotoğraf seçebilirsiniz. Lütfen baştan seçim yapın.',
        );
        input.value = '';
        return;
      }

      this.selectedFiles.set(Array.from(input.files));
      this.uploadSuccess.set(false);
      this.errorMessage.set('');
    }
  }

  async startUpload() {
    const files = this.selectedFiles();
    if (files.length === 0) return;

    this.isUploading.set(true);
    this.errorMessage.set('');
    this.uploadSuccess.set(false);

    let successCount = 0;
    let failedFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      this.uploadProgress.set(
        `Harika kareler yükleniyor: ${i + 1} / ${files.length} ⏳`,
      );

      try {
        await this.uploadSingleFile(files[i]);
        successCount++;
      } catch (err) {
        console.error(`${files[i].name} yüklenirken hata oluştu:`, err);
        failedFiles.push(files[i]);
      }
    }

    this.isUploading.set(false);

    if (failedFiles.length === 0 && successCount > 0) {
      this.uploadSuccess.set(true);
      this.selectedFiles.set([]);
    } else if (failedFiles.length > 0) {
      this.selectedFiles.set(failedFiles);

      if (successCount > 0) {
        this.errorMessage.set(
          `${successCount} kare başarıyla eklendi ancak ağ koptuğu için ${failedFiles.length} kare gönderilemedi. Lütfen tekrar deneyin.`,
        );
      } else {
        this.errorMessage.set('Bağlantı sorunu oluştu, lütfen tekrar deneyin.');
      }
    }
  }

  private uploadSingleFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        const payload = {
          base64: base64String,
          mimeType: file.type,
          fileName: `${Date.now()}_${file.name}`,
        };

        this.http
          .post(this.scriptUrl, JSON.stringify(payload), {
            responseType: 'text',
          })
          .subscribe({
            next: (res) => resolve(res),
            error: (err) => reject(err),
          });
      };

      reader.onerror = (error) => reject(error);
    });
  }
}
