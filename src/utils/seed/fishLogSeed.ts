import FishWiki from '../../models/fishWiki';

const excelToJson = require('convert-excel-to-json');
// const request = require('request');

interface IFish {
  largeGroup: string;
  group: string;
  commonName: string;
  scientificName: string;
  family: string;
  food: string;
  habitat: string;
  maxSize: number;
  maxWeight: number;
  isEndemicInfo: string;
  isEndemic: boolean;
  isThreatenedInfo: string;
  isThreatened: boolean;
  hasSpawningSeasonInfo: string;
  hasSpawningSeason: boolean;
  wasIntroducedInfo: string;
  wasIntroduced: boolean;
  funFact: string;
  photo: string;
}
interface ISheet {
  Plan1: object[];
  Plan2: IFish[];
  Plan3: object[];
}

const fishLogSeed = async () => {
  const columnToKey = {
    A: 'largeGroup',
    B: 'group',
    C: 'commonName',
    D: 'scientificName',
    E: 'family',
    F: 'food',
    G: 'habitat',
    H: 'maxSize',
    I: 'maxWeight',
    J: 'isEndemicInfo',
    K: 'isThreatenedInfo',
    L: 'hasSpawningSeasonInfo',
    M: 'wasIntroducedInfo',
    N: 'funFact',
    S: 'photo',
  };
  try {
    const fishWiki = await FishWiki.find();
    if (fishWiki.length > 0) {
      return;
    }
    const result: ISheet = await excelToJson({
      sourceFile: 'src/utils/seed/planilha-dados1.xlsx',
      header: {
        rows: 1,
      },
      columnToKey,
    });
    for (let i = 0; i < result.Plan2.length; i += 1) {
      const fish = {
        largeGroup: result.Plan2[i].largeGroup,
        group: result.Plan2[i].group,
        commonName: result.Plan2[i].commonName,
        scientificName: result.Plan2[i].scientificName,
        family: result.Plan2[i].family,
        food: result.Plan2[i].food,
        habitat: result.Plan2[i].habitat,
        maxSize: result.Plan2[i].maxSize,
        maxWeight: result.Plan2[i].maxWeight,
        isEndemicInfo: result.Plan2[i].isEndemicInfo,
        isEndemic: !!(
          result.Plan2[i].isEndemicInfo !== undefined &&
          result.Plan2[i].isEndemicInfo.toLowerCase().includes('sim')
        ),
        isThreatenedInfo: result.Plan2[i].isThreatenedInfo,
        isThreatened: !!(
          result.Plan2[i].isThreatenedInfo !== undefined &&
          result.Plan2[i].isThreatenedInfo.toLowerCase().includes('sim')
        ),
        hasSpawningSeasonInfo: result.Plan2[i].hasSpawningSeasonInfo,
        hasSpawningSeason: !!(
          result.Plan2[i].hasSpawningSeasonInfo !== undefined &&
          result.Plan2[i].hasSpawningSeasonInfo.toLowerCase().includes('sim')
        ),
        wasIntroducedInfo: result.Plan2[i].wasIntroducedInfo,
        wasIntroduced: !!(
          result.Plan2[i].wasIntroducedInfo !== undefined &&
          result.Plan2[i].wasIntroducedInfo.toLowerCase().includes('sim')
        ),
        funFact: result.Plan2[i].funFact,
        photo: result.Plan2[i].photo,
      };
      // eslint-disable-next-line no-await-in-loop
      await FishWiki.create(fish);
    }
    console.log('Planilha populada com sucesso!');
  } catch (error) {
    console.log('Não foi possível popular a planilha!');
    console.log(error);
  }
};

export default fishLogSeed;
