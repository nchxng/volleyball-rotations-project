import react, { useState } from 'react'  // ← Must have { useState }
import Whiteboard from './Whiteboard'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox
} from '@mui/material';

const initialPositions = {
  '1': [
    // 1
    { pos: 'S', color: 'light-blue', x: 457.5, y: 533.75},
    // 6 
    { pos: 'MB1', color: 'green', x: 315, y: 533.75},
    // 5
    { pos: 'OH2', color: 'yellow', x: 172.5, y: 533.75},
    // 4
    { pos: 'OPP', color: 'orange', x: 172.5, y: 376.5},
    // 3
    { pos: 'MB2', color: 'green', x: 315, y: 376.5},
    // 2
    { pos: 'OH1', color: 'yellow', x: 457.5, y: 376.5},
  ],
  '2': [
    // 1
    { pos: 'OH1', color: 'yellow', x: 457.5, y: 533.75},
    // 6
    { pos: 'S', color: 'light-blue', x: 315, y: 533.75},
    // 5
    { pos: 'MB1', color: 'green', x: 172.5, y: 533.75},
    // 4
    { pos: 'OH2', color: 'yellow', x: 172.5, y: 376.5},
    // 3
    {pos: 'OPP', color: 'orange', x: 315, y: 376.5},
    // 2
    { pos: 'MB2', color: 'green', x: 457.5, y: 376.5},
  ],
  '3': [
    // 1
    { pos: 'MB2', color: 'green', x: 457.5, y: 533.75},
    // 6
    { pos: 'OH1', color: 'yellow', x: 315, y: 533.75},
    // 5
    { pos: 'S', color: 'light-blue', x: 172.5, y: 533.75},
    // 4
    { pos: 'MB1', color: 'green', x: 172.5, y: 376.5},
    // 3
    {pos: 'OH2', color: 'yellow', x: 315, y: 376.5},
    // 2
    { pos: 'OPP', color: 'orange', x: 457.5, y: 376.5},
  ],
  '4': [
    // 1
    { pos: 'OPP', color: 'orange', x: 457.5, y: 533.75},
    // 6
    { pos: 'MB2', color: 'green', x: 315, y: 533.75},
    // 5
    { pos: 'OH1', color: 'yellow', x: 172.5, y: 533.75},
    // 4
    { pos: 'S', color: 'light-blue', x: 172.5, y: 376.5},
    // 3
    {pos: 'MB1', color: 'green', x: 315, y: 376.5},
    // 2
    { pos: 'OH2', color: 'yellow', x: 457.5, y: 376.5},
  ],
  '5': [
    // 1
    { pos: 'OH2', color: 'yellow', x: 457.5, y: 533.75},
    // 6
    { pos: 'OPP', color: 'orange', x: 315, y: 533.75},
    // 5
    { pos: 'MB2', color: 'green', x: 172.5, y: 533.75},
    // 4
    { pos: 'OH1', color: 'yellow', x: 172.5, y: 376.5},
    // 3
    {pos: 'S', color: 'light-blue', x: 315, y: 376.5},
    // 2
    { pos: 'MB1', color: 'green', x: 457.5, y: 376.5},
  ],
  '6': [
    // 1
    { pos: 'MB1', color: 'green', x: 457.5, y: 533.75},
    // 6
    { pos: 'OH2', color: 'yellow', x: 315, y: 533.75},
    // 5
    { pos: 'OPP', color: 'orange', x: 172.5, y: 533.75},
    // 4
    { pos: 'MB2', color: 'green', x: 172.5, y: 376.5},
    // 3
    {pos: 'OH1', color: 'yellow', x: 315, y: 376.5},
    // 2
    { pos: 'S', color: 'light-blue', x: 457.5, y: 376.5},
  ],
};

