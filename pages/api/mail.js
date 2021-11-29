// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Email from "../../utils/email";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { items, total, user } = req.body;
      console.log(items, total, user);
      const result = await sendMail(items, total, user);
      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}

const sendMail = async (items, total, user) => {
  var client = new Email(items, total, user);
  await client.sendMagicLink();
};
