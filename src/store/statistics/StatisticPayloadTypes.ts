import {Routine} from '@/domain/model/routine-planner/Routine';

// General
export type PAYLOAD_GENERATE_OVERVIEW = { routines: Routine[] };

// Routines
export type PAYLOAD_GENERATE_ROUTINE_OVERVIEW = { routine: Routine };
