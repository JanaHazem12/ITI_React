import React, { useState } from 'react'
import Item from './Item';
    

export default function Cart() {
    const [items, setItems] = useState([
        { id: 1, name: 'Burger', count: 0 },
        { id: 2, name: 'Pizza', count: 0 },
        { id: 3, name: 'Fries', count: 0 },
    ]);

    const handleInc = (id) => {
        const newItems = items.map((itm) =>
            {if(itm.id === id){
                itm.count++;
                return itm;
            } else{
                return itm;
            }
        })
        setItems(newItems);
    };

    const handleDec = (id) => {
        const newItems = items.map((itm) =>
        {if(itm.id === id && itm.count > 0){
            itm.count--;
            return itm;
        } else{
            return itm;
        }
    })
        setItems(newItems);
    }
    
    const handleReset = () => {
        const newItems = items.map((itm) => (
            {...itm, count: 0}
        ))
        setItems(newItems);
    }
    // console.log(items);

  return (
    <>
    <div>
    {items.map((itm) => (
    <Item id={itm.id} name={itm.name} count={itm.count} handleInc={handleInc} handleDec={handleDec}/>
    ))}
    <button onClick={handleReset}>Reset</button>
    </div>
    </>
  )
}