const liberoPositions = {
  '1': [
    // On court
    { pos: 'S', color: 'light-blue', x: 457.5, y: 533.75},
    { pos: 'L', color: 'violet', x: 315, y: 533.75}, // Libero replaces MB1
    { pos: 'OH2', color: 'yellow', x: 172.5, y: 533.75},
    { pos: 'OPP', color: 'orange', x: 172.5, y: 376.5},
    { pos: 'MB2', color: 'green', x: 315, y: 376.5},
    { pos: 'OH1', color: 'yellow', x: 457.5, y: 376.5},
    { pos: 'MB1', color: 'green', x: 15.625, y: 533.75},
  ],
  '2': [
    { pos: 'OH1', color: 'yellow', x: 457.5, y: 533.75},
    { pos: 'S', color: 'light-blue', x: 315, y: 533.75},
    { pos: 'L', color: 'violet', x: 172.5, y: 533.75}, // Libero replaces MB1
    { pos: 'OH2', color: 'yellow', x: 172.5, y: 376.5},
    {pos: 'OPP', color: 'orange', x: 315, y: 376.5},
    { pos: 'MB2', color: 'green', x: 457.5, y: 376.5},
    { pos: 'MB1', color: 'green', x: 15.625, y: 533.75},
  ],
  '3': [
    { pos: 'MB2', color: 'green', x: 457.5, y: 533.75},
    { pos: 'OH1', color: 'yellow', x: 315, y: 533.75},
    { pos: 'S', color: 'light-blue', x: 172.5, y: 533.75},
    { pos: 'MB1', color: 'green', x: 172.5, y: 376.5},
    {pos: 'OH2', color: 'yellow', x: 315, y: 376.5},
    { pos: 'OPP', color: 'orange', x: 457.5, y: 376.5},
    { pos: 'L', color: 'violet', x: 457.5, y: 586.25},
  ],
  '4': [
    { pos: 'OPP', color: 'orange', x: 457.5, y: 533.75},
    { pos: 'L', color: 'violet', x: 315, y: 533.75}, // Libero replaces MB2
    { pos: 'OH1', color: 'yellow', x: 172.5, y: 533.75},
    { pos: 'S', color: 'light-blue', x: 172.5, y: 376.5},
    {pos: 'MB1', color: 'green', x: 315, y: 376.5},
    { pos: 'OH2', color: 'yellow', x: 457.5, y: 376.5},
    { pos: 'MB2', color: 'green', x: 15.625, y: 533.75},
  ],
  '5': [
    // 1
    { pos: 'OH2', color: 'yellow', x: 457.5, y: 533.75},
    // 6
    { pos: 'OPP', color: 'orange', x: 315, y: 533.75},
    // 5
    { pos: 'L', color: 'violet', x: 172.5, y: 533.75},
    // 4
    { pos: 'OH1', color: 'yellow', x: 172.5, y: 376.5},
    // 3
    {pos: 'S', color: 'light-blue', x: 315, y: 376.5},
    // 2
    { pos: 'MB1', color: 'green', x: 457.5, y: 376.5},
    { pos: 'MB2', color: 'green', x: 15.625, y: 533.75},
  ],
  '6': [
    // 1
    { pos: 'MB1', color: 'green', x: 457.5, y: 533.75},
    // 6
    { pos: 'OH2', color: 'yellow', x: 315, y: 533.75},
    // 5
    { pos: 'OPP', color: 'orange', x: 172.5, y: 533.75},
    // 4
    { pos: 'MB2', color: 'green', x: 172.5, y: 376.5},
    // 3
    {pos: 'OH1', color: 'yellow', x: 315, y: 376.5},
    // 2
    { pos: 'S', color: 'light-blue', x: 457.5, y: 376.5},
    { pos: 'L', color: 'violet', x: 457.5, y: 586.25},
  ],
};

