// 武器列表项接口
export interface WeaponListItem {
  icon: string;          // 图标名称
  rank: number;          // 星级(2-4)
  type: number;          // 武器类型
  EN: string;           // 英文名
  desc: string;         // 描述
  KO: string;           // 韩文名
  CHS: string;          // 简体中文名
  JA: string;           // 日文名
}

export interface WeaponList {
  [key: string]: WeaponListItem;  // key为武器ID
}

// 武器详情接口
export interface WeaponDetail {
  Id: number;           // ID
  CodeName: string;     // 代号
  Name: string;         // 名称
  Desc: string;         // 描述
  Desc2: string;        // 简短描述
  Desc3: string;        // 额外描述
  Rarity: number;       // 稀有度
  Icon: string;         // 图标路径
  WeaponType: {         // 武器类型
    [key: string]: string;
  };
  BaseProperty: {       // 基础属性
    Name: string;
    Name2: string;
    Format: string;
    Value: number;
  };
  RandProperty: {       // 随机属性
    Name: string;
    Name2: string;
    Format: string;
    Value: number;
  };
  Level: {              // 等级信息
    [key: string]: {
      Exp: number;      // 经验值
      Rate: number;     // 比率1
      Rate2: number;    // 比率2
    };
  };
  Stars: {              // 星级信息
    [key: string]: {
      StarRate: number; // 星级比率
      RandRate: number; // 随机比率
    };
  };
  Materials: string;    // 材料信息
  Talents: {            // 天赋信息
    [key: string]: {
      Name: string;     // 天赋名称
      Desc: string;     // 天赋描述
    };
  };
}
