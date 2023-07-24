import React from "react";
import postImg from "../../assets/images/blog-post-img.png";
import logo1 from "../../assets/images/blog-logo.png";
import "../../components/styles/Posts.scss";

const PostsP = () => {
  return (
    <section className="container">
      <img src={postImg} style={{ width: "100%", marginTop: "50px" }} alt="" />
      <div className="contentlar">
        <div className="textss">
          <div className="logoss">
            <img src={logo1} alt="" />
            <div className="conten">
              <span>Andrew Jonson</span>
              <h4>Posted on 27th January 2022</h4>
            </div>
          </div>
          <h1>
            Step-by-step guide to choosing great <br /> font pairs
          </h1>
          <h2>Startup (# business, # screen, # life)</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
            blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
            At risus viverra adipiscing at in tellus. Sociis natoque penatibus
            et magnis dis parturient montes. Ridiculus mus mauris vitae
            ultricies leo. Neque egestas congue quisque egestas diam. Risus in
            hendrerit gravida rutrum quisque non.
          </p>
<br /><br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
            blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
            At risus viverra adipiscing at in tellus. Sociis natoque penatibus
            et magnis dis parturient montes. Ridiculus mus mauris vitae
            ultricies leo. Neque egestas congue quisque egestas diam. Risus in
            hendrerit gravida rutrum quisque non.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PostsP;
