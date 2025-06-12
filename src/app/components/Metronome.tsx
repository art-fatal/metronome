'use client';

import { useState, useEffect, useRef } from 'react';
import { BpmControls } from './Metronome/components/BpmControls';
import { VolumeControl } from './Metronome/components/VolumeControl';
import { ControlButtons } from './Metronome/components/ControlButtons';

export default function Metronome() {
    const [bpm, setBpm] = useState(120);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const audioContext = useRef<AudioContext | null>(null);
    const nextNoteTime = useRef(0);
    const scheduledNotes = useRef<number[]>([]);
    const bpmRef = useRef(bpm);
    const volumeRef = useRef(volume);

    useEffect(() => {
        bpmRef.current = bpm;
        if (isPlaying) {
            scheduledNotes.current.forEach(timeout => clearTimeout(timeout));
            scheduledNotes.current = [];
            nextNoteTime.current = audioContext.current!.currentTime;
            scheduler();
        }
    }, [bpm]);

    useEffect(() => {
        volumeRef.current = volume;
    }, [volume]);

    useEffect(() => {
        audioContext.current = new AudioContext();
        return () => {
            if (audioContext.current) {
                audioContext.current.close();
            }
        };
    }, []);

    const scheduleNote = (time: number) => {
        const osc = audioContext.current!.createOscillator();
        const envelope = audioContext.current!.createGain();

        osc.frequency.value = 1000;
        envelope.gain.value = volumeRef.current;
        envelope.gain.exponentialRampToValueAtTime(volumeRef.current, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(audioContext.current!.destination);

        osc.start(time);
        osc.stop(time + 0.03);
    };

    const scheduler = () => {
        while (nextNoteTime.current < audioContext.current!.currentTime + 0.1) {
            scheduleNote(nextNoteTime.current);
            nextNoteTime.current += 60.0 / bpmRef.current;
        }
        scheduledNotes.current.push(window.setTimeout(scheduler, 25));
    };

    const startMetronome = () => {
        if (!isPlaying) {
            if (audioContext.current?.state === 'suspended') {
                audioContext.current.resume();
            }
            nextNoteTime.current = audioContext.current!.currentTime;
            scheduler();
            setIsPlaying(true);
        }
    };

    const stopMetronome = () => {
        if (isPlaying) {
            scheduledNotes.current.forEach(timeout => clearTimeout(timeout));
            scheduledNotes.current = [];
            setIsPlaying(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-w-[600px]">
            <h2 className="text-2xl font-bold mb-4">Métronome</h2>
            
            <div className="flex flex-col items-center gap-2 w-full">
                <BpmControls bpm={bpm} onBpmChange={setBpm} />
                <VolumeControl volume={volume} onVolumeChange={setVolume} />
            </div>

            <ControlButtons
                isPlaying={isPlaying}
                onPlay={startMetronome}
                onStop={stopMetronome}
            />
        </div>
    );
} 