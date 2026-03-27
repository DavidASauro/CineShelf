"use client";
import { useState } from "react";
import { Slider } from "./ui/slider";

interface YearRangeSliderProps {
  min?: number;
  max?: number;
  onChange?: (range: { from: number; to: number }) => void;
}

const DECADES = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

const YearRangeSlider = ({
  min = 1900,
  max = new Date().getFullYear(),
  onChange,
}: YearRangeSliderProps) => {
  const [range, setRange] = useState([min, max]);
  const [activeDecade, setActiveDecade] = useState<number | null>(null);

  const update = (newRange: number[]) => {
    setRange(newRange);
    onChange?.({ from: newRange[0], to: newRange[1] });
  };

  const selectDecade = (decade: number) => {
    if (activeDecade === decade) {
      setActiveDecade(null);
      update([min, max]);
    } else {
      setActiveDecade(decade);
      update([decade, Math.min(decade + 9, max)]);
    }
  };

  return (
    <div className="w-full px-2 space-y-4">
      <div className="flex justify-between text-sm font-medium">
        <span>{range[0]}</span>
        <span>{range[1]}</span>
      </div>

      <Slider
        min={min}
        max={max}
        value={range}
        onValueChange={(val) => {
          setActiveDecade(null);
          setRange(val as number[]);
        }}
        onValueCommitted={(val) => {
          update(val as number[]);
        }}
      />
      <div className="flex flex-wrap gap-2 justify-center">
        {DECADES.map((decade) => (
          <button
            key={decade}
            onClick={() => selectDecade(decade)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
              ${
                activeDecade === decade
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
          >
            {decade}s
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearRangeSlider;
