

const GetNewsLastOne = ({ title, description, createdAt, name, user }) => {
  return (
    <section className="headercontent">
      <h1>{title}</h1>
      <p>By <span>{user.first_name}</span></p>
      <p>
        <b>Created at: </b> {createdAt.split("T")[0]}
      </p>
      <h1>{name}</h1>
      <p style={{maxWidth: "599px"}}>{description}</p>
      <button>Read More</button>
    </section>
  );
};

export default GetNewsLastOne;
