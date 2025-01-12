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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IMAGE_BASE_URL } from '@/app/constants';

interface EquipmentSelectProps {
  onSelect: (set1: any[], set2: any[]) => void;
  selectedSet1?: any[];
  selectedSet2?: any[];
}

export function EquipmentSelect({ onSelect, selectedSet1, selectedSet2 }: EquipmentSelectProps) {
  const [equipments, setEquipments] = useState<any>({});
  const [set1, setSet1] = useState<any[]>(selectedSet1 || []);
  const [set2, setSet2] = useState<any[]>(selectedSet2 || []);

  useEffect(() => {
    const fetchEquipments = async () => {
      const list = await api.getEquipmentList();
      setEquipments(list);
    };
    fetchEquipments();
  }, []);

  const handleEquipmentSelect = (equipment: any, setNumber: number) => {
    if (setNumber === 1) {
      if (set1.length < 4) {
        setSet1([...set1, equipment]);
      }
    } else {
      if (set2.length < 2) {
        setSet2([...set2, equipment]);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {selectedSet1 && selectedSet2 ? "已选择驱动盘" : "选择驱动盘"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>选择驱动盘</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="set1">
          <TabsList>
            <TabsTrigger value="set1">四件套 ({set1.length}/4)</TabsTrigger>
            <TabsTrigger value="set2">两件套 ({set2.length}/2)</TabsTrigger>
          </TabsList>
          <TabsContent value="set1">
            <ScrollArea className="h-[500px]">
              <div className="grid grid-cols-6 gap-2">
                {Object.entries(equipments).map(([id, equipment]: [string, any]) => (
                  <Card 
                    key={id}
                    className="cursor-pointer"
                    onClick={() => handleEquipmentSelect(equipment, 1)}
                  >
                    <CardContent className="p-2">
                      <img 
                        src={`${IMAGE_BASE_URL}${equipment.icon.split('/').pop()?.replace('.png', '.webp')}`} 
                        alt={equipment.CHS.name} 
                        width={100}
                        height={100}
                      />
                      <div className="text-center mt-2">{equipment.CHS.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="set2">
            <ScrollArea className="h-[500px]">
              <div className="grid grid-cols-6 gap-2">
                {Object.entries(equipments).map(([id, equipment]: [string, any]) => (
                  <Card 
                    key={id}
                    className="cursor-pointer"
                    onClick={() => handleEquipmentSelect(equipment, 2)}
                  >
                    <CardContent className="p-2">
                      <img 
                        src={`${IMAGE_BASE_URL}${equipment.icon.split('/').pop()?.replace('.png', '.webp')}`} 
                        alt={equipment.CHS.name} 
                        width={100}
                        height={100}
                      />
                      <div className="text-center mt-2">{equipment.CHS.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <Button 
          className="w-full" 
          onClick={() => onSelect(set1, set2)}
          disabled={set1.length !== 4 || set2.length !== 2}
        >
          确认选择
        </Button>
      </DialogContent>
    </Dialog>
  );
}   