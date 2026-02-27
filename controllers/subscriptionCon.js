import { postsubscriptionDb } from "../models/subscriptionDb.js";

export const postsubscriptionCon = async (req, res) => {
  try {
    const { user_id, package_id, start_date, status } = req.body;

    if (!user_id || !package_id) {
      return res.status(400).json({ error: 'user_id and package_id are required' });
    }

    const data = await postsubscriptionDb({ user_id, package_id, start_date, status });

    res.json({
      message: "Subscription Created!!",
      sub_id: data.insertId  // ✅ return sub_id directly at top level
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};