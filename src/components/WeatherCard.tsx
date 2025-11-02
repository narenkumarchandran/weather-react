import { Cloud, Droplets, Wind, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <Card className="w-full max-w-md bg-card shadow-[var(--shadow-card)] border-border">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{weather.name}</h2>
            <p className="text-muted-foreground capitalize">
              {weather.weather[0].description}
            </p>
          </div>
          
          <div className="py-6">
            <div className="text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {Math.round(weather.main.temp)}°C
            </div>
            <p className="text-muted-foreground mt-2">
              Feels like {Math.round(weather.main.feels_like)}°C
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 justify-center">
              <Droplets className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="font-semibold">{weather.main.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 justify-center">
              <Wind className="h-5 w-5 text-accent" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Wind Speed</p>
                <p className="font-semibold">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
