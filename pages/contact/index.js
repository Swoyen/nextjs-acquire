const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });
    fetch("/api/mail", {
      method: "post",
      body: JSON.stringify(formData),
    });
    console.log(formData);
  };
  return (
    <div>
      <div className="section-header">Contact</div>
      <form onSubmit={handleSubmit} method="post">
        <p>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
        </p>
        <p>
          <label htmlFor="message">Message</label>
          <input type="text" name="message" />
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
