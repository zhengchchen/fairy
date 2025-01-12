import type { 
CharacterList, 
CharacterDetail 
} from '../types/character';

import type {
WeaponList,
WeaponDetail
} from '../types/weapon';

import type {
MonsterList,
MonsterDetail
} from '../types/monster';

import type {
EquipmentList,
EquipmentDetail
} from '../types/equipment';
import characterList from './characterList';
import characterDetails from './characterDetails';
import weaponDetails from './weaponDetails';
import weaponList from './weaponList';
import monsterList from './monsterList';
import monsterDetails from './monsterDetails';
import equipmentList from './equipmentList';
import equipmentDetails from './equipmentDetails';
  
  export const api = {
    // 代理人相关接口
    async getCharacterList(): Promise<CharacterList> {
      return Promise.resolve(characterList);
    },
  
    async getCharacterDetail(id: string) {
      const detail = characterDetails[id as keyof typeof characterDetails];
      if (!detail) {
        throw new Error(`Character detail not found: ${id}`);
      }
      return Promise.resolve(detail);
    },
  
    // 武器相关接口
    async getWeaponList(): Promise<WeaponList> {
      return Promise.resolve(weaponList);
    },
  
    async getWeaponDetail(id: string): Promise<WeaponDetail> {
      const detail = weaponDetails[id as keyof typeof weaponDetails];
      if (!detail) {
        throw new Error(`Weapon detail not found: ${id}`);
      }
      return Promise.resolve(detail);
    },
  
    // 怪物相关接口
    async getMonsterList(): Promise<MonsterList> {
      return Promise.resolve(monsterList);
    },
  
    async getMonsterDetail(id: string) {
      const detail = monsterDetails[id as keyof typeof monsterDetails];
      if (!detail) {
        throw new Error(`Monster detail not found: ${id}`);
      }
      return Promise.resolve(detail);
    },
  
    // 驱动盘相关接口
    async getEquipmentList(): Promise<EquipmentList> {
      return Promise.resolve(equipmentList);
    },
  
    async getEquipmentDetail(id: string): Promise<EquipmentDetail> {
      const detail = equipmentDetails[id as keyof typeof equipmentDetails];
      if (!detail) {
        throw new Error(`Equipment detail not found: ${id}`);
      }
      return Promise.resolve(detail);
    }
  };
  
  export default api;