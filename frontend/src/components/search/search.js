import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USER = gql`
  query postgresql_getUserByTags($tags: [String!]!) {
    postgresql_getUserByTags(tags: $tags) {
      Name
      Phone
      Email
      LinkedInUrl
    }
  }
`;

function Search() {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { tags: ["React"] },
  });
  if (loading) return <p>Loading ...</p>;
  return (
    <>
      <div className="container">
        <ul className="list-group">
          {data != undefined &&
            data.postgresql_getUserByTags.map((user, index) => {
              return (
                <li className="list-group-item justify-content-between">
                  <span>{user.Name}</span>
                  <span className="badge badge-default badge-pill">
                    {user.Email}
                  </span>
                  <span>{user.Phone}</span>
                  <span>{user.LinkedInUrl}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default Search;
