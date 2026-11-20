/* connects to supabase */

const Backend = {
  db: null,
  configured: false,

  init() {
    const lib = window.supabase; // loaded from the <script> tag in the HTML
    if (CONFIG.supabaseUrl && CONFIG.supabaseAnonKey && lib && lib.createClient) {
      this.db = lib.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
      this.configured = true;
    }
  }
};

Backend.init();
