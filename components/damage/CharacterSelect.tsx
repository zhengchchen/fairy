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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { IMAGE_BASE_URL } from '@/app/constants';

interface CharacterSelectProps {
  onSelect: (character: any, levels: any) => void;
  selected?: any;
}

export function CharacterSelect({ onSelect, selected }: CharacterSelectProps) {
  const [characters, setCharacters] = useState<any>({});
  const [selectedChar, setSelectedChar] = useState(selected);
  const [skillLevels, setSkillLevels] = useState({
    basic: 1,
    special: 1,
    ultimate: 1,
    talent: 1
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      const list = await api.getCharacterList();
      console.log('API返回的角色数据：', list);
      setCharacters(list);
    };
    fetchCharacters();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {selected ? selected.Name : "选择角色"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>选择角色</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(characters).map(([id, char]: [string, any]) => (
                <Card 
                  key={id}
                  className={`cursor-pointer ${selectedChar?.Id === char.Id ? 'border-primary' : ''} ${
                    char.rank === 4 
                      ? 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950 dark:to-purple-900' 
                      : char.rank === 3
                      ? 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950 dark:to-amber-900'
                      : ''
                  }`}
                  onClick={() => setSelectedChar(char)}
                >
                  <CardContent className="p-2">
                    <img 
                      src={`${IMAGE_BASE_URL}${
                        char.icon.startsWith('IconRole') 
                          ? char.icon.replace('IconRole', 'IconRoleSelect') 
                          : char.icon
                      }.webp`} 
                      alt={char.CHS} 
                      className="w-full" 
                    />
                    <div className="text-center mt-2 min-h-[1.5rem]">{char.CHS}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {selectedChar && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>普攻等级 ({skillLevels.basic})</Label>
                <Slider
                  value={[skillLevels.basic]}
                  min={1}
                  max={12}
                  step={1}
                  onValueChange={(value) => setSkillLevels({...skillLevels, basic: value[0]})}
                />
              </div>
              <div className="space-y-2">
                <Label>战技等级 ({skillLevels.special})</Label>
                <Slider
                  value={[skillLevels.special]}
                  min={1}
                  max={12}
                  step={1}
                  onValueChange={(value) => setSkillLevels({...skillLevels, special: value[0]})}
                />
              </div>
              <div className="space-y-2">
                <Label>终结技等级 ({skillLevels.ultimate})</Label>
                <Slider
                  value={[skillLevels.ultimate]}
                  min={1}
                  max={12}
                  step={1}
                  onValueChange={(value) => setSkillLevels({...skillLevels, ultimate: value[0]})}
                />
              </div>
              <div className="space-y-2">
                <Label>天赋等级 ({skillLevels.talent})</Label>
                <Slider
                  value={[skillLevels.talent]}
                  min={1}
                  max={12}
                  step={1}
                  onValueChange={(value) => setSkillLevels({...skillLevels, talent: value[0]})}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => onSelect(selectedChar, skillLevels)}
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