/* message log. visitors can only add, only the admin can read */

const Messages = {
  async send(m) {
    const { error } = await Backend.db.from("messages").insert({ name: m.name, email: m.email, message: m.message });
    if (error) throw new Error(error.message);
  },

  async list() {
    const { data, error } = await Backend.db.from("messages").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  async setStatus(id, status) {
    const { data, error } = await Backend.db.from("messages").update({ status }).eq("id", id).select();
    if (error) throw new Error(error.message);
    if (!data || !data.length) throw new Error("Not allowed (are you logged in as admin?)");
  }
};
