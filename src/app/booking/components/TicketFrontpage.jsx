import React from 'react'
import Link from 'next/link';


 const TicketFrontpage = (props) => {

  return (
    <>
    
    <div className='border-2 w-60 p-2 mb-3'>
    <div className="flex justify-center items-center">
  <h1 className='font-bold mb-2'> {props.ticketType}</h1>
</div>
        <div className='flex justify-around'>
            <div>
                <p>{props.camping}</p>
                <p>{props.bath}</p>
                <p>{props.toilets}</p>
            </div>
            <p>{props.price}</p>
        </div>
        <div className="flex justify-center">
        <Link href={`../pages/choose-ticket?type=${props.ticketType}`}>


  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
    Buy ticket
  </button>
    </Link>
</div>

    </div>
    </>
  )
}
export default TicketFrontpage