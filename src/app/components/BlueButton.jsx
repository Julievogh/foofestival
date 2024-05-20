import React from 'react'
import Link from 'next/link'

 const BlueButton = (props) => {
  return (
  <Link href={`../pages/${props.link}`}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
      {props.text}
        </button>
    </Link>
  )
}

export default BlueButton
