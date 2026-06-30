// Есть входные данные, массив объектов.
// Надо вернуть массив массивов,
// в каждом массиве должны лежать объекты с одним и тем же lineNo

const input = [
  {
    barrelEditMode: 0,
    barrelNo: 105960,
    beginUsing: '2026-06-01T10:49:14.841514+05:00',
    code: 575367,
    componentId: 6,
    componentName: null,
    componentNameShort: 'B',
    contractId: 9,
    dataKey: 358,
    endUsing: null,
    lineNo: 1,
    nomenclature:
      'Силикон MF881-25HM SILANDE (комп B) 19,6кг (для структурного остекления)',
    party: '20251208103',
  },
  {
    barrelEditMode: 0,
    barrelNo: 105960,
    beginUsing: '2026-06-01T10:49:14.841514+05:00',
    code: 575367,
    componentId: 6,
    componentName: null,
    componentNameShort: 'B',
    contractId: 9,
    dataKey: 358,
    endUsing: null,
    lineNo: 1,
    nomenclature:
      'Силикон MF881-25HM SILANDE (комп B) 19,6кг (для структурного остекления)',
    party: '20251208103',
  },
  {
    barrelEditMode: 0,
    barrelNo: 105960,
    beginUsing: '2026-06-01T10:49:14.841514+05:00',
    code: 575367,
    componentId: 6,
    componentName: null,
    componentNameShort: 'B',
    contractId: 9,
    dataKey: 358,
    endUsing: null,
    lineNo: 2,
    nomenclature:
      'Силикон MF881-25HM SILANDE (комп B) 19,6кг (для структурного остекления)',
    party: '20251208103',
  },
  {
    barrelEditMode: 0,
    barrelNo: 105960,
    beginUsing: '2026-06-01T10:49:14.841514+05:00',
    code: 575367,
    componentId: 6,
    componentName: null,
    componentNameShort: 'B',
    contractId: 9,
    dataKey: 358,
    endUsing: null,
    lineNo: 3,
    nomenclature:
      'Силикон MF881-25HM SILANDE (комп B) 19,6кг (для структурного остекления)',
    party: '20251208103',
  },
  {
    barrelEditMode: 0,
    barrelNo: 105960,
    beginUsing: '2026-06-01T10:49:14.841514+05:00',
    code: 575367,
    componentId: 6,
    componentName: null,
    componentNameShort: 'B',
    contractId: 9,
    dataKey: 358,
    endUsing: null,
    lineNo: 3,
    nomenclature:
      'Силикон MF881-25HM SILANDE (комп B) 19,6кг (для структурного остекления)',
    party: '20251208103',
  },
];

const sortArrays = (arr) => {
  const resMap = new Map();

  arr.forEach((item) => {
    const key = item.lineNo;

    if (!resMap.has(key)) {
      resMap.set(key, []);
    }

    resMap.get(key).push(item);
  });

  return Array.from(resMap.values());
};

console.log(sortArrays(input));
