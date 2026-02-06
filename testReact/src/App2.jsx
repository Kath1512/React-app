import { useState } from 'react';
import { letters } from './data.jsx';
import Letter from './letter.jsx';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState([]);

  // TODO: allow multiple selection
  let selectedCount = 1;

  function handleToggle(toggledId) {
    // TODO: allow multiple selection
    if(!selectedIds.includes(toggledId)){
      setSelectedIds([...selectedIds, toggledId]);
      }
    else{
      console.log(selectedIds);
      console.log(toggledId);
      setSelectedIds(selectedIds.filter(
        (el) => el != toggledId
      ))
    }
  }

  selectedCount = selectedIds.length;

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              // TODO: allow multiple selection
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}


