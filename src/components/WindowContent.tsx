// This exist because it was really ugly to switch windows in the main App.tsx

import DocumentWindow from "../features/documents/DocumentWind";
import FolderWindow from "../features/folders/FolderWindow";
import { itemById } from "../data/items";

type Props = { itemId: string };

export default function WindowContent({ itemId }: Props) {
  const item = itemById(itemId);

  if (item?.kind === "folder") {
    return <FolderWindow id={itemId} />;
  }

  return <DocumentWindow id={itemId} />;
}
