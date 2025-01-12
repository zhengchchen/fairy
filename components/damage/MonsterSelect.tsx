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
import { IMAGE_BASE_URL } from '@/app/constants';

interface MonsterSelectProps {
  onSelect: (monster: any) => void;
  selected?: any;
}

export function MonsterSelect({ onSelect, selected }: MonsterSelectProps) {
  const [monsters, setMonsters] = useState<any>({});
  const [selectedMonster, setSelectedMonster] = useState(selected);

  useEffect(() => {
    const fetchMonsters = async () => {
      const list = await api.getMonsterList();
      setMonsters(list);
    };
    fetchMonsters();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {selected ? selected.Name : "选择怪物"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>选择怪物</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          <div className="grid grid-cols-6 gap-2">
            {Object.entries(monsters).map(([id, monster]: [string, any]) => (
              <Card 
                key={id}
                className={`cursor-pointer ${selectedMonster?.Id === monster.Id ? 'border-primary' : ''} ${
                    monster.rarity === 4
                      ? 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950 dark:to-amber-900'
                      : monster.rarity === 3
                      ? 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950 dark:to-purple-900'
                      : monster.rarity === 2
                      ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950 dark:to-blue-900'
                      : monster.rarity === 1
                      ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'
                      : ''
                  }`}
                onClick={() => {
                  setSelectedMonster(monster);
                  onSelect(monster);
                }}
              >
                <CardContent className="p-2">
                  <img 
                    src={`${IMAGE_BASE_URL}${
                      monster.icon.split('/').pop()?.replace('.png', '.webp')
                    }`}
                    width={100}
                    height={100} 
                    alt={monster.CHS} 
                  
                  />
                  <div className="text-center mt-2">{monster.CHS}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}