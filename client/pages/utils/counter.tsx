import { useState } from 'react';
import { NextPage } from 'next';

const Counter: NextPage = () => {
    const [count, setCount] = useState<number>(0);
    
    const handleIncrease = () => {
        setCount(prev => +(prev)+1)
    }
    
    const handleDecrease = () => {
        setCount(prev => prev <= 0 ? prev : +prev-1)
    }

    return (
        <>
            <h1> this is counter page </h1>
            <div>
                <button onClick={handleDecrease}> - </button>
                <span> {count} </span>
                <button onClick={handleIncrease}> + </button>
            </div>
        </>
    )
}

export default Counter;