'use client'
import { useState, useRef, useEffect } from 'react';
import { toggleTask } from "@/actions";

interface TaskProps {
    title: string;
    id: number;
    checkState: boolean;
}

export function CheckTaskInputPage({ title, id, checkState }: TaskProps) {
    const [isChecked, setIsChecked] = useState(checkState);
    const [isDisabled, setIsDisabled] = useState(false);
    const lastCallTimeRef = useRef<number>(0);
    const cooldown = 1000; // คูลดาวน์ของ ปุ่ม checkbox

    useEffect(() => {
        setIsChecked(checkState);
    }, [checkState]);

    const handleChange = async () => {
        const now = Date.now();
        const lastCallTime = lastCallTimeRef.current;


            // เงื่อนไขถ้าติดคูลดาวน์
        if (now - lastCallTime < cooldown) {
            return;
        }

        setIsDisabled(true);
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
            setTimeout(() => setIsDisabled(false), cooldown);
        }
    };

    return (
        <>
            <input
                type="checkbox"
                onChange={handleChange}
                checked={isChecked}
                disabled={isDisabled}
                className="checkbox"
            />
            <div className={isChecked ? 'line-through' : ''}>
                {title}
            </div>
        </>
    );
}