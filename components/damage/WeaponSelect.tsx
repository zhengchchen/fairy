'use client';

import { useState, useEffect } from 'react';
import { api } from '@/app/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { IMAGE_BASE_URL } from '@/app/constants';

interface WeaponSelectProps {
  onSelect: (weapon: any, level: number) => void;
  selected?: any;
}

export function WeaponSelect({ onSelect, selected }: WeaponSelectProps) {
  const [weapons, setWeapons] = useState<any>({});
  const [selectedWeapon, setSelectedWeapon] = useState(selected);
  const [level, setLevel] = useState(1); // 默认60级

  useEffect(() => {
    const fetchWeapons = async () => {
      const list = await api.getWeaponList();
      setWeapons(list);
    };
    fetchWeapons();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {selected ? selected.Name : "选择音擎"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>选择音擎</DialogTitle>
        </DialogHeader>
        <div className="flex">
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(weapons).map(([id, weapon]: [string, any]) => (
                <Card 
                  key={id}
                  className={`cursor-pointer ${selectedWeapon?.Id === weapon.Id ? 'border-primary' : ''} ${
                    weapon.rank === 4 
                      ? 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950 dark:to-purple-900' 
                      : weapon.rank === 3
                      ? 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950 dark:to-amber-900'
                      : weapon.rank === 2
                      ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950 dark:to-blue-900'
                      : ''
                  }`}
                  onClick={() => setSelectedWeapon(weapon)}
                >
                  <CardContent className="p-2">
                    <img width={100} height={100} src={`${IMAGE_BASE_URL}${weapon.icon}.webp`} alt={weapon.CHS} />
                    <div className="text-center mt-2">{weapon.CHS}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {selectedWeapon && (
            <div className="space-y-4 w-[200px]">
              <div className="space-y-2">
                <Label>精炼 ({level})</Label>
                <Slider
                  value={[level]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => setLevel(value[0])}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => onSelect(selectedWeapon, level)}
              >
                确认选择
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}