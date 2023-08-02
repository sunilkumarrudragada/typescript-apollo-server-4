import { Connection } from 'mongoose';

export interface DatabaseModels {
  User: Connection['models']['User'];
  Token: Connection['models']['Token'];
}
