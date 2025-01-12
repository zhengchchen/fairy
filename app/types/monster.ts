// 怪物列表项接口
export interface MonsterListItem {
  icon: string;          // 图标路径
  tag: string[];         // 标签数组
  tag2: string[];        // 次要标签数组
  rarity: number;        // 稀有度(1-4)
  group: number;         // 分组ID
  EN: string;           // 英文名
  desc: string;         // 描述
  KO: string;           // 韩文名
  CHS: string;          // 简体中文名
  JA: string;           // 日文名
}

export interface MonsterList {
  [key: string]: MonsterListItem;  // key为怪物ID
}

// 怪物详情接口
export interface MonsterDetail {
  Id: number;           // ID
  MonsterId: number;    // 怪物ID
  MonsterInfo: {
    CodeName: string;   // 代号
    Icon: string;       // 图标
    Tag: string[];      // 标签
    Type: string;       // 类型
    Element: {          // 元素属性
      Ice: number;
      Fire: number; 
      Electric: number;
      Ether: number;
      Physical: number;
    };
    Stats: {            // 基础属性
      Hp: number;
      Attack: number;
      Defence: number;
      Crit: number;
      CritDamage: number;
      CritRes: number;
      CritDmgRes: number;
      PenRate: number;
      PenDelta: number;
      Stun: number;
      BreakStun: number;
    };
    Curves: {           // 成长曲线
      Hp: StatCurve;
      Attack: StatCurve;
      Defence: StatCurve;
      Stun: StatCurve;
    };
  };
  ImagePath: string;    // 图片路径
  Tag: string[];        // 标签
  Tag2: string[];       // 次要标签
  Name: string;         // 名称
  Desc: string;         // 描述
  Rarity: number;       // 稀有度
  GroupId: number;      // 分组ID
  GroupDesc: string;    // 分组描述
  CardObtain: string;   // 获取方式
  CardQuote: string;    // 引用语
  CardSkillDesc: string;// 技能描述
}

// 属性成长曲线接口
export interface StatCurve {
  Curve: number[];      // 成长曲线数组
  Ratio: number;        // 比率
}
