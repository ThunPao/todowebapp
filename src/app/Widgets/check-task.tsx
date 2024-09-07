'use client'
import { useState, useRef, useEffect } from 'react';
import { toggleTask } from "@/actions";

interface TaskProps {
    id: number;
    checkState: boolean;
}

export function CheckTaskInputPage({ id, checkState }: TaskProps) {
    const [isChecked, setIsChecked] = useState(checkState);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const lastCallTimeRef = useRef<number>(0);
    const cooldown = 300;

    useEffect(() => {
        setIsChecked(checkState);
    }, [checkState]);

    const handleChange = async () => {
        const now = Date.now();
        const lastCallTime = lastCallTimeRef.current;

        // คูลดาวน์ toggle 0.3 วิ
        if (now - lastCallTime < cooldown) {
            return;
        }

        setIsDisabled(true);
        setIsLoading(true);
        lastCallTimeRef.current = now;

        const newCheckState = !isChecked;
        setIsChecked(newCheckState);

        try {
            const success = await toggleTask(id, isChecked);
            if (!success) {
                setIsChecked(!newCheckState);
            }
        } catch (error) {
            console.error('Failed to update task:', error);
            setIsChecked(!newCheckState);
        } finally {
            setIsLoading(false);
            setTimeout(() => setIsDisabled(false), cooldown);
        }
    };

    return (
        <>
            <div className="flex items-center gap-2">

        {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
        ) : (
            <input
                type="checkbox"
                onChange={handleChange}
                checked={isChecked}
                disabled={isDisabled}
                className="checkbox"
            />
            
        )}
        </div>
        </>
    );
}
