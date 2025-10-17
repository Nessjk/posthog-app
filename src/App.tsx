import { useAppSelector } from './hooks'
import { desktopItems } from './data/items'
import { useAppDispatch } from './hooks.ts';

import DocumentWindow from './features/documents/DocumentWind'
import Icon from './components/Icon'
import './App.css'

import { closeWindow } from './features/windows/windowsSlice'
import hireBlocksImage from './assets/hire-blocks.png'

function App() {
  const windows = useAppSelector(state => state.windows.byId)
  const dispatch = useAppDispatch();

  return (
    <div className="desktop">
      <div className="desktop-items">
        {desktopItems.map(item => (
          <div 
            key={item.id} 
            className="desktop-item"
          >
            <Icon id={item.id} name={item.name} icon={item.icon} />
            <span className="desktop-item-name">{item.name}</span>
          </div>
        ))}
      </div>
      
      {Object.values(windows).map(window => (
        <div 
          key={window.id}
          className="window"
          style={{
            left: window.x,
            top: window.y,
            width: window.width,
            height: window.height,
            zIndex: window.z
          }}
        >
          <div className="window-header">
            <span>{window.itemId}</span>
            <button onClick={() => dispatch(closeWindow({ id: window.id }))}>×</button>
          </div>
          <div className="window-content">
            <DocumentWindow id={window.itemId} />
          </div>
        </div>
      ))}
      
      <img 
        src={hireBlocksImage} 
        alt="Hire blocks" 
        className="hire-blocks-image"
      />
    </div>
  )
}

export default App
