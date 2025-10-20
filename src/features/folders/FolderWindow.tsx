// FolderWindow.tsx
import { allItems } from "../../data/items";
import Icon from "../../components/Icon"; // Add this import

type Props = { id: string };

export default function FolderWindow({ id }: Props) {
  const folderItem = allItems.find((item) => item.id === id);

  if (!folderItem || folderItem.kind !== "folder") {
    return <div>Not a folder</div>;
  }

  const childItems =
    folderItem.children
      ?.map((childId) => allItems.find((item) => item.id === childId))
      .filter(Boolean) || [];

  return (
    <div className="folder-content">
      <div className="folder-items">
        {childItems.map((item) => (
          <div key={item.id} className="folder-item">
            <Icon id={item.id} name={item.name} icon={item.icon} />
            <span className="folder-item-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
