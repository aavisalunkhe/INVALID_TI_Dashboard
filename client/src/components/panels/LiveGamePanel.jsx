import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

function LiveGamePanel({ gameData }) {
  const [inning, setInning] = useState(7);
  const [outs, setOuts] = useState(1);
  const [yankeeScore, setYankeeScore] = useState(5);
  const [redSoxScore, setRedSoxScore] = useState(3);
  
  // Simulate live game updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update game state for demo purposes
      if (Math.random() > 0.7) {
        setOuts((prev) => (prev === 2 ? 0 : prev + 1));
        
        if (outs === 2) {
          setInning((prev) => Math.min(prev + 1, 9));
        }
        
        if (Math.random() > 0.8) {
          if (Math.random() > 0.5) {
            setYankeeScore((prev) => prev + 1);
          } else {
            setRedSoxScore((prev) => prev + 1);
          }
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [outs, inning]);

  // Game events for the timeline
  const gameEvents = [
    { inning: 1, event: "Single", team: "NYY", position: 10 },
    { inning: 2, event: "Double", team: "BOS", position: 20 },
    { inning: 3, event: "Home Run", team: "NYY", position: 30 },
    { inning: 3, event: "Strikeout", team: "BOS", position: 35 },
    { inning: 4, event: "Walk", team: "NYY", position: 40 },
    { inning: 5, event: "Home Run", team: "NYY", position: 50 },
    { inning: 6, event: "Double Play", team: "NYY", position: 60 },
    { inning: 7, event: "Single", team: "BOS", position: 70 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Live Game Overview</CardTitle>
          <CardDescription>
            Current game status and key events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-900 p-4">
            <div className="text-center">
              <div className="mb-2 h-12 w-12 rounded-full bg-blue-900 p-2 mx-auto">
                <div className="h-full w-full rounded-full bg-blue-500"></div>
              </div>
              <h3 className="text-lg font-bold">Yankees</h3>
              <p className="text-3xl font-bold text-blue-500">{yankeeScore}</p>
            </div>
            
            <div className="text-center">
              <div className="mb-2 rounded-lg bg-gray-800 px-4 py-2">
                <p className="text-sm text-gray-400">Inning</p>
                <p className="text-2xl font-bold">{inning}
                  <span className="text-sm text-gray-400 ml-1">
                    {inning % 2 === 1 ? "TOP" : "BOT"}
                  </span>
                </p>
              </div>
              <div className="flex justify-center space-x-1">
                <div className={`h-3 w-3 rounded-full ${outs >= 1 ? "bg-red-500" : "bg-gray-700"}`}></div>
                <div className={`h-3 w-3 rounded-full ${outs >= 2 ? "bg-red-500" : "bg-gray-700"}`}></div>
                <div className={`h-3 w-3 rounded-full ${outs >= 3 ? "bg-red-500" : "bg-gray-700"}`}></div>
              </div>
              <p className="mt-1 text-xs text-gray-400">OUTS</p>
            </div>
            
            <div className="text-center">
              <div className="mb-2 h-12 w-12 rounded-full bg-red-900 p-2 mx-auto">
                <div className="h-full w-full rounded-full bg-red-500"></div>
              </div>
              <h3 className="text-lg font-bold">Red Sox</h3>
              <p className="text-3xl font-bold text-red-500">{redSoxScore}</p>
            </div>
          </div>
          
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-400">GAME TIMELINE</h3>
            <div className="relative h-16">
              {/* Timeline base */}
              <div className="absolute top-8 h-1 w-full bg-gray-800"></div>
              
              {/* Inning markers */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="absolute top-8 flex flex-col items-center" style={{ left: `${(i - 1) * 11.1}%` }}>
                  <div className="h-3 w-1 bg-gray-700"></div>
                  <span className="mt-1 text-xs text-gray-500">{i}</span>
                </div>
              ))}
              
              {/* Current inning indicator */}
              <div 
                className="absolute top-8 flex flex-col items-center" 
                style={{ left: `${(inning - 1) * 11.1}%` }}
              >
                <div className="h-3 w-1 bg-blue-500"></div>
                <span className="mt-1 text-xs font-bold text-blue-500">{inning}</span>
              </div>
              
              {/* Game events */}
              {gameEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="absolute top-0 flex flex-col items-center" 
                  style={{ left: `${event.position}%` }}
                >
                  <div className={`h-5 w-5 rounded-full ${event.team === "NYY" ? "bg-blue-500" : "bg-red-500"} flex items-center justify-center text-xs font-bold`}>
                    {event.event === "Home Run" ? "HR" : 
                     event.event === "Single" ? "1B" :
                     event.event === "Double" ? "2B" :
                     event.event === "Strikeout" ? "K" :
                     event.event === "Walk" ? "BB" :
                     event.event === "Double Play" ? "DP" : ""}
                  </div>
                  <div className="mt-1 text-xs font-medium">
                    {event.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LiveGamePanel;