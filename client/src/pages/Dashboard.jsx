import { useState, useEffect } from 'react';
import { Bell, Mail } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LiveGamePanel from '@/components/panels/LiveGamePanel';
import PitchingPanel from '@/components/panels/PitchingPanel';
import HittingPanel from '@/components/panels/HittingPanel';
import DefensivePanel from '@/components/panels/DefensivePanel';
import TrendsPanel from '@/components/panels/TrendsPanel';
import LoadingDashboard from '@/components/layout/LoadingDashboard';
import { getGames } from '@/services/api';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGames();
        setGameData(data[0]); // Get the first game for demo
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Simulate loading for demo purposes
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-gray-950 py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500"></div>
            <h1 className="text-xl font-bold text-white">MLB Live Insights</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Live Game Analysis</h2>
            <p className="text-gray-400">Yankees vs. Red Sox - June 15, 2025</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
            <Button>Generate Newsletter</Button>
          </div>
        </div>

        {loading ? (
          <LoadingDashboard />
        ) : (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pitching">Pitching</TabsTrigger>
              <TabsTrigger value="hitting">Hitting</TabsTrigger>
              <TabsTrigger value="defense">Defense</TabsTrigger>
              <TabsTrigger value="trends">Trends & Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <LiveGamePanel gameData={gameData} />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Highlights</CardTitle>
                    <CardDescription>
                      Important moments from the game
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border border-gray-800 bg-gray-900 p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <p className="text-sm font-medium">3rd Inning</p>
                        </div>
                        <p className="mt-2 text-sm text-gray-300">
                          Judge hits a 2-run homer with exit velocity of 112 mph
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-800 bg-gray-900 p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <p className="text-sm font-medium">5th Inning</p>
                        </div>
                        <p className="mt-2 text-sm text-gray-300">
                          Cole strikes out 3 batters with fastballs over 98 mph
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-800 bg-gray-900 p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          <p className="text-sm font-medium">7th Inning</p>
                        </div>
                        <p className="mt-2 text-sm text-gray-300">
                          Double play by Torres saves potential scoring situation
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Win Probability</CardTitle>
                    <CardDescription>
                      AI-powered prediction
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center">
                    <div className="relative h-40 w-40">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-500">68%</p>
                          <p className="text-sm text-gray-400">Yankees Win</p>
                        </div>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#1f2937"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#3b82f6"
                          strokeWidth="10"
                          strokeDasharray="282.7"
                          strokeDashoffset="90.5"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pitching">
              <PitchingPanel />
            </TabsContent>

            <TabsContent value="hitting">
              <HittingPanel />
            </TabsContent>

            <TabsContent value="defense">
              <DefensivePanel />
            </TabsContent>

            <TabsContent value="trends">
              <TrendsPanel />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}

export default Dashboard;