const Hero = () => {
    const [currentRotation, setCurrentRotation] = useState('1')
    const [showOpponents, setShowOpponents] = useState(false)
    const [useLibero, setUseLibero] = useState(false)
    
    const getOpponentPositions = (yourPositions) => {
        return yourPositions
            .map(player => ({
                ...player,
                color: 'red',
                x: 626.25 - player.x,
                y: 646.25 - player.y,
            }));
    };

    return (
        <section className="relative bg-cover bg-center min-h-screen bg-[url(./assets/vnl-photo.jpg)] flex items-center justify-center">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Main container - FIXED LAYOUT */}
            <div className="relative z-10 w-full h-full min-h-screen flex flex-col lg:flex-row">
                {/* LEFT SIDE - TEXT (takes up left half on desktop) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center text-white px-8 py-12 lg:py-0">
                    <div className="max-w-xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Volleyball Rotations Planner
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl">
                            Drag and drop player markers on a virtual court. Visualize rotations, assign names, and plan lineups with ease.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE - WHITEBOARD (takes up right half on desktop) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 py-4 lg:py-4">
                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                        {/* Checkboxes */}
                        <div className="flex flex-col gap-1">
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={useLibero}
                                        onChange={(e) => setUseLibero(e.target.checked)}
                                        sx={{
                                            color: 'white',
                                            '&.Mui-checked': { color: 'white' }
                                        }}
                                    />
                                }
                                label="Libero"
                                sx={{
                                    color: 'white',
                                    '& .MuiFormControlLabel-label': { 
                                        fontSize: '1rem',
                                        fontWeight: 'bold'
                                    }
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={showOpponents}
                                        onChange={(e) => setShowOpponents(e.target.checked)}
                                        sx={{
                                            color: 'white',
                                            '&.Mui-checked': { color: 'white' }
                                        }}
                                    />
                                }
                                label="Show Opponents"
                                sx={{
                                    color: 'white',
                                    '& .MuiFormControlLabel-label': { 
                                        fontSize: '1rem',
                                        fontWeight: 'bold'
                                    }
                                }}
                            />
                        </div>

                        <FormControl>
                            <FormLabel 
                                id="rotation-radio" 
                                sx={{ 
                                    color: 'white', 
                                    textAlign: 'center', 
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    mb: 1
                                }}
                            >
                                Rotations
                            </FormLabel>
                            <RadioGroup 
                                row 
                                aria-labelledby="rotation-radio"
                                value={currentRotation}
                                onChange={(e) => setCurrentRotation(e.target.value)}
                                sx={{
                                    justifyContent: 'center',
                                    '& .MuiFormControlLabel-label': { 
                                        color: 'white',
                                        fontSize: '1rem'
                                    },
                                    '& .MuiRadio-root': {
                                        color: 'white',
                                        '&.Mui-checked': { color: 'white' }
                                    }
                                }}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="bottom"/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="bottom"/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="bottom"/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="bottom"/>
                                <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="bottom"/>
                                <FormControlLabel value="6" control={<Radio />} label="6" labelPlacement="bottom"/>
                            </RadioGroup>
                        </FormControl>
                    </div>

                    {/* Whiteboard - PROPER SIZING */}
                    <div className="w-full max-w-[90vw] lg:max-w-[400px] xl:max-w-[600px]">
                        {/* aspect-[3/4] maintains 3:4 ratio (taller) */}
                        <div className="w-full aspect-3/4 rounded-2xl shadow-2xl overflow-hidden bg-white relative">
                            {/* Render all whiteboards but only show the active one */}
                            {['1', '2', '3', '4', '5', '6'].map(rotation => (
                                <div 
                                    key={`normal-${rotation}`}
                                    style={{ 
                                        visibility: currentRotation === rotation && !useLibero ? 'visible' : 'hidden',
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                >
                                    <Whiteboard 
                                        positions={[...initialPositions[rotation], ...getOpponentPositions(initialPositions[rotation])]}
                                        showOpponents={showOpponents}
                                    />
                                </div>
                            ))}
                            {['1', '2', '3', '4', '5', '6'].map(rotation => (
                                <div 
                                    key={`libero-${rotation}`}
                                    style={{ 
                                        visibility: currentRotation === rotation && useLibero ? 'visible' : 'hidden',
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                >
                                    <Whiteboard 
                                        positions={[...liberoPositions[rotation], ...getOpponentPositions(liberoPositions[rotation])]}
                                        showOpponents={showOpponents}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
