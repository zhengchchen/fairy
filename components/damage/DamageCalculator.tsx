'use client';

import { useState } from 'react';
import { CharacterSelect } from './CharacterSelect';
import { WeaponSelect } from './WeaponSelect';
import { EquipmentSelect } from './EquipmentSelect';
import { MonsterSelect } from './MonsterSelect';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DamageCalculator() {
  const [character, setCharacter] = useState<any>(null);
  const [characterLevels, setCharacterLevels] = useState<any>(null);
  const [weapon, setWeapon] = useState<any>(null);
  const [weaponLevel, setWeaponLevel] = useState<number>(60);
  const [equipmentSet1, setEquipmentSet1] = useState<any[]>([]);
  const [equipmentSet2, setEquipmentSet2] = useState<any[]>([]);
  const [monster, setMonster] = useState<any>(null);

  const handleCalculate = () => {
    // TODO: 实现伤害计算逻辑
    console.log({
      character,
      characterLevels,
      weapon,
      weaponLevel,
      equipmentSet1,
      equipmentSet2,
      monster
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* 角色选择卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>角色</CardTitle>
          </CardHeader>
          <CardContent>
            <CharacterSelect 
              onSelect={(char, levels) => {
                setCharacter(char);
                setCharacterLevels(levels);
              }}
              selected={character}
            />
            {character && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">{character.Name}</h3>
                <div className="text-sm">
                  <p>普攻等级: {characterLevels.basic}</p>
                  <p>战技等级: {characterLevels.special}</p>
                  <p>终结技等级: {characterLevels.ultimate}</p>
                  <p>天赋等级: {characterLevels.talent}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 音擎选择卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>音擎</CardTitle>
          </CardHeader>
          <CardContent>
            <WeaponSelect 
              onSelect={(wp, level) => {
                setWeapon(wp);
                setWeaponLevel(level);
              }}
              selected={weapon}
            />
            {weapon && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">{weapon.Name}</h3>
                <p className="text-sm">等级: {weaponLevel}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 驱动盘选择卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>驱动盘</CardTitle>
          </CardHeader>
          <CardContent>
            <EquipmentSelect 
              onSelect={(set1, set2) => {
                setEquipmentSet1(set1);
                setEquipmentSet2(set2);
              }}
              selectedSet1={equipmentSet1}
              selectedSet2={equipmentSet2}
            />
            {(equipmentSet1.length > 0 || equipmentSet2.length > 0) && (
              <div className="mt-4">
                <div className="text-sm">
                  <p>四件套: {equipmentSet1.map(e => e.Name).join(', ')}</p>
                  <p>两件套: {equipmentSet2.map(e => e.Name).join(', ')}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 怪物选择卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>怪物</CardTitle>
          </CardHeader>
          <CardContent>
            <MonsterSelect 
              onSelect={setMonster}
              selected={monster}
            />
            {monster && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">{monster.CHS}</h3>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 计算结果区域 */}
      <Card>
        <CardHeader>
          <CardTitle>计算结果</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full"
            onClick={handleCalculate}
            disabled={!character || !weapon || equipmentSet1.length !== 4 || equipmentSet2.length !== 2 || !monster}
          >
            计算伤害
          </Button>
          {/* TODO: 添加计算结果显示 */}
        </CardContent>
      </Card>
    </div>
  );
}