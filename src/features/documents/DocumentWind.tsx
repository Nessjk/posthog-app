import { useEffect, useRef } from 'react';
import { itemById } from '../../data/items';
import { marked } from 'marked';

type Props = { id: string };
export default function DocumentWindow({ id }: Props) {

  const item = itemById(id);

  // Reference to the editor div where we'll pass in the content
  const ref = useRef<HTMLDivElement>(null);

  // Set initial content once
  useEffect(() => {
    // If the ref is not set, return
    if (!ref.current) return;
    
    // If the item has initial markdown, parse it and set the content
    // using the marked library       
    if (item?.initialMarkdown) {
      ref.current.innerHTML = marked.parse(item.initialMarkdown) as string;
    } 

    // else empty content
    else {
      ref.current.innerHTML = '';
    }
 
  }, [item]);
  
  const exec = (cmd: string) => document.execCommand(cmd);
  
  return (
    <div className="doc">
      <div className="toolbar">
        <button onClick={() => exec('bold')}>B</button>
        <button onClick={() => exec('italic')}>I</button>
        <button onClick={() => exec('underline')}>U</button>
      </div>
      <div ref={ref} className="editor" contentEditable suppressContentEditableWarning />
    </div>
  );
}