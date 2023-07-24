import React from 'react'

const CardPage = ({title, description}) => {
  return (
    <div className="card-1">
              <div className="content">
                <img src={firstCard} alt="" />
                <h1>
                  A UX Case Study Creating a Studious Environment for Students:
                </h1>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident.
                </p>
                <p>
           {createdAt.split("T")[0]}
          </p>
              </div>
            </div>
  )
}

export default CardPage