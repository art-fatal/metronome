import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';

interface BpmControlsProps {
    bpm: number;
    onBpmChange: (value: number) => void;
}

export const BpmControls = ({ bpm, onBpmChange }: BpmControlsProps) => (
    <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-4 w-full">
            <label className="text-lg font-semibold">BPM:</label>
            <InputNumber
                value={bpm}
                onValueChange={(e) => onBpmChange(e.value || 120)}
                min={40}
                max={508}
                showButtons
                buttonLayout="horizontal"
                className="w-32"
            />
        </div>
        
        <Slider
            value={bpm}
            onChange={(e) => onBpmChange(e.value as number)}
            min={40}
            max={508}
            className="w-full"
        />
    </div>
); 