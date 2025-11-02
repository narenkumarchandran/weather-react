import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 bg-card border-border shadow-[var(--shadow-card)] transition-all focus-visible:shadow-[var(--shadow-soft)]"
      />
      <Button 
        type="submit" 
        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-[var(--shadow-card)]"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};
