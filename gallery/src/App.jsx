import { useState } from 'react';
import { sculptureList } from './data.jsx';

export default function Gallery() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    function handleNextClick() {
        (index < 11 && setIndex(index + 1));
    }

    function handlePreviousClick() {
        (index > 0 && setIndex(index - 1));
    }

    function handleMoreClick() {
        setShowMore(!showMore);
    }

    function Button({ name, onClick }) {
        return (
            <button onClick={onClick}>{name}</button>
        );
    }

    let sculpture = sculptureList[index];
    return (
        <>
            <div id='nav-btn'>
                <Button name='Next' onClick={handleNextClick} />
                <Button name='Previous' onClick={handlePreviousClick} />
                
            </div>
            <h2>
                <i>{sculpture.name} </i>
                by {sculpture.artist}
            </h2>
            <h3>
                ({index + 1} of {sculptureList.length})
            </h3>
            <button onClick={handleMoreClick}>
                {showMore ? 'Hide' : 'Show'} details
            </button>
            {showMore && <p>{sculpture.description}</p>}
            <br />
            <img
                src={sculpture.url}
                alt={sculpture.alt}
            />
        </>
    );
}
