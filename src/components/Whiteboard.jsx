import { Tldraw, toRichText, DefaultToolbar, TldrawUiMenuGroup,
    SelectToolbarItem,
    DrawToolbarItem,
    EraserToolbarItem,
    ArrowToolbarItem,
    TextToolbarItem,
    react} from 'tldraw'
import 'tldraw/tldraw.css'
import { useEffect, useRef, useMemo, useState } from 'react'


const Whiteboard = ({ positions, showOpponents }) => {
    const containerRef = useRef(null);
    const [canvasWidth, setCanvasWidth] = useState(525);
    const [canvasHeight, setCanvasHeight] = useState(700);

    const fontSize = canvasWidth < 600 ? 's' : 'xl';

    const customToolbar = useMemo(() => {
        return () => (
            <DefaultToolbar orientation="vertical">
                <TldrawUiMenuGroup id="my-custom-tools">
                    <SelectToolbarItem />
                    <DrawToolbarItem />
                    <EraserToolbarItem />
                    <ArrowToolbarItem />
                    <TextToolbarItem />
                </TldrawUiMenuGroup>
            </DefaultToolbar>
        )
    }, [])

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                const height = containerRef.current.offsetHeight;
                setCanvasWidth(width);
                setCanvasHeight(height);
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Filter positions based on showOpponents
    const filteredPositions = showOpponents 
        ? positions 
        : positions.filter(p => p.color !== 'red');

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            <Tldraw 
                licenseKey={'tldraw-2030-11-17/WyI3aU1QcUwxQiIsWyIqLmFhZTMyMmQ0LnZvbGxleWJhbGwtcm90YXRpb25zLXByb2plY3QucGFnZXMuZGV2Il0sOSwiMjAzMC0xMS0xNyJd.zo1FzbSWVHu/36V+sa942shwahRKIIbuyx26Yq8js+Wn10jRBnExNLBovBXZ3dPceoOdFHUxf5LHxQ7j5j9+gA'}
                key={`${canvasWidth}-${canvasHeight}-${showOpponents}`}
                forceMobile
                components={{
                    Toolbar: customToolbar,
                    ActionsMenu: null,
                    QuickActions: null
                }}
                onMount={(Editor) => {
                    const SCALE_MULTIPLIER = 3;

                    const internalWidth = canvasWidth * SCALE_MULTIPLIER;
                    const internalHeight = canvasHeight * SCALE_MULTIPLIER;
                    const courtX = internalWidth * 0.143;      
                    const courtY = internalHeight * 0.05;      
                    const courtWidth = internalWidth * 0.714;  
                    const courtHeight = internalHeight * 0.9;
                    
                    Editor.createShapes([
                        // court
                        {type: 'geo', x: courtX, y: courtY, isLocked: true,props: {
                            geo: 'rectangle',
                            w: courtWidth,
                            h: courtHeight,
                            dash: 'draw',
                            color: 'blue',
                        }},

                        // mid line
                        {type: 'arrow', y: internalHeight * 0.5, isLocked: true, props: {
                            start: { x: internalWidth * 0.143 - 100, y: 0 },
                            end: { x: internalWidth * 0.857 + 100, y: 0 },
                            arrowheadStart: 'none',
                            arrowheadEnd: 'none',
                        }},

                        // Opponent attack line
                        {type: 'arrow', y: internalHeight * 0.35, isLocked: true, props: {
                            start: { x: courtX, y: 0 },
                            end: { x: courtX + courtWidth, y: 0 },
                            arrowheadStart: 'none',
                            arrowheadEnd: 'none',
                        }},

                        // our attack line
                        {type: 'arrow', y: internalHeight * 0.65, isLocked: true, props: {
                            start: { x: courtX, y: 0 },
                            end: { x: courtX + courtWidth, y: 0 },
                            arrowheadStart: 'none',
                            arrowheadEnd: 'none',
                        }},
                    ])

                    filteredPositions.forEach(({pos, x, y, color}) => {
                        const scaledX = (x / 700) * internalWidth;
                        const scaledY = (y / 700) * internalHeight;
                        const circleSize = internalWidth * 0.1;
                        
                        Editor.createShape({
                            type: 'geo', 
                            x: scaledX, 
                            y: scaledY,
                            props: {
                                geo: 'ellipse',
                                fill: 'solid',
                                w: circleSize,
                                h: circleSize,
                                color,
                                size: fontSize,
                                font: 'sans',
                                richText: toRichText(pos),
                            },
                        })
                    })

                    const zoomX = canvasWidth / internalWidth;
                    const zoomY = canvasHeight / internalHeight;
                    const baseZoom = Math.min(zoomX, zoomY);
                    const zoom = baseZoom * 0.9; // Adjust this multiplier to zoom in/out (0.9 = 90% = more zoomed out)
                    
                    // Calculate center offset to keep court centered when zoomed
                    const offsetX = -(internalWidth - canvasWidth / zoom) / 2;
                    const offsetY = -(internalHeight - canvasHeight / zoom) / 2;
                    
                    Editor.setCamera({ x: offsetX, y: offsetY, z: zoom }, { animation: { duration: 0 } })
                    Editor.setCameraOptions({isLocked: true})
                }}
            />
        </div>
    )
}

export default Whiteboard
