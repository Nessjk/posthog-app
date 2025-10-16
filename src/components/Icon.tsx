import { useRef } from 'react';
import { useAppDispatch } from '../hooks.ts';
import { openWindow } from '../features/windows/windowsSlice';
import { iconUrl } from '../icons';

type Props = { 
    id: string; 
    name: string; 
    icon: string
};

export default function Icon({ id, name, icon }: Props) {
  const dispatch = useAppDispatch();
  
  
  // For the double click detection
  // check the time between two clicks
  // using 300ms as the threshold
  const lastClick = useRef<number>(0);


  const onClick = () => {
    const now = Date.now(); // eg 170494068539 ugly TMSTamp
    
    // Difference between now and lastClick.current is less than 300m
    if (now - lastClick.current < 300) dispatch(openWindow({ itemId: id }));
    
    lastClick.current = now;
  };

  // Get the icon url from the icons/index.ts file
  const src = iconUrl(icon);

  return (
    <button className="icon" onClick={onClick} title={name}>
      {src ? <img src={src} alt="" width={32} height={32} /> : <div className="icon-emoji">❔</div>}
      <div className="icon-name">{name}</div>
    </button>
  );
}