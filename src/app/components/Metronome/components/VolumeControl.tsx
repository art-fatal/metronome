import { Slider } from 'primereact/slider';

interface VolumeControlProps {
    volume: number;
    onVolumeChange: (value: number) => void;
}

export const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => (
    <div className="flex items-center gap-4 w-full">
        <label className="text-lg font-semibold">Volume:</label>
        <Slider
            value={volume}
            onChange={(e) => onVolumeChange(e.value as number)}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
        />
    </div>
); 