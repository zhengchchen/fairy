import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://api.hakush.in/zzz/data';
const DATA_DIR = path.join(process.cwd(), 'app/data');

interface UpdateInfo {
  lastUpdate: string;
  status: 'success' | 'failed';
}

async function fetchData(url: string) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

async function saveData(filename: string, data: any) {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(
    filePath,
    `// 自动生成于 ${new Date().toLocaleString('zh-CN')}\n\nexport default ${JSON.stringify(data, null, 2)};`
  );
}

async function fetchDetails(type: string, ids: string[]) {
  const details: { [key: string]: any } = {};
  
  // 使用 Promise.all 并行获取所有详情
  await Promise.all(
    ids.map(async (id) => {
      try {
        const data = await fetchData(`${BASE_URL}/zh/${type}/${id}.json`);
        details[id] = data;
        console.log(`✅ Fetched ${type} detail: ${id}`);
      } catch (error) {
        console.error(`❌ Failed to fetch ${type} detail: ${id}`);
      }
    })
  );
  
  return details;
}

async function updateData() {
  try {
    // 确保数据目录存在
    await fs.mkdir(DATA_DIR, { recursive: true });

    // 获取列表数据
    const lists = {
      character: await fetchData(`${BASE_URL}/character.json`),
      weapon: await fetchData(`${BASE_URL}/weapon.json`),
      suit: await fetchData(`${BASE_URL}/equipment.json`),
      monster: await fetchData(`${BASE_URL}/monster.json`)
    };

    // 保存列表数据
    await Promise.all([
      saveData('characterList.ts', lists.character),
      saveData('weaponList.ts', lists.weapon),
      saveData('equipmentList.ts', lists.suit),
      saveData('monsterList.ts', lists.monster)
    ]);

    // 获取详情数据
    const details = {
      character: await fetchDetails('character', Object.keys(lists.character)),
      weapon: await fetchDetails('weapon', Object.keys(lists.weapon)),
      suit: await fetchDetails('equipment', Object.keys(lists.suit)),
      monster: await fetchDetails('monster', Object.keys(lists.monster))
    };

    // 保存详情数据
    await Promise.all([
      saveData('characterDetails.ts', details.character),
      saveData('weaponDetails.ts', details.weapon),
      saveData('equipmentDetails.ts', details.suit),
      saveData('monsterDetails.ts', details.monster)
    ]);

    // 创建索引文件
    const indexContent = `
        // 列表数据
        export { default as characterList } from './characterList';
        export { default as weaponList } from './weaponList';
        export { default as equipmentList } from './equipmentList';
        export { default as monsterList } from './monsterList';

        // 详情数据
        export { default as characterDetails } from './characterDetails';
        export { default as weaponDetails } from './weaponDetails';
        export { default as equipmentDetails } from './equipmentDetails';
        export { default as monsterDetails } from './monsterDetails';
    `;

    await fs.writeFile(
      path.join(DATA_DIR, 'index.ts'),
      indexContent
    );

    // 保存更新信息
    const updateInfo: UpdateInfo = {
      lastUpdate: new Date().toISOString(),
      status: 'success'
    };
    await fs.writeFile(
      path.join(DATA_DIR, 'update-info.json'),
      JSON.stringify(updateInfo, null, 2)
    );

    console.log('✨ All data updated successfully!');
  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

// 添加延迟函数以避免请求过快
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 执行更新
updateData();