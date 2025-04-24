import React, { useState, props } from 'react'


export default function Item(props) {
    const [count, setcount ] = useState(props.count);
    // const id = props.id;
  return (
    <>
    <div className='flex flex-row gap-6 bg-green-700 items-center justify-center'>
    <button className="bg-white" onClick={() => props.handleDec(props.id)}>-</button>
        <span>{props.name}</span>
        <span>{props.count}</span>
        <button className="bg-white" onClick={() => props.handleInc(props.id)}>+</button>
        </div>
    </>
  )
}
