import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { useToast } from "@/hooks/use-toast";
import { Cloud } from "lucide-react";

const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // OpenWeatherMap API key

const Index = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }
      
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData.list);

      toast({
        title: "Success!",
        description: `Weather data loaded for ${weatherData.name}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch weather data. Please try another city.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-sky)] p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <Cloud className="h-10 w-10 text-primary" />
            <h1 className="text-5xl font-bold text-primary drop-shadow-lg">
              Weather App
            </h1>
          </div>
          <p className="text-accent text-lg">
            Get real-time weather updates for any city
          </p>
        </header>

        <div className="flex justify-center">
          <SearchBar onSearch={fetchWeather} />
        </div>

        {loading && (
          <div className="text-center text-white text-lg animate-pulse">
            Loading weather data...
          </div>
        )}

        {weather && !loading && (
          <div className="space-y-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <WeatherCard weather={weather} />
            {forecast && <ForecastCard forecast={forecast} />}
          </div>
        )}

        {!weather && !loading && (
          <div className="text-center text-white/70 text-lg py-12">
            Search for a city to see the weather
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
