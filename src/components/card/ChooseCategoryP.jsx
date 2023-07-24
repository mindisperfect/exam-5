import React from 'react'


const ChooseCategoryP = ({name, description}) => {
  return (
    <div className="home-category-card">
              {/* <img src={fourthIcon} alt="" /> */}
              <img src={`${request}${catigory.id}.png`} alt="" />
              <h1>{name}</h1>
              <p>{description}</p>
            </div>
  )
}

export default ChooseCategoryP