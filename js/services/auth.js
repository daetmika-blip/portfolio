/* admin login. who counts as admin is decided in the database (setup.sql) */

const Auth = {
  async login(email, password) {
    const { error } = await Backend.db.auth.signInWithPassword({ email, password });
    if (error) {
      const wrong = /invalid login/i.test(error.message);
      return { ok: false, error: wrong ? "Wrong email or password." : error.message };
    }
    return { ok: true, isAdmin: await this.isAdmin() };
  },

  async isAdmin() {
    const { data, error } = await Backend.db.rpc("is_admin");
    return !error && data === true;
  },

  async session() {
    const { data } = await Backend.db.auth.getSession();
    return data.session;
  },

  async logout() {
    await Backend.db.auth.signOut();
  }
};
