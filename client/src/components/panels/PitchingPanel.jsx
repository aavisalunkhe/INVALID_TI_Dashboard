import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

function PitchingPanel() {
  const heatmapCanvasRef = useRef(null);
  const [selectedPitcher, setSelectedPitcher] = useState("Cole");
  
  // Pitch data
  const pitchTypes = {
    "Fastball": { percentage: 55, color: "#3b82f6" },
    "Slider": { percentage: 25, color: "#10b981" },
    "Curveball": { percentage: 12, color: "#8b5cf6" },
    "Changeup": { percentage: 8, color: "#f59e0b" },
  };
  
  const velocityData = [
    { range: "80-85", count: 5 },
    { range: "85-90", count: 15 },
    { range: "90-95", count: 35 },
    { range: "95-100", count: 40 },
    { range: "100+", count: 5 },
  ];
  
  // Draw pitch location heatmap
  useEffect(() => {
    if (!heatmapCanvasRef.current) return;
    
    const canvas = heatmapCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw strike zone
    const zoneWidth = 150;
    const zoneHeight = 180;
    const zoneX = (canvas.width - zoneWidth) / 2;
    const zoneY = (canvas.height - zoneHeight) / 2;
    
    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 2;
    ctx.strokeRect(zoneX, zoneY, zoneWidth, zoneHeight);
    
    // Draw grid lines
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 1; i < 3; i++) {
      const x = zoneX + (zoneWidth / 3) * i;
      ctx.beginPath();
      ctx.moveTo(x, zoneY);
      ctx.lineTo(x, zoneY + zoneHeight);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 1; i < 3; i++) {
      const y = zoneY + (zoneHeight / 3) * i;
      ctx.beginPath();
      ctx.moveTo(zoneX, y);
      ctx.lineTo(zoneX + zoneWidth, y);
      ctx.stroke();
    }
    
    // Generate random pitch locations
    const pitches = [];
    for (let i = 0; i < 50; i++) {
      // Cluster more pitches in certain areas based on pitcher
      let xBias = 0, yBias = 0;
      
      if (selectedPitcher === "Cole") {
        xBias = -0.2; // Tends to pitch inside to right-handed batters
        yBias = -0.1; // Slightly higher in the zone
      } else {
        xBias = 0.1; // Tends to pitch outside to right-handed batters
        yBias = 0.2; // Lower in the zone
      }
      
      const x = zoneX - 30 + (zoneWidth + 60) * (Math.random() * 0.8 + 0.1 + xBias);
      const y = zoneY - 30 + (zoneHeight + 60) * (Math.random() * 0.8 + 0.1 + yBias);
      
      // Velocity between 85 and 102 mph
      const velocity = Math.floor(Math.random() * 17) + 85;
      
      pitches.push({ x, y, velocity });
    }
    
    // Draw pitches
    pitches.forEach(pitch => {
      // Color based on velocity (blue to red gradient)
      const normalizedVelocity = (pitch.velocity - 85) / 17; // 0 to 1
      const r = Math.floor(normalizedVelocity * 255);
      const g = Math.floor(50 - normalizedVelocity * 50);
      const b = Math.floor(255 - normalizedVelocity * 255);
      
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.beginPath();
      ctx.arc(pitch.x, pitch.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw legend
    const legendX = 20;
    const legendY = canvas.height - 60;
    
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#d1d5db";
    ctx.fillText("Velocity (mph):", legendX, legendY);
    
    const gradientWidth = 150;
    const gradientHeight = 15;
    
    const gradient = ctx.createLinearGradient(legendX, legendY + 10, legendX + gradientWidth, legendY + 10);
    gradient.addColorStop(0, "rgb(0, 0, 255)");
    gradient.addColorStop(0.5, "rgb(128, 0, 128)");
    gradient.addColorStop(1, "rgb(255, 0, 0)");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(legendX, legendY + 15, gradientWidth, gradientHeight);
    
    ctx.fillStyle = "#d1d5db";
    ctx.fillText("85", legendX, legendY + 45);
    ctx.fillText("102", legendX + gradientWidth - 20, legendY + 45);
    
  }, [selectedPitcher]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="Cole" onValueChange={setSelectedPitcher}>
        <TabsList>
          <TabsTrigger value="Cole">Gerrit Cole</TabsTrigger>
          <TabsTrigger value="Severino">Luis Severino</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pitch Location Heatmap</CardTitle>
            <CardDescription>
              Location and velocity of pitches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <canvas 
                ref={heatmapCanvasRef} 
                width={350} 
                height={350} 
                className="rounded-lg bg-gray-900"
              ></canvas>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pitch Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of pitch selection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="relative h-64 w-64">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {/* Donut chart */}
                  {Object.entries(pitchTypes).reduce((acc, [type, data], index) => {
                    const startAngle = acc.offset;
                    const angle = (data.percentage / 100) * Math.PI * 2;
                    const endAngle = startAngle + angle;
                    
                    const x1 = 50 + 40 * Math.cos(startAngle);
                    const y1 = 50 + 40 * Math.sin(startAngle);
                    const x2 = 50 + 40 * Math.cos(endAngle);
                    const y2 = 50 + 40 * Math.sin(endAngle);
                    
                    const largeArcFlag = angle > Math.PI ? 1 : 0;
                    
                    const pathData = [
                      `M 50 50`,
                      `L ${x1} ${y1}`,
                      `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      `Z`
                    ].join(' ');
                    
                    // Calculate position for the label
                    const labelAngle = startAngle + angle / 2;
                    const labelRadius = 30; // Slightly inside the donut
                    const labelX = 50 + labelRadius * Math.cos(labelAngle);
                    const labelY = 50 + labelRadius * Math.sin(labelAngle);
                    
                    return {
                      offset: endAngle,
                      elements: [
                        ...acc.elements,
                        <path 
                          key={`slice-${index}`} 
                          d={pathData} 
                          fill={data.color} 
                        />,
                        <text 
                          key={`label-${index}`} 
                          x={labelX} 
                          y={labelY} 
                          textAnchor="middle" 
                          dominantBaseline="middle" 
                          fill="white" 
                          fontSize="4"
                          fontWeight="bold"
                        >
                          {data.percentage}%
                        </text>
                      ]
                    };
                  }, { offset: -Math.PI / 2, elements: [] }).elements}
                  
                  {/* Inner circle for donut */}
                  <circle cx="50" cy="50" r="25" fill="#111827" />
                </svg>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.entries(pitchTypes).map(([type, data]) => (
                <div key={type} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: data.color }}
                  ></div>
                  <span className="text-sm">{type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Velocity Distribution</CardTitle>
            <CardDescription>
              Frequency of pitches by velocity range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <svg viewBox="0 0 500 200" className="h-full w-full">
                {/* X and Y axes */}
                <line x1="50" y1="170" x2="450" y2="170" stroke="#6b7280" strokeWidth="2" />
                <line x1="50" y1="30" x2="50" y2="170" stroke="#6b7280" strokeWidth="2" />
                
                {/* X-axis labels */}
                {velocityData.map((item, index) => {
                  const x = 50 + (index * 80) + 40;
                  return (
                    <text 
                      key={`x-label-${index}`} 
                      x={x} 
                      y="190" 
                      textAnchor="middle" 
                      fill="#9ca3af" 
                      fontSize="12"
                    >
                      {item.range}
                    </text>
                  );
                })}
                
                {/* Y-axis labels */}
                {[0, 10, 20, 30, 40, 50].map((value) => {
                  const y = 170 - (value * 2.8);
                  return (
                    <text 
                      key={`y-label-${value}`} 
                      x="40" 
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
                
                {/* X-axis title */}
                <text 
                  x="250" 
                  y="210" 
                  textAnchor="middle" 
                  fill="#d1d5db" 
                  fontSize="14"
                >
                  Velocity (mph)
                </text>
                
                {/* Y-axis title */}
                <text 
                  x="15" 
                  y="100" 
                  textAnchor="middle" 
                  fill="#d1d5db" 
                  fontSize="14"
                  transform="rotate(-90, 15, 100)"
                >
                  Number of Pitches
                </text>
                
                {/* Bars */}
                {velocityData.map((item, index) => {
                  const x = 50 + (index * 80);
                  const height = item.count * 2.8;
                  const y = 170 - height;
                  
                  // Color gradient based on velocity
                  const hue = 240 - (index * 60);
                  
                  return (
                    <rect 
                      key={`bar-${index}`} 
                      x={x} 
                      y={y} 
                      width="80" 
                      height={height} 
                      fill={`hsl(${hue}, 80%, 60%)`} 
                      rx="4"
                    />
                  );
                })}
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PitchingPanel;