module.exports = {

"[project]/src/types.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CanvasMode": (()=>CanvasMode),
    "LayerType": (()=>LayerType),
    "Side": (()=>Side)
});
var LayerType = /*#__PURE__*/ function(LayerType) {
    LayerType[LayerType["Rectangle"] = 0] = "Rectangle";
    LayerType[LayerType["Ellipse"] = 1] = "Ellipse";
    LayerType[LayerType["Path"] = 2] = "Path";
    LayerType[LayerType["Text"] = 3] = "Text";
    return LayerType;
}({});
var CanvasMode = /*#__PURE__*/ function(CanvasMode) {
    CanvasMode[CanvasMode["None"] = 0] = "None";
    CanvasMode[CanvasMode["Dragging"] = 1] = "Dragging";
    CanvasMode[CanvasMode["Inserting"] = 2] = "Inserting";
    CanvasMode[CanvasMode["Pencil"] = 3] = "Pencil";
    CanvasMode[CanvasMode["Resizing"] = 4] = "Resizing";
    CanvasMode[CanvasMode["Translating"] = 5] = "Translating";
    return CanvasMode;
}({});
var Side = /*#__PURE__*/ function(Side) {
    Side[Side["Top"] = 1] = "Top";
    Side[Side["Bottom"] = 2] = "Bottom";
    Side[Side["Left"] = 4] = "Left";
    Side[Side["Right"] = 8] = "Right";
    return Side;
}({});
}}),
"[project]/src/utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "colorToCss": (()=>colorToCss),
    "getSvgPathFromStroke": (()=>getSvgPathFromStroke),
    "penPointsToPathLayer": (()=>penPointsToPathLayer),
    "pointerEventToCanvasPoint": (()=>pointerEventToCanvasPoint),
    "resizeBounds": (()=>resizeBounds)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-ssr] (ecmascript)");
;
function colorToCss(color) {
    return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}
