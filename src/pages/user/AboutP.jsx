import React, { Fragment } from "react";
import "../../components/styles/About.scss"
import aboutUsImg1 from "../../assets/images/about-img-1.png"
import aboutUsImg2 from "../../assets/images/about-img-2.png"

const AboutP = () => {
  return (
    <Fragment>
      <div className="container">
      <section class="mision-section">
        <div class="mision-left">
          <h4>OUR MISION</h4>
          <h2>
            Creating valuable content for <br />
            creatives all around the world
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod <br />
            tempor incididunt ut labore et dolore magna aliqua. Non blandit
            massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus
            viverra adipiscing at in tellus.
          </p>
        </div>
        <div class="mision-right">
          <h4>OUR MISION</h4>
          <h2>
            A platform that empowers <br />
            individuals to improve
          </h2>
          <p style={{paddingRight: "100px"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            <br />
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
            blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
            At risus viverra adipiscing at in tellus.
          </p>
        </div>
      </section>
      </div>

      <section class="container history-section">
        <div class="history-card-1">
          <div class="history-text-1">
            <h2>Our team of creatives</h2>
            <h3>
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              <br />
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut{" "}
              <br />
              enim ad minim veniam, quis nostrud exercitation ullamco laboris{" "}
              <br />
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor{" "}
              <br />
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
          <img
            class="img-1"
            src={aboutUsImg1}
            alt=""
          />
        </div>
        <div class="history-card-1">
          <img
            class="img-2"
            src={aboutUsImg2}
            alt=""
          />
          <div class="history-text-2">
            <h2>Why we started this Blog</h2>
            <h3>
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              <br />
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut{" "}
              <br />
              enim ad minim veniam, quis nostrud exercitation ullamco laboris{" "}
              <br />
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in{" "}
              <br />
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutP;
