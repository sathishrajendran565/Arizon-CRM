import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import TagsInput from "react-tagsinput";
import LogoImg from "../../assets/img/logo.svg";
import "./register.css";

const CREATE_USER = gql`
  mutation postgresql_createUser($input: UserInput!) {
    postgresql_createUser(input: $input) {
      Name
      Phone
      Email
      LinkedInUrl
      UUID
    }
  }
`;

function Register() {
  const [state, setState] = useState({ tags: [] });

  const [user, setUser] = useState({
    Name: "",
    Phone: "",
    Email: "",
    LinkedInUrl: "",
    Tags: state,
  });

  const [submitted, setSubmitted] = useState(false);

  const [postgresql_createUser, { data }] = useMutation(CREATE_USER);

  const handleTagsChange = (tags) => {
    setState({ tags });
    let tagsArray = [];

    tags.map((item) => {
      return tagsArray.push({ TagName: item });
    });

    setUser((user) => ({ ...user, ["Tags"]: tagsArray }));
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (user.Name && user.Phone && user.Email && user.LinkedInUrl) {
      postgresql_createUser({
        variables: {
          input: user,
        },
      });
    }
  }

  return (
    <div className="page-wrapper bg-dark p-t-100 p-b-50">
      <div className="wrapper wrapper--w900">
        <div className="card card-6">
          <div className="card-heading">
            <img src={LogoImg} style={{ width: "100%", height: "100px" }} />
          </div>
          <div className="card-body">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="name">Name</div>
                <div className="value">
                  <input
                    className="input--style-6"
                    type="text"
                    name="Name"
                    value={user.Name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="name">Phone number</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      className="input--style-6"
                      type="text"
                      name="Phone"
                      value={user.Phone}
                      onChange={handleChange}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Email</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      className="input--style-6"
                      type="text"
                      name="Email"
                      value={user.Email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">LinkedInUrl</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      className="input--style-6"
                      type="text"
                      name="LinkedInUrl"
                      value={user.LinkedInUrl}
                      onChange={handleChange}
                      placeholder="www.linkedin.com"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Tech stack</div>
                <div className="value">
                  <div className="input-group">
                    <TagsInput
                      className="input--style-6"
                      type="text"
                      name="tags"
                      value={state.tags}
                      onChange={handleTagsChange}
                      placeholder=".net react kubernetes etc"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="form-row">
                <div className="name">Message</div>
                <div className="value">
                  <div className="input-group">
                    <textarea
                      className="textarea--style-6"
                      name="message"
                      placeholder="Message sent to the employer"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Upload CV</div>
                <div className="value">
                  <div className="input-group js-input-file">
                    <input
                      className="input-file"
                      type="file"
                      name="file_cv"
                      id="file"
                    />
                    <label className="label--file" htmlFor="file">
                      Choose file
                    </label>
                    <span className="input-file__info">No file chosen</span>
                  </div>
                  <div className="label--desc">
                    Upload your CV/Resume or any other relevant file. Max file
                    size 50 MB
                  </div>
                </div>
              </div> */}
            </form>
          </div>
          <div className="card-footer">
            <button className="btn btn--radius-2 btn--blue-2" type="submit">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
