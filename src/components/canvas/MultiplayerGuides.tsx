import { memo } from "react";
import Cursor from "./Cursor";
import { shallow, useOthersConnectionIds, useOthersMapped } from "@liveblocks/react";
import { colorToCss } from "~/utils";
import Path from "./Path";
import { CanvasMode } from "~/types";

function Cursors() {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor
          key={connectionId}
          connectionId={connectionId}
        />
      ))}
    </>
  );
}

function Drafts({ canvasStateMode }: { canvasStateMode: CanvasMode }) {
  const others = useOthersMapped((other) => (
    { pencilDraft: other.presence.pencilDraft, penColor: other.presence.penColor }
  ), shallow)

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : "#CCC"}
              opacity={100}
              canvasStateMode={canvasStateMode}
            />
          )
        }
        return null;
      })}
    </>
  )
}

export default memo(function MultiPlayerGuides({ canvasStateMode }: { canvasStateMode: CanvasMode } ) {
  return (
    <>
      <Cursors />
      <Drafts canvasStateMode={canvasStateMode} />
    </>
  )
})