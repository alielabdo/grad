import { useOther } from "@liveblocks/react";
import { memo } from "react";
import { connectionIdToColor } from "~/utils";

function Cursor({ connectionId }: { connectionId: number }) {
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <path
      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      fill={connectionIdToColor(connectionId)}
    />
  )
}

export default memo(Cursor);