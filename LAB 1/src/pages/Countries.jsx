import React from 'react'

export default function Countries(props) {
    const elements = props.elements;
    // flattened Arr
    const flat = elements.flat();
    // random Arr
    const random = flat.sort(() => Math.random() - 0.5);

    // 1st click = 'Egypt' (bordered) + 2nd click 'Cairo' => REMOVE BOTH
    const handleClick = () => {
        console.log(e.target.value);
    }
  return (
    <>
        <div>{random.map((elem)=>
            <button onClick="{handleClick}" className='btn btn-success'>{elem}</button>)}
        </div>
    </>
  )
}
