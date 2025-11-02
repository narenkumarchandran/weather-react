import { Card } from "@/components/ui/card";

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

interface ForecastCardProps {
  forecast: ForecastItem[];
}

export const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const dailyForecasts = forecast.filter((_, index) => index % 8 === 0).slice(0, 5);

  return (
    <Card className="w-full max-w-md bg-card shadow-[var(--shadow-card)] border-border">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
        <div className="space-y-3">
          {dailyForecasts.map((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <span className="font-medium text-foreground">{dayName}</span>
                <span className="text-sm text-muted-foreground capitalize">
                  {day.weather[0].description}
                </span>
                <span className="font-semibold text-primary">
                  {Math.round(day.main.temp)}°C
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
