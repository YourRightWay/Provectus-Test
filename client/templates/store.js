/** @jsx createElem */
import { createElem } from '../utils'

const store = (
    <form id="20" class="form-panel">
        <div class="form-group" id="1">
            <label htmlFor="input1">Node 1</label>
            <input type="checkbox" id="input1" name='Node 1' checked={false} />

            <div class="form-group" id="11">
                <label htmlFor="input11">Node 1.1</label>
                <input type="checkbox" id="input11" name='Node 1.1' checked={true} />

                <div class="form-group" id="111">
                    <label htmlFor="input111">Node 1.1</label>
                    <input type="checkbox" id="input111"  name='Node 1.1' checked={true} />

                    <div class="form-group" id="1111">
                        <label htmlFor="input1111">Node 1.1.1</label>
                        <input type="checkbox" id="input1111"  name='Node 1.1.1' checked={true} />
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group" id="2">
            <label htmlFor="input2">Node 2</label>
            <input type="checkbox" id="input2" name='Node 2' checked={false} />
        </div>

        <div class="form-group" id="3">
            <label htmlFor="input3">Node 3</label>
            <input type="checkbox" id="input3" name='Node 3' checked={true} />

            <div class="form-group" id="31">
                <label htmlFor="input31">Node 3.1</label>
                <input type="checkbox" id="input31" name='Node 3.1' checked={false} />
            </div>
        </div>
    </form>
);

export default store
