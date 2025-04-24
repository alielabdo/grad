(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_1c8ec30e._.js", {

"[project]/src/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "colorToCss": (()=>colorToCss),
    "pointerEventToCanvasPoint": (()=>pointerEventToCanvasPoint)
});
function colorToCss(color) {
    return ` #${color.r.toString(16).padStart(2, "0")}
      #${color.g.toString(16).padStart(2, "0")}
      #${color.b.toString(16).padStart(2, "0")}
    `;
}
const pointerEventToCanvasPoint = (e, camera)=>{
    return {
        x: Math.round(e.clientX) - camera.x,
        y: Math.round(e.clientY) - camera.y
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/types.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CanvasMode": (()=>CanvasMode),
    "LayerType": (()=>LayerType)
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
    return CanvasMode;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/canvas/Rectangle.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Rectangle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-client] (ecmascript)");
;
;
function Rectangle({ id, layer }) {
    const { x, y, width, height, fill, stroke, opacity, cornerRadius } = layer;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            style: {
                transform: `translate(${x}px, ${y}px)`
            },
            width: width,
            height: height,
            fill: fill ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorToCss"])(fill) : "#CCC",
            strokeWidth: 1,
            stroke: stroke ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorToCss"])(stroke) : "#CCC",
            opacity: `${opacity ?? 100}%`,
            rx: cornerRadius ?? 0,
            ry: cornerRadius ?? 0
        }, void 0, false, {
            fileName: "[project]/src/components/canvas/Rectangle.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Rectangle.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = Rectangle;
var _c;
__turbopack_context__.k.register(_c, "Rectangle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/canvas/Ellipse.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Ellipse)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-client] (ecmascript)");
;
;
function Ellipse({ id, layer }) {
    const { x, y, width, height, fill, stroke, opacity } = layer;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
            style: {
                transform: `translate(${x}px, ${y}px)`
            },
            fill: fill ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorToCss"])(fill) : "#CCC",
            stroke: stroke ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorToCss"])(stroke) : "#CCC",
            cx: width / 2,
            cy: height / 2,
            rx: width / 2,
            ry: height / 2,
            strokeWidth: "1",
            opacity: `${opacity ?? 100}%`
        }, void 0, false, {
            fileName: "[project]/src/components/canvas/Ellipse.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/canvas/Ellipse.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = Ellipse;
var _c;
__turbopack_context__.k.register(_c, "Ellipse");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/canvas/LayerComponent.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-client] (ecmascript) <export _useStorage as useStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Rectangle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Rectangle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Ellipse$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/Ellipse.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const LayerComponent = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s(({ id })=>{
    _s();
    const layer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"])({
        "LayerComponent.useStorage[layer]": (root)=>root.layers.get(id)
    }["LayerComponent.useStorage[layer]"]);
    if (!layer) {
        return null;
    }
    switch(layer.type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Rectangle:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Rectangle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: id,
                layer: layer
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/LayerComponent.tsx",
                lineNumber: 14,
                columnNumber: 14
            }, this);
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Ellipse:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$Ellipse$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: id,
                layer: layer
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/LayerComponent.tsx",
                lineNumber: 16,
                columnNumber: 14
            }, this);
        default:
            return null;
    }
}, "04s2BEa/zzKbKNq8k8oCQMiwAAQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"]
    ];
})), "04s2BEa/zzKbKNq8k8oCQMiwAAQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"]
    ];
});
_c1 = LayerComponent;
LayerComponent.displayName = "LayerComponent";
const __TURBOPACK__default__export__ = LayerComponent;
var _c, _c1;
__turbopack_context__.k.register(_c, "LayerComponent$memo");
__turbopack_context__.k.register(_c1, "LayerComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/toolsbar/IconButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>IconButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function IconButton({ onClick, children, isActive, disabled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_c = IconButton;
var _c;
__turbopack_context__.k.register(_c, "IconButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/toolsbar/menu.svg (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/menu.9c82a3a3.svg");}}),
"[project]/src/components/toolsbar/menu.svg.mjs { IMAGE => \"[project]/src/components/toolsbar/menu.svg (static in ecmascript)\" } [app-client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/menu.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 800,
    height: 800,
    blurDataURL: null,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/toolsbar/SelectionButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SelectionButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/IconButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/bi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ri/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/components/toolsbar/menu.svg.mjs { IMAGE => "[project]/src/components/toolsbar/menu.svg (static in ecmascript)" } [app-client] (structured image object, ecmascript)');
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function SelectionButton({ isActive, canvasMode, onClick }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleClick = (canvasMode)=>{
        onClick(canvasMode);
        setOpen(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelectionButton.useEffect": ()=>{
            const handleClickOutside = {
                "SelectionButton.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        setOpen(false);
                    }
                }
            }["SelectionButton.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "SelectionButton.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["SelectionButton.useEffect"];
        }
    }["SelectionButton.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isActive: isActive,
                onClick: ()=>onClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None),
                children: [
                    canvasMode !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None && canvasMode !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BiPointer"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 42,
                        columnNumber: 84
                    }, this),
                    canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BiPointer"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 43,
                        columnNumber: 45
                    }, this),
                    canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RiHand"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 44,
                        columnNumber: 49
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                className: "ml-1",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"]
            }, void 0, false, {
                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-20 mt-1 min-w-[150px] rounded-xl bg-[#1e1e1e] p-2 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None ? "bg-blue-500" : ""}`,
                        onClick: ()=>handleClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-5 text-xs",
                                children: canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None && "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BiPointer"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: "Move"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging ? "bg-blue-500" : ""}`,
                        onClick: ()=>handleClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-5 text-xs",
                                children: canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging && "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RiHand"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: "Hand Tool"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/toolsbar/SelectionButton.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(SelectionButton, "iuQeQ4sVg+lFcobs6EbZQm9Prm4=");
_c = SelectionButton;
var _c;
__turbopack_context__.k.register(_c, "SelectionButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/toolsbar/ShapesSelectionButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ShapesSelectionButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/IconButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/io5/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/components/toolsbar/menu.svg.mjs { IMAGE => "[project]/src/components/toolsbar/menu.svg (static in ecmascript)" } [app-client] (structured image object, ecmascript)');
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function ShapesSelectionButton({ isActive, canvasState, onClick }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleClick = (layerType)=>{
        onClick(layerType);
        setOpen(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShapesSelectionButton.useEffect": ()=>{
            const handleClickOutside = {
                "ShapesSelectionButton.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        setOpen(false);
                    }
                }
            }["ShapesSelectionButton.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "ShapesSelectionButton.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["ShapesSelectionButton.useEffect"];
        }
    }["ShapesSelectionButton.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$IconButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isActive: isActive,
                onClick: ()=>onClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Rectangle),
                children: [
                    canvasState.mode !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoSquareOutline"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 43,
                        columnNumber: 53
                    }, this),
                    canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Rectangle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoSquareOutline"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 44,
                        columnNumber: 102
                    }, this),
                    canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Ellipse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoEllipseOutline"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 45,
                        columnNumber: 100
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                lineNumber: 39,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                className: "ml-1",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$components$2f$toolsbar$2f$menu$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"]
            }, void 0, false, {
                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                lineNumber: 47,
                columnNumber: 5
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-20 mt-1 min-w-[150px] rounded-xl bg-[#1e1e1e] p-2 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Rectangle ? "bg-blue-500" : ""}`,
                        onClick: ()=>handleClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Rectangle),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-5 text-xs",
                                children: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Rectangle && "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoSquareOutline"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: "Rectangle"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Ellipse ? "bg-blue-500" : ""}`,
                        onClick: ()=>handleClick(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Ellipse),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-5 text-xs",
                                children: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && canvasState.layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Ellipse && "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoEllipseOutline"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: "Ellipse"
                            }, void 0, false, {
                                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/toolsbar/ShapesSelectionButton.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(ShapesSelectionButton, "iuQeQ4sVg+lFcobs6EbZQm9Prm4=");
_c = ShapesSelectionButton;
var _c;
__turbopack_context__.k.register(_c, "ShapesSelectionButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/toolsbar/ToolsBar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ToolsBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$SelectionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/SelectionButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ShapesSelectionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/ShapesSelectionButton.tsx [app-client] (ecmascript)");
;
;
;
;
function ToolsBar({ canvasState, setCanvasState }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-lg bg-white p-1 shadow-[0_0_3px_rgba(0,0,0,0,18)]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$SelectionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    isActive: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None || canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging,
                    canvasMode: canvasState.mode,
                    onClick: (canvasMode)=>setCanvasState(canvasMode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Dragging ? {
                            mode: canvasMode,
                            origin: null
                        } : {
                            mode: canvasMode
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ShapesSelectionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    isActive: canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting && [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Rectangle,
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Ellipse
                    ].includes(canvasState.layerType),
                    canvasState: canvasState,
                    onClick: (layerType)=>setCanvasState({
                            mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting,
                            layerType
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/toolsbar/ToolsBar.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = ToolsBar;
var _c;
__turbopack_context__.k.register(_c, "ToolsBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/canvas/Canvas.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Canvas)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-client] (ecmascript) <export _useMutation as useMutation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-client] (ecmascript) <export _useStorage as useStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$LayerComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/canvas/LayerComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.browser.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ToolsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toolsbar/ToolsBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
    _s();
    const roomColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"])({
        "Canvas.useStorage[roomColor]": (root)=>root.roomColor
    }["Canvas.useStorage[roomColor]"]);
    const layerIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"])({
        "Canvas.useStorage[layerIds]": (root)=>root.layerIds
    }["Canvas.useStorage[layerIds]"]);
    const [camera, setCamera] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        zoom: 1
    });
    const [canvasState, setCanvasState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None
    });
    const insertLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])({
        "Canvas.useMutation[insertLayer]": ({ storage, setMyPresence }, layerType, position)=>{
            const liveLayers = storage.get("layers");
            if (liveLayers.size >= MAX_LAYERS) {
                return;
            }
            const liveLayerIds = storage.get("layerIds");
            const layerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])();
            let layer = null;
            if (layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Rectangle) {
                layer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveObject"]({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Rectangle,
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
            } else if (layerType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Ellipse) {
                layer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveObject"]({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayerType"].Ellipse,
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
        }
    }["Canvas.useMutation[insertLayer]"], []);
    const onPointerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"])({
        "Canvas.useMutation[onPointerUp]": ({}, e)=>{
            const point = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pointerEventToCanvasPoint"])(e, camera);
            if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None) {
                setCanvasState({
                    mode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].None
                });
            } else if (canvasState.mode === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasMode"].Inserting) {
                insertLayer(canvasState.layerType, point);
            }
        }
    }["Canvas.useMutation[onPointerUp]"], [
        canvasState,
        setCanvasState,
        insertLayer
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "fixed left-0 right-0 h-screen overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        backgroundColor: roomColor ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorToCss"])(roomColor) : "#1E1E1E"
                    },
                    className: "h-full w-full touch-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        onPointerUp: onPointerUp,
                        className: "w-full h-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: layerIds?.map((layerId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$canvas$2f$LayerComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    id: layerId
                                }, layerId, false, {
                                    fileName: "[project]/src/components/canvas/Canvas.tsx",
                                    lineNumber: 92,
                                    columnNumber: 44
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/canvas/Canvas.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/canvas/Canvas.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/canvas/Canvas.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Canvas.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toolsbar$2f$ToolsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                canvasState: canvasState,
                setCanvasState: (newState)=>setCanvasState(newState)
            }, void 0, false, {
                fileName: "[project]/src/components/canvas/Canvas.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/canvas/Canvas.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(Canvas, "bfG0iJ3zlGInebG0v2yUAOw7nQQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useStorage__as__useStorage$3e$__["useStorage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$useMutation__as__useMutation$3e$__["useMutation"]
    ];
});
_c = Canvas;
var _c;
__turbopack_context__.k.register(_c, "Canvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/liveblocks/Room.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Room": (()=>Room)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$OYQPVBNI$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-OYQPVBNI.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$RoomProvider__as__RoomProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@liveblocks/react/dist/chunk-URVBSXYW.js [app-client] (ecmascript) <export _RoomProvider as RoomProvider>");
'use client';
;
;
;
function Room({ children, roomId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveblocksProvider"], {
        authEndpoint: "/api/liveblocks-auth",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$URVBSXYW$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$RoomProvider__as__RoomProvider$3e$__["RoomProvider"], {
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
                layers: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveMap"](),
                layerIds: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveList"]([])
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$liveblocks$2f$react$2f$dist$2f$chunk$2d$OYQPVBNI$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClientSideSuspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-screen flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            className: "h-[50px] w-[50px] animate-bounce",
                            src: "loading...",
                            alt: "/loading-com.svg"
                        }, void 0, false, {
                            fileName: "[project]/src/components/liveblocks/Room.tsx",
                            lineNumber: 30,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
_c = Room;
var _c;
__turbopack_context__.k.register(_c, "Room");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_1c8ec30e._.js.map