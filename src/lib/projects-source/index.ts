import { bigvProjectSource } from './items/bigv';
import { doctorDoctorProjectSource } from './items/doctor-doctor';
import { doctorPatientProjectSource } from './items/doctor-patient';
import { fofProAppProjectSource } from './items/fof-pro-app';
import { fofProMiniappProjectSource } from './items/fof-pro-miniapp';
import { fofProWebProjectSource } from './items/fof-pro-web';
import { openalphaProjectSource } from './items/openalpha';

export const PROJECT_SOURCES = [
  bigvProjectSource,
  doctorDoctorProjectSource,
  doctorPatientProjectSource,
  fofProWebProjectSource,
  fofProAppProjectSource,
  fofProMiniappProjectSource,
  openalphaProjectSource,
];

export type {
  ProjectSource,
  ProjectSourceAsset,
  ProjectSourceAttribute,
  ProjectSourceDetail,
  ProjectSourceDevelopment,
  ProjectSourcePeriod,
  ProjectSourceResource,
  ProjectSourceScreenshot,
} from './types';
