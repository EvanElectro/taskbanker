
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, X } from 'lucide-react';

interface TimePickerProps {
  taskId: string;
  initialTime?: string;
  onTimeSelected: (taskId: string, time: string | null) => void;
  onClose: () => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ 
  taskId, 
  initialTime, 
  onTimeSelected, 
  onClose 
}) => {
  const [hours, setHours] = useState<string>(initialTime ? initialTime.split(':')[0] : '');
  const [minutes, setMinutes] = useState<string>(initialTime ? initialTime.split(':')[1] : '');
  const timePickerRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the time picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 23)) {
      setHours(value);
    }
  };
  
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 59)) {
      setMinutes(value);
    }
  };
  
  const handleSetTime = () => {
    if (hours !== '' && minutes !== '') {
      const formattedHours = hours.padStart(2, '0');
      const formattedMinutes = minutes.padStart(2, '0');
      onTimeSelected(taskId, `${formattedHours}:${formattedMinutes}`);
    }
  };
  
  const handleClearTime = () => {
    onTimeSelected(taskId, null);
  };
  
  return (
    <div 
      ref={timePickerRef}
      className="bg-card border border-border rounded-lg shadow-lg p-4 w-64 animate-scale-in"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1 text-sm font-medium">
          <Clock size={16} />
          <span>Set Time</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="size-6"
        >
          <X size={14} />
        </Button>
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <input
          type="number"
          min="0"
          max="23"
          placeholder="HH"
          value={hours}
          onChange={handleHoursChange}
          className="w-16 h-12 text-center border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <div className="text-xl font-medium">:</div>
        <input
          type="number"
          min="0"
          max="59"
          placeholder="MM"
          value={minutes}
          onChange={handleMinutesChange}
          className="w-16 h-12 text-center border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour) => (
          <Button
            key={hour}
            variant="outline"
            size="sm"
            onClick={() => {
              setHours(hour.toString());
              setMinutes('00');
            }}
            className="h-8"
          >
            {hour}:00
          </Button>
        ))}
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleClearTime}
          className="flex-1"
        >
          Clear
        </Button>
        <Button 
          size="sm" 
          onClick={handleSetTime}
          disabled={hours === '' || minutes === ''}
          className="flex-1"
        >
          Set Time
        </Button>
      </div>
    </div>
  );
};

export default TimePicker;
