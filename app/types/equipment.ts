// 多语言文本接口
export interface EquipmentText {
    name: string;    // 名称
    desc2: string;   // 简短描述
    desc4: string;   // 详细描述
  }
  
// 驱动盘列表项接口
export interface EquipmentListItem {
    icon: string;                // 图标路径
    EN: EquipmentText;               // 英文
    KO: EquipmentText;               // 韩文
    CHS: EquipmentText;              // 简体中文
    JA: EquipmentText;               // 日文
}

export interface EquipmentList {
    [key: string]: EquipmentListItem;  // key为驱动盘ID
}

// 驱动盘详情接口
export interface EquipmentDetail {
    Id: number;                  // ID
    Name: string;                // 名称
    Desc2: string;               // 简短描述
    Desc4: string;               // 详细描述
    Story: string;               // 背景故事
    Icon: string;                // 主图标路径
    Icon2: string;               // 副图标路径
}