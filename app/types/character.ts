// 代理人列表返回的数据结构
export interface CharacterListItem {
    code: string;       // 代理人代号
    rank: number;       // 星级(2-4)
    type: number;       // 类型(1-5)
    element: number | null;    // 元素属性
    hit: number;        // 打击类型
    camp: number;       // 阵营
    icon: string;       // 头像图标
    EN: string;         // 英文名
    desc: string;       // 描述
    KO: string;         // 韩文名
    CHS: string;        // 简体中文名
    JA: string;         // 日文名
  }
  
export interface CharacterList {
    [key: string]: CharacterListItem;  // key为代理人ID
}
  
  // 代理人详情数据结构
export interface CharacterDetail {
    Id: number;
    Icon: string;
    Name: string;
    CodeName: string;
    Rarity: number;
    WeaponType: {
      [key: string]: string;
    };
    ElementType: {
      [key: string]: string;
    };
    SpecialElementType: {
      [key: string]: any;
    };
    HitType: {
      [key: string]: string;
    };
    Camp: {
      [key: string]: string;
    };
    Gender: number;
    Race?: string;
    Height?: string;
    Birthday?: string;
    Hobby?: string[];
    CV?: {
      CN: string;
      JP: string;
    };
    Skill: {
      Basic: {
        Description: SkillDescription[];
        Material?: {
          [key: string]: {
            [key: string]: number;
          };
        };
      };
      Special?: {
        Description: SkillDescription[];
        Material?: {
          [key: string]: number;
        };
      };
      Ultimate?: {
        Description: SkillDescription[];
        Material?: {
          [key: string]: number;
        };
      };
      Talent?: {
        Description: SkillDescription[];
        Material?: {
          [key: string]: number;
        };
      };
    };
    SkillList: {
      [key: string]: {
        Name: string;
        Desc: string;
        ElementType: number;
        HitType: number;
      };
    };
    Passive: {
      Level: {
        [key: string]: PassiveLevel;
      };
      Materials: {
        [key: string]: {
          [key: string]: number;
        };
      };
    };
    Talent: {
      [key: string]: TalentInfo;
    };
  }
  
export interface CharacterDetails {
    [key: string]: CharacterDetail;
}
  
  // 技能参数详情
export interface SkillParamDetail {
    Main: number;
    Growth: number;
    Format: string;
    DamagePercentage: number;
    DamagePercentageGrowth: number;
    StunRatio: number;
    StunRatioGrowth: number;
    SpRecovery: number;
    SpRecoveryGrowth: number;
    FeverRecovery: number;
    FeverRecoveryGrowth: number;
    AttributeInfliction: number;
    SpConsume: number;
    AttackData: any[];
  }
  
  // 技能参数
export interface SkillParam {
    Name: string;
    Desc: string;
    Param: {
      [key: string]: SkillParamDetail;
    };
  }
  
  // 技能描述
export interface SkillDescription {
    Name: string;
    Desc?: string;
    Param?: {
      Name: string;
      Desc: string;
      Param: {
        [key: string]: SkillParamDetail | undefined;
      };
    }[] | undefined;
  }
  
  // 技能信息
export interface Skill {
    Basic: {
      Description: SkillDescription[];
      Material?: {
        [key: string]: number;
      };
    };
    Special?: {
      Description: SkillDescription[];
      Material?: {
        [key: string]: number;
      };
    };
    Ultimate?: {
      Description: SkillDescription[];
      Material?: {
        [key: string]: number;
      };
    };
    Talent?: {
      Description: SkillDescription[];
      Material?: {
        [key: string]: number;
      };
    };
  }
  
  // 被动等级信息
export interface PassiveLevel {
    Level: number;
    Id: number;
    Name: string[];
    Desc: string[];
  }
  
  // 材料信息
export interface MaterialInfo {
    [key: string]: number;
  }
  
  // 天赋信息
export interface TalentInfo {
    Level: number;
    Name: string;
    Desc: string;
    Desc2: string;
  }