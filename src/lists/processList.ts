import { Process } from '../assets/process';
import { IState } from '../ledger-api/state';
import { StateList } from '../ledger-api/statelist';
import { BloodContext } from '../utils/bloodContext';

export class ProcessList <T extends Process> extends StateList<T> {

    constructor(ctx: BloodContext, validTypes: Array<IState<T>>) {

        super(ctx, 'org.vehiclelifecycle.process');
        this.use(...validTypes);

    }
    public async addProcess(process: T) {
        return this.add(process);
    }

  public async getProcess(process) {
   return this.get(process);
   }

  public async updateProcess(process) {
      return this.update(process);
  }
}
