/* keys and addresses. the site opens fine with these empty, you just won't have
   the admin or the message log until you fill them in (see README.md).
   these keys are meant to be public, the database rules decide what they can do.
   never paste a "secret" or "service_role" key in here */

const CONFIG = {
  name: "Mikaella C. Daet",

  // supabase (free). the url looks like https://abcdefgh.supabase.co
  supabaseUrl: "https://qjcugppfmburogxyiysi.supabase.co",
  // the publishable key, starts with sb_publishable_
  supabaseAnonKey: "sb_publishable_bhIhDuvwMKjJA7zTx0KQqQ_tvO89cxJ",
  // storage bucket, has to match database/setup.sql
  bucket: "portfolio-files",

  // optional: key from web3forms.com if she also wants messages in her gmail
  web3formsKey: ""
};