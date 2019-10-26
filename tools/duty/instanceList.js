const fs = require('fs')
const csv = fs.readFileSync('ContentFinderCondition_chs.csv').toString()

const lines = csv.split('\n')
const data = []

const partySizeList = [null, null, 4, 8, 24]

const types = [
  null,
  null,
  '迷宫挑战',
  null, // 行会令
  '讨伐歼灭战',
  '大型任务'
]

for (const line of lines) {
  const [
    index, // strId, //territoryType,
    ,
    ,
    instanceType, // instanceContentId,
    ,
    partyTypeId,
    level,
    maxLevel,
    ilvMin,
    ilvMax,
    underSized, // joinInProgress, //highend,
    ,
    ,
    name,
    typeId,
    banner
  ] = line.split(',')

  if (!name) continue
  if (instanceType !== '1') continue
  if (!types[typeId]) continue

  data.push({
    index: parseInt(index),
    partySize: partySizeList[partyTypeId],
    level: parseInt(level),
    maxLevel: parseInt(maxLevel),
    ilvMax: parseInt(ilvMax),
    ilvMin: parseInt(ilvMin),
    underSized: underSized === 'TRUE',
    name,
    type: types[typeId],
    banner: parseInt(banner)
  })
}

const result = []
result.push('/* eslint-disable */')
result.push('// generated by instanceList.js')
result.push('module.exports = [')
result.push(data.map(x => JSON.stringify(x)).join(',\n'))
result.push(']')

fs.writeFileSync('../../docs/.vuepress/theme/duty.js', result.join('\n'))