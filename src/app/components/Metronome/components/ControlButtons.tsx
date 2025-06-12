import { Button } from 'primereact/button';

interface ControlButtonsProps {
    isPlaying: boolean;
    onPlay: () => void;
    onStop: () => void;
}

export const ControlButtons = ({ isPlaying, onPlay, onStop }: ControlButtonsProps) => (
    <div className="flex gap-4 mt-4">
        <Button
            icon={isPlaying ? "pi pi-stop" : "pi pi-play"}
            onClick={isPlaying ? onStop : onPlay}
            severity={isPlaying ? "danger" : "success"}
            rounded
            size="large"
        />
    </div>
); 