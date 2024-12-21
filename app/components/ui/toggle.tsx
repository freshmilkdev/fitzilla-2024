import { Switch } from "./switch";
import { Label } from "./label";

interface ToggleProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  iconOn: React.ReactNode; // Icon when checked
  iconOff: React.ReactNode; // Icon when unchecked
}

export function Toggle({ id, checked, onCheckedChange, iconOn, iconOff }: ToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor={id}>
        {iconOn}
      </Label>
      <Switch
        id={id}
        className="mx-1"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={id}>
       {iconOff}
      </Label>
    </div>
  );
} 