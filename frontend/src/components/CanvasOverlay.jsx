import React, { useState } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';

const CanvasOverlay = ({ imageWidth, imageHeight, blocks, onHover }) => {
    return (
        <Stage width={imageWidth} height={imageHeight}>
            <Layer>
                {blocks.map((block, i) => {
                    const [x1, y1, x2, y2] = block.bbox;
                    const width = x2 - x1;
                    const height = y2 - y1;

                    return (
                        <Group
                            key={i}
                            onMouseEnter={() => onHover(block)}
                            onMouseLeave={() => onHover(null)}
                        >
                            <Rect
                                x={x1}
                                y={y1}
                                width={width}
                                height={height}
                                stroke={block.type === 'table' ? '#22D3EE' : '#10B981'}
                                strokeWidth={2}
                                fill={block.type === 'table' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(16, 185, 129, 0.1)'}
                                dash={block.type === 'figure' ? [5, 5] : []}
                            />
                            <Text
                                x={x1}
                                y={y1 - 15}
                                text={block.type}
                                fill="white"
                                fontSize={12}
                                fontStyle="bold"
                            />
                        </Group>
                    );
                })}
            </Layer>
        </Stage>
    );
};

export default CanvasOverlay;
