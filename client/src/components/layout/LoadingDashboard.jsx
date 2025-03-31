import { Card, CardContent, CardHeader } from '@/components/ui/Card';

function LoadingDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="h-6 w-1/3 bg-gray-800 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-800 rounded mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full bg-gray-800 rounded"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="h-6 w-1/3 bg-gray-800 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-800 rounded mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full bg-gray-800 rounded"></div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="h-6 w-1/3 bg-gray-800 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-800 rounded mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-gray-800 rounded"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoadingDashboard;