// משימת הצלת המשולשים - קומפוננטת הצגת משולש

import React from 'react';
import type { Triangle } from '@/types/game';
import { motion } from 'framer-motion';

interface TriangleVisualizerProps {
  triangle: Triangle;
  highlightAngles?: boolean;
  highlightSides?: boolean;
  showLabels?: boolean;
}

/**
 * קומפוננטה להצגת משולש עם סימונים
 */
export const TriangleVisualizer: React.FC<TriangleVisualizerProps> = ({
  triangle,
  highlightAngles = true,
  highlightSides = true,
  showLabels = true,
}) => {
  const size = 300;
  const padding = 40;
  
  // תרגם קודקודים לקואורדינטות SVG
  const vertices = triangle.vertices.map(v => ({
    x: v.x,
    y: v.y,
  }));
  
  // חשב מרכז למטרות סיבוב
  const centerX = (vertices[0].x + vertices[1].x + vertices[2].x) / 3;
  const centerY = (vertices[0].y + vertices[1].y + vertices[2].y) / 3;
  
  // צור נתיב משולש
  const pathData = `M ${vertices[0].x} ${vertices[0].y} L ${vertices[1].x} ${vertices[1].y} L ${vertices[2].x} ${vertices[2].y} Z`;
  
  // חשב קשתות לזוויות
  const getAngleArc = (vertexIndex: number) => {
    const vertex = vertices[vertexIndex];
    const prev = vertices[(vertexIndex - 1 + 3) % 3];
    const next = vertices[(vertexIndex + 1) % 3];
    
    // וקטורים
    const v1 = { x: prev.x - vertex.x, y: prev.y - vertex.y };
    const v2 = { x: next.x - vertex.x, y: next.y - vertex.y };
    
    // נרמל
    const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
    
    const u1 = { x: v1.x / len1, y: v1.y / len1 };
    const u2 = { x: v2.x / len2, y: v2.y / len2 };
    
    // קשת
    const radius = 20;
    const startX = vertex.x + u1.x * radius;
    const startY = vertex.y + u1.y * radius;
    const endX = vertex.x + u2.x * radius;
    const endY = vertex.y + u2.y * radius;
    
    return {
      startX,
      startY,
      endX,
      endY,
      radius,
    };
  };
  
  // חשב אמצע צלע
  const getSideMidpoint = (v1Index: number, v2Index: number) => {
    const v1 = vertices[v1Index];
    const v2 = vertices[v2Index];
    return {
      x: (v1.x + v2.x) / 2,
      y: (v1.y + v2.y) / 2,
    };
  };
  
  // חשב אורך צלע
  const getSideLength = (v1Index: number, v2Index: number) => {
    const v1 = vertices[v1Index];
    const v2 = vertices[v2Index];
    const dx = v2.x - v1.x;
    const dy = v2.y - v1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="border-2 border-blue-200 rounded-lg bg-white shadow-lg"
      >
        <defs>
          <style>{`
            .triangle-fill {
              fill: ${triangle.color};
              opacity: 0.1;
              stroke: ${triangle.color};
              stroke-width: 2;
            }
            .angle-arc {
              fill: none;
              stroke: #8B5CF6;
              stroke-width: 2;
            }
            .side-highlight {
              fill: none;
              stroke: #06B6D4;
              stroke-width: 3;
              stroke-linecap: round;
            }
            .vertex {
              fill: ${triangle.color};
              stroke: ${triangle.highlightColor};
              stroke-width: 2;
            }
            .label-angle {
              font-family: 'Poppins', sans-serif;
              font-size: 12px;
              font-weight: 600;
              fill: #8B5CF6;
              text-anchor: middle;
            }
            .label-side {
              font-family: 'Poppins', sans-serif;
              font-size: 12px;
              font-weight: 600;
              fill: #06B6D4;
              text-anchor: middle;
            }
          `}</style>
        </defs>
        
        {/* משולש בסיס */}
        <g transform={`rotate(${triangle.rotation} ${centerX} ${centerY})`}>
          <path d={pathData} className="triangle-fill" />
          
          {/* צלעות מודגשות */}
          {highlightSides && (
            <>
              <line
                x1={vertices[0].x}
                y1={vertices[0].y}
                x2={vertices[1].x}
                y2={vertices[1].y}
                className="side-highlight"
              />
              <line
                x1={vertices[1].x}
                y1={vertices[1].y}
                x2={vertices[2].x}
                y2={vertices[2].y}
                className="side-highlight"
              />
              <line
                x1={vertices[2].x}
                y1={vertices[2].y}
                x2={vertices[0].x}
                y2={vertices[0].y}
                className="side-highlight"
              />
            </>
          )}
          
          {/* קשתות לזוויות */}
          {highlightAngles && (
            <>
              {[0, 1, 2].map(i => {
                const arc = getAngleArc(i);
                return (
                  <path
                    key={`angle-${i}`}
                    d={`M ${arc.startX} ${arc.startY} A ${arc.radius} ${arc.radius} 0 0 1 ${arc.endX} ${arc.endY}`}
                    className="angle-arc"
                  />
                );
              })}
            </>
          )}
          
          {/* קודקודים */}
          {vertices.map((v, i) => (
            <circle
              key={`vertex-${i}`}
              cx={v.x}
              cy={v.y}
              r={5}
              className="vertex"
            />
          ))}
          
          {/* תוויות זוויות */}
          {showLabels && highlightAngles && (
            <>
              {[0, 1, 2].map(i => {
                const vertex = vertices[i];
                const angle = triangle.angles[i];
                // הזז את התווית קצת החוצה מהמשולש
                const offsetX = (vertex.x - centerX) * 0.15;
                const offsetY = (vertex.y - centerY) * 0.15;
                return (
                  <text
                    key={`angle-label-${i}`}
                    x={vertex.x + offsetX}
                    y={vertex.y + offsetY}
                    className="label-angle"
                  >
                    {Math.round(angle)}°
                  </text>
                );
              })}
            </>
          )}
          
          {/* תוויות צלעות */}
          {showLabels && highlightSides && (
            <>
              {[0, 1, 2].map(i => {
                const next = (i + 1) % 3;
                const midpoint = getSideMidpoint(i, next);
                const length = triangle.sides[i];
                return (
                  <text
                    key={`side-label-${i}`}
                    x={midpoint.x}
                    y={midpoint.y}
                    className="label-side"
                  >
                    {Math.round(length)}
                  </text>
                );
              })}
            </>
          )}
        </g>
      </svg>
    </motion.div>
  );
};

export default TriangleVisualizer;
