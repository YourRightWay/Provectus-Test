/** @jsx createElem */
import { createElem } from '../utils'

const store = (
    <form id="20" class="form-panel">
        <div class="form-group" id="1">
            <label htmlFor="">Node 1</label>
            <input type="checkbox" name='Node 1' checked={false} />

            <div class="form-group" id="11">
                <label htmlFor="">Node 1.1</label>
                <input type="checkbox"  name='Node 1.1' checked={true} />

                <div class="form-group" id="111">
                    <label htmlFor="">Node 1.1</label>
                    <input type="checkbox"  name='Node 1.1' checked={true} />
                </div>
            </div>
        </div>

        <div class="form-group" id="2">
            <label htmlFor="">Node 2</label>
            <input type="checkbox" name='Node 2' checked={false} />
        </div>

        <div class="form-group" id="3">
            <label htmlFor="">Node 3</label>
            <input type="checkbox" name='Node 3' checked={true} />

            <div class="form-group" id="31">
                <label htmlFor="">Node 3.1</label>
                <input type="checkbox" name='Node 3.1' checked={false} />
            </div>
        </div>
    </form>
);

export default store
