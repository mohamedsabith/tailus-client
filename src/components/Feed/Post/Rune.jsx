import React from 'react'

const Rune = ({color,Icon,click}) => {
  return (
    <>
      <div
      className={`${color} w-9 h-9 p-2 rounded-full hover-transition cursor-pointer`} onClick={click}>
      {Icon}
    </div>
    </>
  )
}

export default Rune