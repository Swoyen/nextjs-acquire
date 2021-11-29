const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(items, total, user) {
    this.to = user?.email;
    this.name = user?.name;
    this.fromEmail = "swoyensuwal@gmail.com";
    this.fromName = "acquire";
    this.items = items;
    this.total = total;
  }

  async sendMagicLink() {
    const mailOptions = {
      to: this.to,
      from: {
        email: this.fromEmail,
        name: this.fromName,
      },

      dynamic_template_data: {
        firstName: this.name,
        subject: "Your Acquire Receipt",
        total: this.total,
        items: this.items,
      },

      templateId: process.env.SENDGRID_TEMPLATE_ID,
    };

    await sgMail.send(mailOptions).then(() => {
      console.log("Email sent");
    });
  }
};
