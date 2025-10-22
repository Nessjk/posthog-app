// FolderWindow.tsx
import { allItems, type DesktopItem } from "../../data/items";
import { openWindow } from "../windows/windowsSlice";
import { useAppDispatch } from "../../hooks.ts";

import { trackItemOpen } from "../../analytics/helper.ts";
import { type ReducedDesktopItem } from "../../components/Icon";

import Icon from "../../components/Icon"; // Add this import

type Props = { id: string };

export default function FolderWindow({ id }: Props) {
  const dispatch = useAppDispatch();
  const folderItem = allItems.find((item) => item.id === id);

  if (!folderItem || folderItem.kind !== "folder") {
    return <div>Not a folder</div>;
  }

  const childItems =
    folderItem.children
      ?.map((childId) => allItems.find((item) => item.id === childId))
      .filter((item): item is DesktopItem => item !== undefined) || [];

  const handleItemClick = (item: DesktopItem) => {
    // For simplicity tracking less data, making sure this type is used everywhere posthog is tracking
    const reducedDesktopItem: ReducedDesktopItem = {
      id: item.id,
      name: item.name,
      kind: item.kind,
    };

    switch (item.kind) {
      case "link":
        trackItemOpen(reducedDesktopItem);
        window.open(item.url, "_blank");
        break;
      case "doc":
        trackItemOpen(reducedDesktopItem);
        dispatch(openWindow({ itemId: item.id }));
        break;
      default:
        console.warn(`Unknown item kind: ${item.kind}`);
    }
  };

  return (
    <div className="folder-content">
      <div className="folder-items">
        {childItems.map((item) => (
          <div
            key={item.id}
            className="folder-item"
            onClick={() => handleItemClick(item)}
          >
            <Icon id={item.id} name={item.name} icon={item.icon} />
            <span className="folder-item-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
