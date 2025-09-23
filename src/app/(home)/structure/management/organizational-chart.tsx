"use client"
import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"

export interface NodeData {
  id: string
  title: string // ฝ่าย/ตำแหน่ง
  name: string
  parentId?: string
}

interface Props {
  data: NodeData[]
  height?: string
}

/* ==== Breakpoints (md=768, lg=1024) ==== */
function useBreakpoint() {
  const [bp, setBp] = useState<"sm" | "md" | "lg">("sm")
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)")
    const lg = window.matchMedia("(min-width: 1024px)")
    const calc = () => setBp(lg.matches ? "lg" : md.matches ? "md" : "sm")
    calc()
    md.addEventListener("change", calc)
    lg.addEventListener("change", calc)
    return () => {
      md.removeEventListener("change", calc)
      lg.removeEventListener("change", calc)
    }
  }, [])
  return bp
}

/* ==== Tree helpers ==== */
type TreeNode = {
  data: NodeData
  children: TreeNode[]
  x: number // center x
  y: number // top y
  subtreeWidth: number
}

function buildTree(data: NodeData[]): TreeNode | null {
  if (!data.length) return null
  const rootData = data.find((d) => !d.parentId)
  if (!rootData) return null

  const childrenMap = new Map<string, NodeData[]>()
  data.forEach((d) => {
    if (!d.parentId) return
    const arr = childrenMap.get(d.parentId) || []
    arr.push(d)
    childrenMap.set(d.parentId, arr)
  })

  function build(node: NodeData): TreeNode {
    const kids = (childrenMap.get(node.id) || []).map(build)
    return { data: node, children: kids, x: 0, y: 0, subtreeWidth: 0 }
  }
  return build(rootData)
}

function measureAndLayout(
  node: TreeNode,
  cfg: { nodeW: number; nodeH: number; siblingGap: number; levelGap: number },
  depth = 0,
  leftEdge = 0,
): number {
  const { nodeW, siblingGap, levelGap, nodeH } = cfg
  node.y = depth * (nodeH + levelGap)

  if (node.children.length === 0) {
    node.subtreeWidth = nodeW
    node.x = leftEdge + nodeW / 2
    return node.subtreeWidth
  }

  let xCursor = leftEdge
  node.children.forEach((child) => {
    const w = measureAndLayout(child, cfg, depth + 1, xCursor)
    xCursor += w + siblingGap
  })

  const totalChildrenWidth =
    node.children.reduce((acc, c) => acc + c.subtreeWidth, 0) + siblingGap * (node.children.length - 1)

  node.subtreeWidth = Math.max(nodeW, totalChildrenWidth)
  const childrenCenter = leftEdge + totalChildrenWidth / 2
  const parentLeft = childrenCenter - nodeW / 2
  node.x = parentLeft + nodeW / 2

  return node.subtreeWidth
}

function flatten(node: TreeNode): TreeNode[] {
  const out: TreeNode[] = []
  ;(function dfs(n: TreeNode) {
    out.push(n)
    n.children.forEach(dfs)
  })(node)
  return out
}

/* ====== วัดความกว้างข้อความ + ตัดบรรทัดแบบรองรับภาษาไทย (ตัดเป็นตัวอักษร) ====== */
function makeMeasurer(font: string) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!
  ctx.font = font
  return (s: string) => ctx.measureText(s).width
}

/** แบ่งข้อความเป็นกราฟีม (รองรับไทย/อีโมจิ) */
function splitGraphemes(s: string): string[] {
  try {
    // @ts-ignore - Intl.Segmenter อาจไม่มีในบางบราวเซอร์เก่า
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" })
    return Array.from(seg.segment(s), (x: any) => x.segment)
  } catch {
    return Array.from(s) // fallback
  }
}

/** ตัดบรรทัดแบบ byChar เพื่อให้ภาษาไทยสวย และเติม … เฉพาะเมื่อเกิน maxLines */
function wrapThaiFriendly(text: string, measure: (s: string) => number, maxW: number, maxLines: number): string[] {
  if (!text) return [""]
  const chars = splitGraphemes(text)
  const lines: string[] = []
  let cur = ""

  for (const ch of chars) {
    const test = cur + ch
    if (measure(test) <= maxW) {
      cur = test
    } else {
      lines.push(cur || ch)
      cur = ch
      if (lines.length === maxLines - 1) {
        // บรรทัดสุดท้าย → เติม …
        let tail = cur
        while (measure(tail + "…") > maxW && tail.length > 0) {
          tail = tail.slice(0, -1)
        }
        lines.push((tail || "").trimEnd() + "…")
        return lines
      }
    }
  }
  if (cur) lines.push(cur)

  if (lines.length > maxLines) {
    const last = lines[maxLines - 1]
    let cut = last
    while (measure(cut + "…") > maxW && cut.length > 0) cut = cut.slice(0, -1)
    return [...lines.slice(0, maxLines - 1), cut.trimEnd() + "…"]
  }
  return lines
}

