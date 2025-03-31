import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { getHittingStats } from '@/services/api';

function HittingPanel() {
  const sprayChartCanvasRef = useRef(null);
  const exitVelocityCanvasRef = useRef(null);
  const [selectedBatter, setSelectedBatter] = useState("Judge");
  const [timeframe, setTimeframe] = useState("game");
  const [hittingData, setHittingData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHittingStats('game1');
        setHittingData(data);
      } catch (error) {
        console.error('Error fetching hitting data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  // Player performance data - fallback if API fails
  const playerData = {
    Judge: {
      exitVelocity: 95.2,
      launchAngle: 18.5,
      barrelRate: 22.4,
      hits: [
        { type: "fly", x: 0.7, y: 0.3, exitVelocity: 98, launchAngle: 25 },
        { type: "ground", x: 0.3, y: 0.7, exitVelocity: 92, launchAngle: 5 },
        { type: "line", x: 0.5, y: 0.5, exitVelocity: 105, launchAngle: 15 },
        { type: "fly", x: 0.8, y: 0.2, exitVelocity: 110, launchAngle: 30 },
        { type: "line", x: 0.4, y: 0.6, exitVelocity: 100, launchAngle: 12 },
        { type: "ground", x: 0.2, y: 0.8, exitVelocity: 88, launchAngle: 0 },
        { type: "fly", x: 0.9, y: 0.1, exitVelocity: 115, launchAngle: 35 },
      ],
    },
    Stanton: {
      exitVelocity: 97.8,
      launchAngle: 16.2,
      barrelRate: 19.8,
      hits: [
        { type: "line", x: 0.6, y: 0.4, exitVelocity: 112, launchAngle: 18 },
        { type: "ground", x: 0.4, y: 0.7, exitVelocity: 95, launchAngle: 3 },
        { type: "fly", x: 0.7, y: 0.2, exitVelocity: 108, launchAngle: 28 },
        { type: "line", x: 0.5, y: 0.5, exitVelocity: 118, launchAngle: 14 },
        { type: "ground", x: 0.3, y: 0.8, exitVelocity: 90, launchAngle: -2 },
        { type: "fly", x: 0.8, y: 0.3, exitVelocity: 105, launchAngle: 32 },
      ],
    },
  };

  const performanceMetrics = [
    { player: "Judge", avgExitVelocity: 95.2, avgDistance: 410, barrelRate: 22.4 },
    { player: "Stanton", avgExitVelocity: 97.8, avgDistance: 415, barrelRate: 19.8 },
    { player: "Torres", avgExitVelocity: 89.5, avgDistance: 380, barrelRate: 12.1 },
    { player: "Rizzo", avgExitVelocity: 88.2, avgDistance: 375, barrelRate: 10.5 },
  ];

  // Draw spray chart
  useEffect(() => {
    if (!sprayChartCanvasRef.current) return;

    const canvas = sprayChartCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw baseball field
    const centerX = canvas.width / 2;
    const centerY = canvas.height - 20;
    const radius = Math.min(canvas.width, canvas.height) - 40;

    // Draw outfield
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = "#1f2937";
    ctx.fill();
    ctx.strokeStyle = "#4b5563";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw infield
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - radius * 0.4, centerY - radius * 0.4);
    ctx.lineTo(centerX, centerY - radius * 0.56);
    ctx.lineTo(centerX + radius * 0.4, centerY - radius * 0.4);
    ctx.closePath();
    ctx.fillStyle = "#374151";
    ctx.fill();
    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw bases
    const baseSize = 10;

    // Home plate
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(centerX - baseSize / 2, centerY - baseSize / 2, baseSize, baseSize);

    // First base
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(centerX + radius * 0.4 - baseSize / 2, centerY - radius * 0.4 - baseSize / 2, baseSize, baseSize);

    // Second base
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(centerX - baseSize / 2, centerY - radius * 0.56 - baseSize / 2, baseSize, baseSize);

    // Third base
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(centerX - radius * 0.4 - baseSize / 2, centerY - radius * 0.4 - baseSize / 2, baseSize, baseSize);

    // Draw pitcher's mound
    ctx.beginPath();
    ctx.arc(centerX, centerY - radius * 0.28, baseSize, 0, Math.PI * 2);
    ctx.fillStyle = "#6b7280";
    ctx.fill();

    // Draw foul lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - radius, centerY);
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw hit locations
    const playerHits = playerData[selectedBatter].hits;

    playerHits.forEach((hit) => {
      // Convert normalized coordinates to canvas coordinates
      const x = centerX - radius + hit.x * radius * 2;
      const y = centerY - radius * hit.y;

      // Different colors for different hit types
      let color;
      if (hit.type === "fly") {
        color = "#3b82f6"; // Blue for fly balls
      } else if (hit.type === "line") {
        color = "#10b981"; // Green for line drives
      } else {
        color = "#f59e0b"; // Amber for ground balls
      }

      // Draw hit marker
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#f3f4f6";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw legend
    const legendX = 20;
    const legendY = 30;
    const legendSpacing = 25;

    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#d1d5db";
    ctx.fillText("Hit Types:", legendX, legendY);

    // Fly ball
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY + legendSpacing, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.fill();
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#d1d5db";
    ctx.fillText("Fly Ball", legendX + 25, legendY + legendSpacing + 5);

    // Line drive
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY + legendSpacing * 2, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#10b981";
    ctx.fill();
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#d1d5db";
    ctx.fillText("Line Drive", legendX + 25, legendY + legendSpacing * 2 + 5);

    // Ground ball
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY + legendSpacing * 3, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#f59e0b";
    ctx.fill();
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#d1d5db";
    ctx.fillText("Ground Ball", legendX + 25, legendY + legendSpacing * 3 + 5);
  }, [selectedBatter]);

  // Draw exit velocity vs launch angle scatter plot
  useEffect(() => {
    if (!exitVelocityCanvasRef.current) return;

    const canvas = exitVelocityCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // X-axis (Launch Angle)
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Y-axis (Exit Velocity)
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(padding, padding);
    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 2;
    ctx.stroke();

    // X-axis labels
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.textAlign = "center";

    for (let i = -10; i <= 40; i += 10) {
      const x = padding + ((i + 10) / 50) * chartWidth;
      ctx.fillText(i.toString(), x, canvas.height - padding + 20);

      // Grid line
      ctx.beginPath();
      ctx.moveTo(x, canvas.height - padding);
      ctx.lineTo(x, padding);
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Y-axis labels
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let i = 70; i <= 120; i += 10) {
      const y = canvas.height - padding - ((i - 70) / 50) * chartHeight;
      ctx.fillText(i.toString(), padding - 10, y);

      // Grid line
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axis titles
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#d1d5db";
    ctx.textAlign = "center";
    ctx.fillText("Launch Angle (degrees)", canvas.width / 2, canvas.height - 10);

    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Exit Velocity (mph)", 0, 0);
    ctx.restore();

    // Plot data points
    const playerHits = playerData[selectedBatter].hits;

    playerHits.forEach((hit) => {
      const x = padding + ((hit.launchAngle + 10) / 50) * chartWidth;
      const y = canvas.height - padding - ((hit.exitVelocity - 70) / 50) * chartHeight;

      // Size based on exit velocity
      const size = 5 + (hit.exitVelocity - 80) / 10;

      // Different colors for different hit types
      let color;
      if (hit.type === "fly") {
        color = "#3b82f6"; // Blue for fly balls
      } else if (hit.type === "line") {
        color = "#10b981"; // Green for line drives
      } else {
        color = "#f59e0b"; // Amber for ground balls
      }

      // Draw data point
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#f3f4f6";
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }, [selectedBatter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Tabs defaultValue="Judge" onValueChange={setSelectedBatter}>
          <TabsList>
            <TabsTrigger value="Judge">Aaron Judge</TabsTrigger>
            <TabsTrigger value="Stanton">Giancarlo Stanton</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select defaultValue="game" onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="game">Current Game</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="season">Full Season</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spray Chart</CardTitle>
            <CardDescription>Hit locations and types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <canvas
                ref={sprayChartCanvasRef}
                width={400}
                height={350}
                className="rounded-lg bg-gray-900"
              ></canvas>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exit Velocity vs. Launch Angle</CardTitle>
            <CardDescription>
              Relationship between exit velocity and launch angle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <canvas
                ref={exitVelocityCanvasRef}
                width={400}
                height={350}
                className="rounded-lg bg-gray-900"
              ></canvas>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>Key hitting metrics across players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <svg viewBox="0 0 600 300" className="h-full w-full">
                {/* X and Y axes */}
                <line x1="80" y1="250" x2="550" y2="250" stroke="#6b7280" strokeWidth="2" />
                <line x1="80" y1="50" x2="80" y2="250" stroke="#6b7280" strokeWidth="2" />

                {/* X-axis labels (players) */}
                {performanceMetrics.map((player, index) => {
                  const x = 80 + index * 150 + 75;
                  return (
                    <text key={`player-${index}`} x={x} y="270" textAnchor="middle" fill="#d1d5db" fontSize="14">
                      {player.player}
                    </text>
                  );
                })}

                {/* Y-axis labels */}
                {[0, 20, 40, 60, 80, 100].map((value, index) => {
                  const y = 250 - value * 2;
                  return (
                    <text
                      key={`y-label-${index}`}
                      x="70"
                      y={y}
                      textAnchor="end"
                      dominantBaseline="middle"
                      fill="#9ca3af"
                      fontSize="12"
                    >
                      {value}
                    </text>
                  );
                })}

                {/* Y-axis title */}
                <text x="30" y="150" textAnchor="middle" fill="#d1d5db" fontSize="14" transform="rotate(-90, 30, 150)">
                  Value
                </text>

                {/* Grouped bars */}
                {performanceMetrics.map((player, playerIndex) => {
                  const baseX = 80 + playerIndex * 150;

                  // Exit Velocity (normalized to 0-100 scale for visualization)
                  const evHeight = (player.avgExitVelocity - 80) * 10;

                  // Distance (normalized to 0-100 scale)
                  const distHeight = (player.avgDistance - 350) / 2;

                  // Barrel Rate (already in percentage)
                  const brHeight = player.barrelRate * 2;

                  return (
                    <g key={`bars-${playerIndex}`}>
                      {/* Exit Velocity Bar */}
                      <rect x={baseX + 30} y={250 - evHeight} width="30" height={evHeight} fill="#3b82f6" rx="4" />
                      <text x={baseX + 45} y={245 - evHeight} textAnchor="middle" fill="white" fontSize="12">
                        {player.avgExitVelocity}
                      </text>

                      {/* Distance Bar */}
                      <rect x={baseX + 70} y={250 - distHeight} width="30" height={distHeight} fill="#10b981" rx="4" />
                      <text x={baseX + 85} y={245 - distHeight} textAnchor="middle" fill="white" fontSize="12">
                        {player.avgDistance}
                      </text>

                      {/* Barrel Rate Bar */}
                      <rect x={baseX + 110} y={250 - brHeight} width="30" height={brHeight} fill="#8b5cf6" rx="4" />
                      <text x={baseX + 125} y={245 - brHeight} textAnchor="middle" fill="white" fontSize="12">
                        {player.barrelRate}%
                      </text>
                    </g>
                  );
                })}

                {/* Legend */}
                <rect x="400" y="20" width="15" height="15" fill="#3b82f6" rx="2" />
                <text x="425" y="32" fill="#d1d5db" fontSize="14">
                  Exit Velocity (mph)
                </text>

                <rect x="400" y="45" width="15" height="15" fill="#10b981" rx="2" />
                <text x="425" y="57" fill="#d1d5db" fontSize="14">
                  Avg Distance (ft)
                </text>

                <rect x="400" y="70" width="15" height="15" fill="#8b5cf6" rx="2" />
                <text x="425" y="82" fill="#d1d5db" fontSize="14">
                  Barrel Rate (%)
                </text>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HittingPanel;