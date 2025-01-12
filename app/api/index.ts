import axios from 'axios';
import { CharacterDetail, CharacterList } from '../types/character';
import { MonsterList } from '../types/monster';
import { WeaponDetail, WeaponList } from '../types/weapon';
import { EquipmentList } from '../types/equipment';

const BASE_URL = 'https://api.hakush.in/zzz/data';

export const api = {
  async getCharacterList(): Promise<CharacterList> {
    const { data } = await axios.get(`${BASE_URL}/character.json`);
    return data;
  },

  async getCharacterDetail(id: string): Promise<CharacterDetail> {
    const { data } = await axios.get(`${BASE_URL}/zh/character/${id}.json`);
    return data;
  },

  async getMonsterList(): Promise<MonsterList> {
    const { data } = await axios.get(`${BASE_URL}/monster.json`);
    return data;
  },

  async getMonsterDetail(id: number) {
    const { data } = await axios.get(`${BASE_URL}/zh/monster/${id}.json`);
    return data;
  },

  async getWeaponList(): Promise<WeaponList> {
    const { data } = await axios.get(`${BASE_URL}/weapon.json`);
    return data;
  },

  async getWeaponDetail(id: number): Promise<WeaponDetail> {
    const { data } = await axios.get(`${BASE_URL}/zh/weapon/${id}.json`);
    return data;
  },

  async getEquipmentList(): Promise<EquipmentList> {
    const { data } = await axios.get(`${BASE_URL}/equipment.json`);
    return data;
  },

  async getEquipmentDetail(id: number) {
    const { data } = await axios.get(`${BASE_URL}/zh/equipment/${id}.json`);
    return data;
  }
};