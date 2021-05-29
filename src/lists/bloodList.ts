import { Blood } from '../assets/blood';
import { IState } from '../ledger-api/state';
import { StateList } from '../ledger-api/statelist';
import { BloodContext } from '../utils/bloodContext';

export class BloodList <T extends Blood> extends StateList<T> {

    constructor(ctx: BloodContext, validTypes: Array<IState<T>>) {

        super(ctx, 'org.vehiclelifecycle.vehicle');
        this.use(...validTypes);

    }
    public async addBloodBag(blood: T) {
        return this.add(blood);
    }

  public async getBloodBag(blood) {
   return this.get(blood);
   }

  public async updateBloodBag(blood) {
      return this.update(blood);
  }

    /**
     * 
     * @param  {string} bloodNumber blood number to return history for
     * 
     */
    public async getBloodBagHistory(bloodNumber) {
        // call function defined in statelist.ts
        return this.getHistory(bloodNumber);
    }
}