function resizeBounds(bounds, corner, point) {
    const result = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height
    };
    if (corner === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Left || (corner & __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Left) !== 0) {
        result.x = Math.min(point.x, bounds.x + bounds.width);
        result.width = Math.abs(bounds.x + bounds.width - point.x);
    }
    if (corner === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Right || (corner & __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Right) !== 0) {
        result.x = Math.min(point.x, bounds.x);
        result.width = Math.abs(point.x - bounds.x);
    }
    if (corner === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Top || (corner & __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Top) !== 0) {
        result.y = Math.min(point.y, bounds.y + bounds.height);
        result.height = Math.abs(bounds.y + bounds.height - point.y);
    }
    if (corner === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Bottom || (corner & __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Bottom) !== 0) {
        result.y = Math.min(point.y, bounds.y);
        result.height = Math.abs(point.y - bounds.y);
    }
    return result;
}
function penPointsToPathLayer(points, color) {
    let left = Number.POSITIVE_INFINITY;
    let top = Number.POSITIVE_INFINITY;
    let right = Number.NEGATIVE_INFINITY;
    let bottom = Number.NEGATIVE_INFINITY;
    for (const point of points){
        const [x, y] = point;
        if (x === undefined || y === undefined) continue;
        if (left > x) {
            left = x;
        }
        if (top > y) {
            top = y;
        }
        if (right < x) {
            right = x;
        }
        if (bottom < y) {
            bottom = y;
        }
    }
    return {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Path,
        x: left,
        y: top,
        height: bottom - top,
        width: right - left,
        fill: color,
        stroke: color,
        opacity: 100,
        points: points.filter((point)=>point[0] !== undefined && point[1] !== undefined && point[2] !== undefined).map(([x, y, pressure])=>[
                x - left,
                y - top,
                pressure
            ])
    };
}
const pointerEventToCanvasPoint = (e, camera)=>{
    return {
        x: Math.round(e.clientX) - camera.x,
        y: Math.round(e.clientY) - camera.y
    };
};
function getSvgPathFromStroke(stroke) {
    if (!stroke.length) return "";
    const d = stroke.reduce((acc, [x0, y0], i, arr)=>{
        const nextPoint = arr[(i + 1) % arr.length];
        if (!nextPoint) return acc;
        const [x1, y1] = nextPoint;
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
    }, [
        "M",
        ...stroke[0] ?? [],
        "Q"
    ]);
    d.push("Z");
    return d.join(" ");
}
}}),
"[project]/src/components/canvas/Rectangle.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Rectangle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
;
;
function Rectangle({ id, layer, onPointerDown }) {
    const { x, y, width, height, fill, stroke, opacity, cornerRadius } = layer;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            onPointerDown: (e)=>onPointerDown(e, id),
            style: {
                transform: `translate(${x}px, ${y}px)`
            },
            width: width,
            height: height,
            fill: fill ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(fill) : "#CCC",
            strokeWidth: 1,
            stroke: stroke ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(stroke) : "#CCC",
            opacity: `${opacity ?? 100}%`,
            rx: cornerRadius ?? 0,
            ry: cornerRadius ?? 0
        }, void 0, false, {
            fileName: "[project]/src/components/canvas/Rectangle.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Rectangle.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/canvas/Ellipse.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Ellipse)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
;
;
function Ellipse({ id, layer, onPointerDown }) {
    const { x, y, width, height, fill, stroke, opacity } = layer;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
            onPointerDown: (e)=>onPointerDown(e, id),
            style: {
                transform: `translate(${x}px, ${y}px)`
            },
            fill: fill ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(fill) : "#CCC",
            stroke: stroke ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(stroke) : "#CCC",
            cx: width / 2,
            cy: height / 2,
            rx: width / 2,
            ry: height / 2,
            strokeWidth: "1",
            opacity: `${opacity ?? 100}%`
        }, void 0, false, {
            fileName: "[project]/src/components/canvas/Ellipse.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Ellipse.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/canvas/Text.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Text)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-ssr] (ecmascript) <export _useMutation as useMutation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
function Text({ id, layer, onPointerDown }) {
    const { x, y, width, height, fill, stroke, opacity, text, fontSize, fontFamily, fontWeight } = layer;
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(text);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleChange = (e)=>{
        setInputValue(e.target.value);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [
        isEditing
    ]);
    const handleDoubleClick = ()=>{
        setIsEditing(true);
    };
    const updateText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({ storage }, newText)=>{
        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(id);
        if (layer) {
            layer.update({
                text: newText
            });
        }
    }, [
        id
    ]);
    const handleBlur = ()=>{
        setIsEditing(false);
        updateText(inputValue);
    };
    const handleKeyDown = (e)=>{
        if (e.key === "Enter") {
            setIsEditing(false);
            updateText(inputValue);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        onDoubleClick: handleDoubleClick,
        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("foreignObject", {
            x: x,
            y: y,
            width: width,
            height: height,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                type: "text",
                value: inputValue,
                onChange: handleChange,
                onBlur: handleBlur,
                onKeyDown: handleKeyDown,
                style: {
                    fontSize: `${fontSize}px`,
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(fill),
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Text.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/canvas/Text.tsx",
            lineNumber: 58,
            columnNumber: 11
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
            onPointerDown: (e)=>onPointerDown(e, id),
            x: x,
            y: y + fontSize,
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontFamily: fontFamily,
            fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(fill),
            stroke: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(stroke),
            opacity: `${opacity}%`,
            children: text
        }, void 0, false, {
            fileName: "[project]/src/components/canvas/Text.tsx",
            lineNumber: 84,
            columnNumber: 11
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Text.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/canvas/Path.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Path)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$perfect$2d$freehand$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/perfect-freehand/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
;
;
;
function Path({ x, y, stroke, fill, opacity, points, onPointerDown }) {
    const pathData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSvgPathFromStroke"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$perfect$2d$freehand$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStroke"])(points, {
        size: 16,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5
    }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
        onPointerDown: onPointerDown,
        style: {
            transform: `translate(${x}px, ${y}px)`
        },
        d: pathData,
        fill: fill,
        stroke: stroke ?? "#CCC",
        strokeWidth: 1,
        opacity: `${opacity ?? 100}%`
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Path.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/canvas/LayerComponent.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-ssr] (ecmascript) <export _useStorage as useStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Rectangle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Rectangle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Ellipse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Ellipse.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Text.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Path$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Path.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const LayerComponent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(({ id, onLayerPointerDown })=>{
    const layer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"])((root)=>root.layers.get(id));
    if (!layer) {
        return null;
    }
    switch(layer.type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Rectangle:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Rectangle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: id,
                layer: layer,
                onPointerDown: onLayerPointerDown
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/LayerComponent.tsx",
                lineNumber: 23,
                columnNumber: 14
            }, this);
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Ellipse:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Ellipse$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: id,
                layer: layer,
                onPointerDown: onLayerPointerDown
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/LayerComponent.tsx",
                lineNumber: 25,
                columnNumber: 14
            }, this);
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Text:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Text$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: id,
                layer: layer,
                onPointerDown: onLayerPointerDown
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/LayerComponent.tsx",
                lineNumber: 27,
                columnNumber: 15
            }, this);
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Path:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Path$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onPointerDown: (e)=>onLayerPointerDown(e, id),
                points: layer.points,
                x: layer.x,
                y: layer.y,
                fill: layer.fill ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(layer.fill) : "#CCC",
                stroke: layer.stroke ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(layer.stroke) : "#CCC",
                opacity: layer.opacity
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/LayerComponent.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this);
        default:
            return null;
    }
});
LayerComponent.displayName = "LayerComponent";
const __TURBOPACK__default__export__ = LayerComponent;
}}),
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[project]/src/components/toolsbar/IconButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>IconButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function IconButton({ onClick, children, isActive, disabled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `flex items-center justify-center min-h-[28px] min-w-[28px] rounded-md text-gray-500 hover:enabled:text-gray-700 focus:enabled:text-gray-700 active:enabled:text-gray-900 disabled:cursor-default disabled:opacity-50 ${isActive ? "bg-gray-100 text-blue-600 hover:enabled:text-blue-600 focus:enabled:text-blue-600 active:enabled:text-blue-600" : ""}`,
        onClick: onClick,
        disabled: disabled,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/toolsbar/IconButton.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/toolsbar/MenuIcon.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MenuIcon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function MenuIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "w-4 h-4",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M18 15L12 9L6 15",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/toolsbar/MenuIcon.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/toolsbar/MenuIcon.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/toolsbar/SelectionButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SelectionButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/IconButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/bi/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ri/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$MenuIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/MenuIcon.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function SelectionButton({ isActive, canvasMode, onClick }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleClick = (canvasMode)=>{
        onClick(canvasMode);
        setOpen(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isActive: isActive,
                onClick: ()=>onClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None),
                children: [
                    canvasMode !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None && canvasMode !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BiPointer"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 41,
                        columnNumber: 84
                    }, this),
                    canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BiPointer"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 42,
                        columnNumber: 45
                    }, this),
                    canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RiHand"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 43,
                        columnNumber: 49
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                className: "ml-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$MenuIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-20 mt-1 min-w-[150px] rounded-xl bg-[#1e1e1e] p-2 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None ? "bg-blue-500" : ""}`,
                        onClick: ()=>handleClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-5 text-xs",
                                children: canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None && "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BiPointer"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: "Move"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging ? "bg-blue-500" : ""}`,
                        onClick: ()=>handleClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-5 text-xs",
                                children: canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging && "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RiHand"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: "Hand Tool"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/toolsbar/ShapesSelectionButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ShapesSelectionButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/IconButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/io5/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$MenuIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/MenuIcon.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
function ShapesSelectionButton({ isActive, canvasState, onClick }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleClick = (layerType)=>{
        onClick(layerType);
        setOpen(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isActive: isActive,
                onClick: ()=>onClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Rectangle),
                children: [
                    canvasState.mode !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IoSquareOutline"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 41,
                        columnNumber: 53
                    }, this),
                    canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && (canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Rectangle || canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Text) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IoSquareOutline"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 43,
                        columnNumber: 148
                    }, this),
                    canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Ellipse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IoEllipseOutline"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 45,
                        columnNumber: 100
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                className: "ml-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$MenuIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                    lineNumber: 52,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                lineNumber: 48,
                columnNumber: 5
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-20 mt-1 min-w-[150px] rounded-xl bg-[#1e1e1e] p-2 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Rectangle ? "bg-blue-500" : ""}`,
                        onClick: ()=>handleClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Rectangle),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-5 text-xs",
                                children: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Rectangle && "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IoSquareOutline"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: "Rectangle"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Ellipse ? "bg-blue-500" : ""}`,
                        onClick: ()=>handleClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Ellipse),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-5 text-xs",
                                children: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Ellipse && "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IoEllipseOutline"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: "Ellipse"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/toolsbar/ZoomInButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ZoomInButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/IconButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ai/index.mjs [app-ssr] (ecmascript)");
;
;
;
function ZoomInButton({ onClick, disabled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        onClick: onClick,
        disabled: disabled,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AiOutlineZoomIn"], {
            size: 22,
            color: "#888888"
        }, void 0, false, {
            fileName: "[project]/src/components/toolsbar/ZoomInButton.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/toolsbar/ZoomInButton.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/toolsbar/ZoomOutButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ZoomOutButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/IconButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ai/index.mjs [app-ssr] (ecmascript)");
;
;
;
function ZoomOutButton({ onClick, disabled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        onClick: onClick,
        disabled: disabled,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AiOutlineZoomOut"], {
            size: 22,
            color: "#888888"
        }, void 0, false, {
            fileName: "[project]/src/components/toolsbar/ZoomOutButton.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/toolsbar/ZoomOutButton.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/toolsbar/PencilButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PencilButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/IconButton.tsx [app-ssr] (ecmascript)");
;
;
function PencilButton({ isActive, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        isActive: isActive,
        onClick: onClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "36",
            height: "36",
            viewBox: "0 0 36 36",
            fill: "none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M22.8538 10.1464C22.76 10.0527 22.6329 10 22.5003 10C22.3677 10 22.2406 10.0527 22.1468 10.1464L20.4998 11.7934L24.2068 15.5004L25.8538 13.8544C25.9004 13.8079 25.9373 13.7528 25.9625 13.692C25.9877 13.6313 26.0007 13.5662 26.0007 13.5004C26.0007 13.4346 25.9877 13.3695 25.9625 13.3088C25.9373 13.248 25.9004 13.1928 25.8538 13.1464L22.8538 10.1464ZM23.4998 16.2074L19.7928 12.5004L13.2928 19.0004H13.4998C13.6324 19.0004 13.7596 19.0531 13.8534 19.1468C13.9471 19.2406 13.9998 19.3678 13.9998 19.5004V20.0004H14.4998C14.6324 20.0004 14.7596 20.0531 14.8534 20.1468C14.9471 20.2406 14.9998 20.3678 14.9998 20.5004V21.0004H15.4998C15.6324 21.0004 15.7596 21.0531 15.8534 21.1468C15.9471 21.2406 15.9998 21.3678 15.9998 21.5004V22.0004H16.4998C16.6324 22.0004 16.7596 22.0531 16.8534 22.1468C16.9471 22.2406 16.9998 22.3678 16.9998 22.5004V22.7074L23.4998 16.2074ZM16.0318 23.6754C16.0108 23.6194 15.9999 23.5602 15.9998 23.5004V23.0004H15.4998C15.3672 23.0004 15.24 22.9477 15.1463 22.8539C15.0525 22.7602 14.9998 22.633 14.9998 22.5004V22.0004H14.4998C14.3672 22.0004 14.24 21.9477 14.1463 21.8539C14.0525 21.7602 13.9998 21.633 13.9998 21.5004V21.0004H13.4998C13.3672 21.0004 13.24 20.9477 13.1463 20.8539C13.0525 20.7602 12.9998 20.633 12.9998 20.5004V20.0004H12.4998C12.44 20.0003 12.3808 19.9895 12.3248 19.9684L12.1458 20.1464C12.0982 20.1944 12.0607 20.2515 12.0358 20.3144L10.0358 25.3144C9.99944 25.4053 9.99053 25.5048 10.0102 25.6007C10.0299 25.6966 10.0772 25.7845 10.1464 25.8538C10.2157 25.923 10.3036 25.9703 10.3995 25.99C10.4954 26.0097 10.5949 26.0008 10.6858 25.9644L15.6858 23.9644C15.7487 23.9395 15.8058 23.902 15.8538 23.8544L16.0318 23.6764V23.6754Z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/src/components/toolsbar/PencilButton.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/toolsbar/PencilButton.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/toolsbar/PencilButton.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/toolsbar/TextButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TextButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ai/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/IconButton.tsx [app-ssr] (ecmascript)");
;
;
;
function TextButton({ isActive, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        isActive: isActive,
        onClick: onClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AiOutlineFontSize"], {
            className: "h-5 w-5"
        }, void 0, false, {
            fileName: "[project]/src/components/toolsbar/TextButton.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/toolsbar/TextButton.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/toolsbar/ToolsBar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ToolsBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$SelectionButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/SelectionButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ShapesSelectionButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/ShapesSelectionButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ZoomInButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/ZoomInButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ZoomOutButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/ZoomOutButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$PencilButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/PencilButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$TextButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/TextButton.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
function ToolsBar({ canvasState, setCanvasState, zoomIn, zoomOut, canZoomIn, canZoomOut }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-lg bg-white p-1 shadow-[0_0_3px_rgba(0,0,0,0,18)]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$SelectionButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    isActive: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None || canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging,
                    canvasMode: canvasState.mode,
                    onClick: (canvasMode)=>setCanvasState(canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging ? {
                            mode: canvasMode,
                            origin: null
                        } : {
                            mode: canvasMode
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ShapesSelectionButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    isActive: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Rectangle,
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Ellipse
                    ].includes(canvasState.layerType),
                    canvasState: canvasState,
                    onClick: (layerType)=>setCanvasState({
                            mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting,
                            layerType
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$PencilButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    isActive: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Pencil,
                    onClick: ()=>setCanvasState({
                            mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Pencil
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$TextButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    isActive: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Text,
                    onClick: ()=>setCanvasState({
                            mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting,
                            layerType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Text
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[1px] self-stretch bg-black/10"
                }, void 0, false, {
                    fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ZoomInButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: zoomIn,
                            disabled: !canZoomIn
                        }, void 0, false, {
                            fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ZoomOutButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: zoomOut,
                            disabled: !canZoomOut
                        }, void 0, false, {
                            fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/canvas/SelectionBox.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useSelf__as__useSelf$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-ssr] (ecmascript) <export _useSelf as useSelf>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-ssr] (ecmascript) <export _useStorage as useStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-ssr] (ecmascript)");
;
;
;
;
const handleWidth = 8;
const SelectionBox = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(({ onResizeHandlePointerDown })=>{
    const soleLayerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useSelf__as__useSelf$3e$__["useSelf"])((me)=>me.presence.selection.length === 1 ? me.presence.selection[0] : null);
    const isShowingHandles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"])((root)=>{
        if (!soleLayerId) return false;
        const layer = root.layers.get(soleLayerId);
        return layer?.type !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Path;
    });
    const textRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [textWidth, setTextWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const padding = 16;
    const layers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"])((root)=>root.layers);
    const layer = soleLayerId ? layers?.get(soleLayerId) : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (textRef.current) {
            const bbox = textRef.current.getBBox();
            setTextWidth(bbox.width);
        }
    }, [
        layer
    ]);
    if (!layer) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                className: "pointer-events-none fill-transparent stroke-[#0b99ff] stroke-[1px]",
                style: {
                    transform: `translate(${layer.x}px, ${layer.y}px)`
                },
                width: layer.width,
                height: layer.height
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                className: "fill-[#0b99ff]",
                x: layer.x + layer.width / 2 - (textWidth + padding) / 2,
                y: layer.y + layer.height + 10,
                width: textWidth + padding,
                height: 20,
                rx: 4
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                className: "pointer-events-none fill-white text-[11px]",
                style: {
                    transform: `translate(${layer.x + layer.width / 2}px, ${layer.y + layer.height + 25}px)`
                },
                textAnchor: "middle",
                ref: textRef,
                children: [
                    Math.round(layer.width),
                    " x ",
                    Math.round(layer.height)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this),
            isShowingHandles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        className: "fill-white stroke-[#0b99ff] stroke-[1px]",
                        style: {
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${layer.x - handleWidth / 2}px, ${layer.y - handleWidth / 2}px)`,
                            cursor: 'nwse-resize'
                        },
                        onPointerDown: (e)=>{
                            e.stopPropagation();
                            onResizeHandlePointerDown(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Top + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Left, layer);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        className: "fill-white stroke-[#0b99ff] stroke-[1px]",
                        style: {
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${layer.x + layer.width / 2 - handleWidth / 2}px, ${layer.y - handleWidth / 2}px)`,
                            cursor: 'ns-resize'
                        },
                        onPointerDown: (e)=>{
                            e.stopPropagation();
                            onResizeHandlePointerDown(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Top, layer);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        className: "fill-white stroke-[#0b99ff] stroke-[1px]",
                        style: {
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${layer.x + layer.width - handleWidth / 2}px, ${layer.y - handleWidth / 2}px)`,
                            cursor: 'nesw-resize'
                        },
                        onPointerDown: (e)=>{
                            e.stopPropagation();
                            onResizeHandlePointerDown(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Top + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Right, layer);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                        lineNumber: 95,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        className: "fill-white stroke-[#0b99ff] stroke-[1px]",
                        style: {
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${layer.x - handleWidth / 2}px, ${layer.y + layer.height / 2 - handleWidth / 2}px)`,
                            cursor: 'ew-resize'
                        },
                        onPointerDown: (e)=>{
                            e.stopPropagation();
                            onResizeHandlePointerDown(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Left, layer);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        className: "fill-white stroke-[#0b99ff] stroke-[1px]",
                        style: {
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${layer.x - handleWidth / 2}px, ${layer.y + layer.height - handleWidth / 2}px)`,
                            cursor: 'nesw-resize'
                        },
                        onPointerDown: (e)=>{
                            e.stopPropagation();
                            onResizeHandlePointerDown(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Bottom + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Left, layer);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                        lineNumber: 125,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        className: "fill-white stroke-[#0b99ff] stroke-[1px]",
                        style: {
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${layer.x + layer.width - handleWidth / 2}px, ${layer.y + layer.height / 2 - handleWidth / 2}px)`,
                            cursor: 'ew-resize'
                        },
                        onPointerDown: (e)=>{
                            e.stopPropagation();
                            onResizeHandlePointerDown(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Right, layer);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                        lineNumber: 140,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        className: "fill-white stroke-[#0b99ff] stroke-[1px]",
                        style: {
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${layer.x + layer.width - handleWidth / 2}px, ${layer.y + layer.height - handleWidth / 2}px)`,
                            cursor: 'nwse-resize'
                        },
                        onPointerDown: (e)=>{
                            e.stopPropagation();
                            onResizeHandlePointerDown(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Right + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Bottom, layer);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                        lineNumber: 155,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        className: "fill-white stroke-[#0b99ff] stroke-[1px]",
                        style: {
                            width: `${handleWidth}px`,
                            height: `${handleWidth}px`,
                            transform: `translate(${layer.x + layer.width / 2 - handleWidth / 2}px, ${layer.y + layer.height - handleWidth / 2}px)`,
                            cursor: 'ns-resize'
                        },
                        onPointerDown: (e)=>{
                            e.stopPropagation();
                            onResizeHandlePointerDown(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Bottom, layer);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/SelectionBox.tsx",
                        lineNumber: 170,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true);
});
SelectionBox.displayName = "SelectionBox";
const __TURBOPACK__default__export__ = SelectionBox;
}}),
"[project]/src/components/canvas/Canvas.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Canvas)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-ssr] (ecmascript) <export _useMutation as useMutation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useSelf__as__useSelf$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-ssr] (ecmascript) <export _useSelf as useSelf>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-ssr] (ecmascript) <export _useStorage as useStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$LayerComponent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/LayerComponent.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/core/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ToolsBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/ToolsBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Path$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Path.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$SelectionBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/SelectionBox.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
const MAX_LAYERS = 100;
function Canvas() {
    const roomColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"])((root)=>root.roomColor);
    const layerIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"])((root)=>root.layerIds);
    const pencilDraft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useSelf__as__useSelf$3e$__["useSelf"])((me)=>me.presence.pencilDraft);
    const [camera, setCamera] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        zoom: 1
    });
    const [canvasState, setCanvasState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None
    });
    const onLayerPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({ self, setMyPresence }, e, layerId)=>{
        if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Pencil || canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting) {
            return;
        }
        e.stopPropagation();
        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({
                selection: [
                    layerId
                ]
            });
        }
        const point = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pointerEventToCanvasPoint"])(e, camera);
        setCanvasState({
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Translating,
            current: point
        });
    }, [
        canvasState.mode,
        camera
    ]);
    const onResizeHandlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((corner, initialBounds)=>{
        setCanvasState({
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Resizing,
            initialBounds,
            corner
        });
    }, []);
    const insertLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({ storage, setMyPresence }, layerType, position)=>{
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }
        const liveLayerIds = storage.get("layerIds");
        const layerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])();
        let layer = null;
        if (layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Rectangle) {
            layer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveObject"]({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Rectangle,
                x: position.x,
                y: position.y,
                height: 100,
                width: 100,
                fill: {
                    r: 217,
                    g: 217,
                    b: 217
                },
                stroke: {
                    r: 217,
                    g: 217,
                    b: 217
                },
                opacity: 100
            });
        } else if (layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Ellipse) {
            layer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveObject"]({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Ellipse,
                x: position.x,
                y: position.y,
                height: 100,
                width: 100,
                fill: {
                    r: 217,
                    g: 217,
                    b: 217
                },
                stroke: {
                    r: 217,
                    g: 217,
                    b: 217
                },
                opacity: 100
            });
        } else if (layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Text) {
            layer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveObject"]({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerType"].Text,
                x: position.x,
                y: position.y,
                text: "Text",
                height: 100,
                width: 100,
                fontSize: 16,
                fontWeight: 400,
                fontFamily: "Inter",
                fill: {
                    r: 217,
                    g: 217,
                    b: 217
                },
                stroke: {
                    r: 217,
                    g: 217,
                    b: 217
                },
                opacity: 100
            });
        }
        if (layer) {
            liveLayerIds.push(layerId);
            liveLayers.set(layerId, layer);
            setMyPresence({
                selection: [
                    layerId
                ]
            }, {
                addToHistory: true
            });
        }
    }, []);
    const onWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        setCamera((camera)=>({
                x: camera.x - e.deltaX,
                y: camera.y - e.deltaY,
                zoom: camera.zoom
            }));
    }, []);
    const insertPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({ storage, self, setMyPresence })=>{
        const liveLayers = storage.get("layers");
        const { pencilDraft } = self.presence;
        if (pencilDraft === null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS) {
            setMyPresence({
                pencilDraft: null
            });
            return;
        }
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])();
        liveLayers.set(id, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveObject"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["penPointsToPathLayer"])(pencilDraft, {
            r: 217,
            g: 217,
            b: 217
        })));
        const liveLayerIds = storage.get("layerIds");
        liveLayerIds.push(id);
        setMyPresence({
            pencilDraft: null
        });
        setCanvasState({
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Pencil
        });
    }, []);
    const unselectLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({ self, setMyPresence })=>{
        if (self.presence.selection.length > 0) {
            setMyPresence({
                selection: []
            });
        }
    }, []);
    const onPointerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({}, e)=>{
        const point = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pointerEventToCanvasPoint"])(e, camera);
        if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None) {
            setCanvasState({
                mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None
            });
            unselectLayer();
        } else if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting) {
            insertLayer(canvasState.layerType, point);
        } else if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging) {
            setCanvasState({
                mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging,
                origin: null
            });
        } else if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Pencil) {
            insertPath();
        } else {
            setCanvasState({
                mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].None
            });
        }
    }, [
        canvasState,
        setCanvasState,
        insertLayer,
        unselectLayer
    ]);
    const translateSelectedLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({ storage, self }, point)=>{
        if (canvasState.mode !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Translating) return;
        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y
        };
        const liveLayers = storage.get("layers");
        for (const id of self.presence.selection){
            const layer = liveLayers.get(id);
            if (layer) {
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y
                });
            }
        }
        setCanvasState({
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Translating,
            current: point
        });
    }, [
        canvasState
    ]);
    const resizeSelectedLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({ storage, self }, point)=>{
        if (canvasState.mode !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Resizing) {
            return;
        }
        const bounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resizeBounds"])(canvasState.initialBounds, canvasState.corner, point);
        const liveLayers = storage.get("layers");
        if (self.presence.selection.length > 0) {
            const layer = liveLayers.get(self.presence.selection[0]);
            if (layer) {
                layer.update(bounds);
            }
        }
    }, [
        canvasState
    ]);
    const startDrawing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({ setMyPresence }, point, pressure)=>{
        setMyPresence({
            pencilDraft: [
                [
                    point.x,
                    point.y,
                    pressure
                ]
            ],
            penColor: {
                r: 217,
                g: 217,
                b: 217
            }
        });
    }, []);
    const onPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({}, e)=>{
        const point = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pointerEventToCanvasPoint"])(e, camera);
        if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging) {
            setCanvasState({
                mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging,
                origin: point
            });
            return;
        }
        if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Pencil) {
            startDrawing(point, e.pressure);
            return;
        }
    }, [
        canvasState.mode,
        setCanvasState,
        camera,
        startDrawing
    ]);
    const continueDrawing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({ self, setMyPresence }, point, e)=>{
        const { pencilDraft } = self.presence;
        if (canvasState.mode !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Pencil || pencilDraft === null || e.buttons !== 1) {
            return;
        }
        setMyPresence({
            pencilDraft: [
                ...pencilDraft,
                [
                    point.x,
                    point.y,
                    e.pressure
                ]
            ],
            penColor: {
                r: 217,
                g: 217,
                b: 217
            }
        });
    }, [
        canvasState.mode
    ]);
    const onPointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])(({}, e)=>{
        const point = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pointerEventToCanvasPoint"])(e, camera);
        if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging && canvasState.origin !== null) {
            const deltaX = e.movementX;
            const deltaY = e.movementY;
            setCamera((camera)=>({
                    x: camera.x + deltaX,
                    y: camera.y + deltaY,
                    zoom: camera.zoom
                }));
        } else if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Pencil) {
            continueDrawing(point, e);
        } else if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Resizing) {
            resizeSelectedLayer(point);
        } else if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasMode"].Translating) {
            translateSelectedLayer(point);
        }
    }, [
        canvasState,
        setCanvasState,
        insertLayer,
        continueDrawing,
        resizeSelectedLayer
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "fixed left-0 right-0 h-screen overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        backgroundColor: roomColor ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])(roomColor) : "#1E1E1E"
                    },
                    className: "h-full w-full touch-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        onWheel: onWheel,
                        onPointerUp: onPointerUp,
                        className: "w-full h-full",
                        onPointerDown: onPointerDown,
                        onPointerMove: onPointerMove,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                style: {
                                    transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`
                                },
                                children: [
                                    layerIds?.map((layerId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$LayerComponent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            id: layerId,
                                            onLayerPointerDown: onLayerPointerDown
                                        }, layerId, false, {
                                            fileName: "[project]/src/components/canvas/Canvas.tsx",
                                            lineNumber: 298,
                                            columnNumber: 44
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$SelectionBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        onResizeHandlePointerDown: onResizeHandlePointerDown
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/canvas/Canvas.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/canvas/Canvas.tsx",
                                lineNumber: 293,
                                columnNumber: 13
                            }, this),
                            pencilDraft !== null && pencilDraft.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Path$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                x: 0,
                                y: 0,
                                opacity: 100,
                                fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorToCss"])({
                                    r: 217,
                                    g: 217,
                                    b: 217
                                }),
                                points: pencilDraft
                            }, void 0, false, {
                                fileName: "[project]/src/components/canvas/Canvas.tsx",
                                lineNumber: 305,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/canvas/Canvas.tsx",
                        lineNumber: 287,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/canvas/Canvas.tsx",
                    lineNumber: 283,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Canvas.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ToolsBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                canvasState: canvasState,
                setCanvasState: (newState)=>setCanvasState(newState),
                zoomIn: ()=>{
                    setCamera((camera)=>({
                            ...camera,
                            zoom: camera.zoom + 0.1
                        }));
                },
                zoomOut: ()=>{
                    setCamera((camera)=>({
                            ...camera,
                            zoom: camera.zoom - 0.1
                        }));
                },
                canZoomIn: camera.zoom < 2,
                canZoomOut: camera.zoom > 0.5
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Canvas.tsx",
                lineNumber: 316,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/Canvas.tsx",
        lineNumber: 281,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/liveblocks/Room.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Room": (()=>Room)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/core/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$OYQPVBNI$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-OYQPVBNI.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$RoomProvider__as__RoomProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-ssr] (ecmascript) <export _RoomProvider as RoomProvider>");
'use client';
;
;
;
function Room({ children, roomId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveblocksProvider"], {
        authEndpoint: "/api/liveblocks-auth",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$5f$RoomProvider__as__RoomProvider$3e$__["RoomProvider"], {
            id: roomId,
            initialPresence: {
                cursor: null,
                selection: [],
                penColor: null,
                pencilDraft: null
            },
            initialStorage: {
                roomColor: {
                    r: 30,
                    g: 30,
                    b: 30
                },
                layers: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveMap"](),
                layerIds: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveList"]([])
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$OYQPVBNI$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClientSideSuspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-screen flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            className: "h-[50px] w-[50px] animate-bounce",
                            src: "loading...",
                            alt: "/loading-com.svg"
                        }, void 0, false, {
                            fileName: "[project]/src/components/liveblocks/Room.tsx",
                            lineNumber: 30,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-sm font-normal",
                            children: "Loading"
                        }, void 0, false, {
                            fileName: "[project]/src/components/liveblocks/Room.tsx",
                            lineNumber: 31,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/liveblocks/Room.tsx",
                    lineNumber: 28,
                    columnNumber: 13
                }, void 0),
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/liveblocks/Room.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/liveblocks/Room.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/liveblocks/Room.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__e412539e._.js.map