/* ==== Component ==== */
const OrganizationalChartPure: React.FC<Props> = ({ data, height }) => {
  const bp = useBreakpoint()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ w: 800, h: 600 })

  // zoom / pan
  const [scale, setScale] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const userInteractedRef = useRef(false)

  const panStartRef = useRef<{ x: number; y: number } | null>(null)
  const panOriginRef = useRef<{ tx: number; ty: number }>({ tx: 0, ty: 0 })

  // สัดส่วนการ์ด/ฟอนต์/ระยะ
  const cfg = useMemo(() => {
    if (bp === "lg")
      return {
        nodeW: 320,
        nodeH: 96,
        nameSize: 18,
        titleSize: 13,
        levelGap: 84,
        siblingGap: 42,
        corner: 14,
        padX: 16,
        padY: 16,
        gapNameTitle: 8,
      }
    if (bp === "md")
      return {
        nodeW: 280,
        nodeH: 90,
        nameSize: 16,
        titleSize: 12,
        levelGap: 74,
        siblingGap: 34,
        corner: 12,
        padX: 14,
        padY: 14,
        gapNameTitle: 6,
      }
    return {
      nodeW: 248,
      nodeH: 86,
      nameSize: 15,
      titleSize: 11,
      levelGap: 64,
      siblingGap: 30,
      corner: 12,
      padX: 12,
      padY: 12,
      gapNameTitle: 6,
    }
  }, [bp])

  // layout tree
  const layout = useMemo(() => {
    const root = buildTree(data)
    if (!root) return null

    const width = measureAndLayout(root, {
      nodeW: cfg.nodeW,
      nodeH: cfg.nodeH,
      levelGap: cfg.levelGap,
      siblingGap: cfg.siblingGap,
    })

    const nodes = flatten(root)
    const maxY = Math.max(...nodes.map((n) => n.y)) + cfg.nodeH
    return { root, nodes, bbox: { width, height: maxY } }
  }, [JSON.stringify(data), cfg])

  // resize
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // auto-fit (ถ้ายังไม่ zoom/pan เอง)
  useEffect(() => {
    if (!layout || !containerRef.current || userInteractedRef.current) return
    const pad = 56
    const sx = (size.w - pad) / layout.bbox.width
    const sy = (size.h - pad) / layout.bbox.height
    const s = Math.max(0.2, Math.min(sx, sy))
    setScale(s)
    const cw = layout.bbox.width * s
    const ch = layout.bbox.height * s
    setTx((size.w - cw) / 2)
    setTy((size.h - ch) / 2)
  }, [layout, size])

  // zoom controls
  const zoomIn = () => {
    userInteractedRef.current = true
    setScale((s) => Math.min(3, s * 1.15))
  }
  const zoomOut = () => {
    userInteractedRef.current = true
    setScale((s) => Math.max(0.2, s / 1.15))
  }
  const resetFit = () => {
    userInteractedRef.current = false
    setSize((s) => ({ ...s }))
  }

  // pan handlers
  const onPointerDown = (x: number, y: number) => {
    userInteractedRef.current = true
    panStartRef.current = { x, y }
    panOriginRef.current = { tx, ty }
  }
  const onPointerMove = (x: number, y: number) => {
    if (!panStartRef.current) return
    setTx(panOriginRef.current.tx + (x - panStartRef.current.x))
    setTy(panOriginRef.current.ty + (y - panStartRef.current.y))
  }
  const endPan = () => {
    panStartRef.current = null
  }

  /* === Thai-friendly wrappers & line heights === */
  const nameMeasure = makeMeasurer(`700 ${cfg.nameSize}px Inter, system-ui, -apple-system, Segoe UI`)
  const titleMeasure = makeMeasurer(`${cfg.titleSize}px Inter, system-ui, -apple-system, Segoe UI`)
  const maxTextW = cfg.nodeW - cfg.padX * 2

  // ชื่อ: อนุญาต 2 บรรทัด, ถ้าเกินค่อยใช้ …
  const nameLines = (s: string) => wrapThaiFriendly(s, nameMeasure, maxTextW, 2)
  // ฝ่าย/ตำแหน่ง: 2 บรรทัด, **จัดกึ่งกลาง**
  const titleLinesCentered = (s: string) => wrapThaiFriendly(s, titleMeasure, maxTextW, 2)

  const nameLineH = Math.round(cfg.nameSize * 1.2)
  const titleLineH = Math.round(cfg.titleSize * 1.35)

  const linkPath = (p: TreeNode, c: TreeNode) => {
    const x1 = p.x,
      y1 = p.y + cfg.nodeH
    const x2 = c.x,
      y2 = c.y
    const midY = (y1 + y2) / 2
    return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`
  }

  return (
    <div className="relative w-full">
      {/* Controls */}
      <div className="absolute right-3 top-3 z-10 flex gap-2">
        <button
          onClick={zoomOut}
          className="rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md font-medium"
        >
          −
        </button>
        <button
          onClick={zoomIn}
          className="rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md font-medium"
        >
          ＋
        </button>
        <button
          onClick={resetFit}
          className="rounded-lg px-3 py-2 bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md font-medium text-sm"
        >
          Reset
        </button>
      </div>

      <div
        ref={containerRef}
        className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30
                   h-[65vh] md:h-[76vh] lg:h-[82vh] cursor-grab"
        style={height ? { height } : undefined}
        onMouseDown={(e) => onPointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => onPointerMove(e.clientX, e.clientY)}
        onMouseUp={endPan}
        onMouseLeave={endPan}
        onTouchStart={(e) => {
          const t = e.touches[0]
          onPointerDown(t.clientX, t.clientY)
        }}
        onTouchMove={(e) => {
          const t = e.touches[0]
          onPointerMove(t.clientX, t.clientY)
        }}
        onTouchEnd={endPan}
        onTouchCancel={endPan}
      >
        {!layout ? null : (
          <svg width={size.w} height={size.h} style={{ touchAction: "none" }}>
            <defs>
              <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1e293b" floodOpacity="0.08" />
                <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#1e293b" floodOpacity="0.04" />
              </filter>
              <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f8fafc" />
              </linearGradient>
              <linearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            <g transform={`translate(${tx},${ty}) scale(${scale})`}>
              <g>
                {layout.nodes.flatMap((n) =>
                  n.children.map((c, i) => (
                    <path
                      key={`${n.data.id}-${c.data.id}-${i}`}
                      d={linkPath(n, c)}
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth={2}
                    />
                  )),
                )}
              </g>

              {/* Nodes */}
              <g>
                {layout.nodes.map((n) => {
                  const x = n.x - cfg.nodeW / 2
                  const y = n.y

                  const nameL = nameLines(n.data.name)
                  const titleL = titleLinesCentered(n.data.title)

                  // ตำแหน่งแกน Y
                  const nameStartY = cfg.padY + cfg.nameSize // baseline แรกของชื่อ
                  const titleStartY = cfg.padY + nameL.length * nameLineH + cfg.gapNameTitle + cfg.titleSize

                  return (
                    <g key={n.data.id} transform={`translate(${x},${y})`} filter="url(#cardShadow)">
                      <rect
                        rx={cfg.corner}
                        ry={cfg.corner}
                        width={cfg.nodeW}
                        height={cfg.nodeH}
                        fill="url(#cardGradient)"
                        stroke="#e2e8f0"
                        strokeWidth={1}
                      />

                      <rect
                        x={0}
                        y={0}
                        width={cfg.nodeW}
                        height={6}
                        rx={cfg.corner}
                        ry={cfg.corner}
                        fill="url(#headerGradient)"
                      />

                      <rect
                        x={1}
                        y={1}
                        rx={cfg.corner - 1}
                        ry={cfg.corner - 1}
                        width={cfg.nodeW - 2}
                        height={cfg.nodeH - 2}
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth={0.5}
                      />

                      {/* NAME (center align, 2 บรรทัด) */}
                      <text
                        x={cfg.nodeW / 2}
                        y={nameStartY}
                        fill="#1e293b"
                        fontSize={cfg.nameSize}
                        fontWeight={700}
                        textAnchor="middle"
                      >
                        {nameL.map((ln, i) => (
                          <tspan key={i} x={cfg.nodeW / 2} dy={i === 0 ? 0 : nameLineH}>
                            {ln}
                          </tspan>
                        ))}
                      </text>

                      {/* TITLE (center align, 2 บรรทัด) */}
                      <text
                        x={cfg.nodeW / 2}
                        y={titleStartY}
                        fill="#64748b"
                        fontSize={cfg.titleSize}
                        textAnchor="middle"
                      >
                        {titleL.map((ln, i) => (
                          <tspan key={i} x={cfg.nodeW / 2} dy={i === 0 ? 0 : titleLineH}>
                            {ln}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  )
                })}
              </g>
            </g>
          </svg>
        )}
      </div>
    </div>
  )
}

export default OrganizationalChartPure
