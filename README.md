☁️ Kübra & Ege Cloud - Anı Yakalama Uygulaması

Bu proje, Kübra & Ege'nin en mutlu gününde misafirlerin çektikleri o güzel kareleri doğrudan dijital düğün albümüne (Google Drive) aktarmalarını sağlayan, özel olarak geliştirilmiş bulut tabanlı bir fotoğraf yükleme web uygulamasıdır.
Hızlı, güvenli ve modern yapısıyla misafirlerin anılarını saniyeler içinde gelin ve damada ulaştırmasını sağlar.

🎨 Özellikler

📸 Kesintisiz Fotoğraf ve Video Yükleme

* Misafirler doğrudan telefonlarının kamerasını açıp fotoğraf çekebilir veya galerilerinden çoklu seçim yapabilirler.
* Performans ve ağ kararlılığı için tek seferde en fazla 15 fotoğraf yükleme sınırı (Gerekirse art arda defalarca kez kullanılabilir).

✨ Modern ve Şık Arayüz (Glassmorphism)

* Hareketli gradient arka plan ve "buzlu cam" (glassmorphism) efektli zarif kart tasarımı.
* Göz yormayan, düğün konseptine uygun şık ikonlar ve tipografi.

🚀 Anlık İlerleme ve Durum Bildirimi

* Yükleme sırasında misafiri bilgilendiren canlı sayaç ("Harika kareler yükleniyor: 3 / 10 ⏳").
* İşlem sırasında ekranın kilitlenmemesi için uyarı mesajı.

🛡️ Hata Yönetimi ve Akıllı Tekrar Deneme

* Olası bir internet kopması durumunda, başarılı yüklemeleri kaydederken, başarısız olanları hafızada tutar.
* "Kalanları Tekrar Dene 🔄" butonu ile süreci kaldığı yerden devam ettirir.

☁️ Google Ekosistemi Entegrasyonu

* Yüklenen fotoğraflar arka planda otomatik olarak Base64 formatına çevrilir.
* Google Apps Script aracılığıyla doğrudan Kübra & Ege'nin özel Google Drive klasörüne tarih ve saat damgasıyla (timestamp) kaydedilir.

💻 Teknoloji Yığını

* **Frontend:** Angular (Standalone Components, Signals ile state yönetimi).
* **Backend:** Google Apps Script (REST API olarak görev yapar).
* **Deployment & Hosting:** GitHub Pages üzerinden sunulur, `kubraegecloud.com.tr` özel alan adına bağlıdır ve tam SSL (HTTPS) korumasına sahiptir.

🛠️ Kullanım

1. Uygulamaya `https://kubraegecloud.com.tr` adresi üzerinden erişin.
2. "Galeriden Seç veya Fotoğraf Çek" butonuna dokunarak anılarınızı seçin.
3. Seçilen dosya sayısı ekranda belirdiğinde "Hemen Gönder 🚀" butonuna basın.
4. Ekranda çıkan yükleme animasyonunu ve ilerleme durumunu takip edin.
5. Başarı mesajını ("Muhteşem! Fotoğraflarınız albümümüze eklendi") görene kadar sayfayı kapatmayın.

⚡ Gereksinimler

* Modern bir web tarayıcısı (Chrome, Safari, Edge, Firefox vb.)
* Kamera veya fotoğraf galerisine erişim izni (HTTPS zorunluluğu).
* Aktif internet bağlantısı.

💡 Notlar

* Uygulama "Mobile-First" mantığıyla tasarlanmıştır ve her türlü ekran boyutunda kusursuz çalışır (Tamamen responsive).
* Sistemin ve ağın yorulmaması adına, fotoğraflar eşzamanlı (paralel) değil, asenkron ve sıralı (sequential) bir döngü ile tek tek yüklenir.
* Angular CLI ile derlenen statik dosyalar üzerinden çalıştığı için sunucu çökme riski barındırmaz.

💖 Hazırlayan: Kübra & Ege | 5 Temmuz 2026
