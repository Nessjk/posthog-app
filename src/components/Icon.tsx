import { useRef } from "react";
import { useAppDispatch } from "../hooks.ts";
import { openWindow } from "../features/windows/windowsSlice";
import { iconUrl } from "../icons";
import { itemById } from "../data/items";

type Props = {
  id: string;
  name: string;
  icon: string;
};

export default function Icon({ id, name, icon }: Props) {
  const dispatch = useAppDispatch();

  // For the double click detection
  // check the time between two clicks
  // using 300ms as the threshold
  const lastClick = useRef<number>(0);

  const onClick = () => {
    const now = Date.now();

    // Get the item to check its kind
    const item = itemById(id);

    // Handle links differently - open URL instead of window
    if (item?.kind === "link") {
      window.open(item.url, "_blank");
    }

    // For other items, use double-click to open window
    if (now - lastClick.current < 300) dispatch(openWindow({ itemId: id }));

    lastClick.current = now;
  };

  // Get the icon url from the icons/index.ts file
  const src = iconUrl(icon);

  return (
    <button className="icon" onClick={onClick} title={name}>
      {src ? (
        <img src={src} alt="" width={40} height={40} />
      ) : (
        <div className="icon-emoji">❔</div>
      )}
      {/* <div className="icon-name">{name}</div> */}
    </button>
  );
}
