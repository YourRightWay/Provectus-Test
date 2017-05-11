// let store = [
//     {
//         id: 1,
//         name: 'Node 1',
//         isChecked: false,
//         childs: [{
//             id: 11,
//             name: 'Node 1.1',
//             isChecked: true,
//         }]
//     },
//     {
//         id: 2,
//         name: 'Node 2',
//         isChecked: false,
//         childs: [{
//             id: 21,
//             name: 'Node 2.1',
//             isChecked: true,
//             childs: [{
//                 id: 211,
//                 name: 'Node 2.1.1',
//                 isChecked: true,
//             }]
//         },{
//             id: 22,
//             name: 'Node 2.2',
//             isChecked: true,
//             childs: [{
//                 id: 221,
//                 name: 'Node 2.2.1',
//                 isChecked: true,
//             }]
//         }]
//     }
// ]

// let oneNode = {
//     id: 11123,
//     name: 'Node 1.1.2.2',
//     isChecked: true,
// };

/** @jsx createElem */

function createElem( type, props, ...children) {
    return { type, props, children };
}

const navPanel = (
    <div class="nav-panel">
        <button id="js-get-data">Get data</button>
        <button id="js-update-data">Update data</button>
        <button id="js-update-node">Update node</button>
    </div>
);

const oneNode = (
    <div id="test" class="form-group">
        <label htmlFor="">Node 123123</label>
        <input type="checkbox" id="212312" name='Node 1.2.3.3.' checked={false} />
    </div>
)


const store = (
    <form id="form-root" class="form-panel">
        <div class="form-group">
            <label htmlFor="">Node 1</label>
            <input type="checkbox" id="1" name='Node 1' checked={false} />
           
            <div class="form-group">
                <label htmlFor="">Node 1.1</label>
                <input type="checkbox" id="11" name='Node 1.1' checked={true} />
            </div>
        </div>

        <div class="form-group">
            <label htmlFor="">Node 2</label>
            <input type="checkbox" id="2" name='Node 2' checked={false} />

            <div class="form-group">
                <label htmlFor="">Node 2.1</label>
                <input type="checkbox" id="21" name='Node 2.1' checked={true} />

                <div class="form-group">
                    <label htmlFor="">Node 2.1.1</label>
                    <input type="checkbox" id="211" name='Node 2.1.1' checked={false} />
                </div>

                <div class="form-group">
                    <label htmlFor="">Node 2.1.2</label>
                    <input type="checkbox" id="212" name='Node 2.1.2' checked={true} />
                </div>
            </div>

            <div class="form-group">
                <label htmlFor="">Node 2.2</label>
                <input type="checkbox" id="22" name='Node 2.2' checked={true} />

                <div class="form-group">
                    <label htmlFor="">Node 2.2.1</label>
                    <input type="checkbox" id="221" name='Node 2.2.1' checked={false} />
                </div>

                <div class="form-group">
                    <label htmlFor="">Node 2.2.2</label>
                    <input type="checkbox" id="222" name='Node 2.2.2' checked={true} />
                </div>
            </div>
        </div>
    </form>
);

class Render {
    _changeNode (node1, node2) {
        return typeof node1 !== typeof node2 ||
            typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type
    }
    
    _createNode = (node) => {
        if (typeof node === "string") {
            return document.createTextNode(node);
        }

        const $el = document.createElement(node.type);
        
        if (node.props.id) {
            $el.id = node.props.id;
        }

        if (node.type === 'input') {
            $el.type = node.props.type;
            $el.name = node.props.name;
            $el.checked = node.props.checked;

            // console.log($el)
            //
            // $el.addEventListener('change', (e) => {
            //     console.log(e.target.id)
            // });
        }

        node.children.map(this._createNode).forEach($el.appendChild.bind($el));
        return $el;
    }

    _updateNode = ($parent, newNode, oldNode, index) => {
        if (!oldNode) {
            $parent.appendChild(
                this._createNode(newNode)
            );
        } else if (!newNode) {
            $parent.removeChild(
                $parent.childNodes[index]
            );
        } else if (this._changeNode(newNode, oldNode)) {
            $parent.replaceChild(
                this._createNode(newNode),
                $parent.childNodes[index]
            );
        } else if (newNode.type) {
            const newLength = newNode.children.length;
            const oldLength = oldNode.children.length;
            for (let i = 0; i < newLength || i < oldLength; i++) {
                this._updateNode(
                    $parent.childNodes[index],
                    newNode.children[i],
                    oldNode.children[i],
                    i
                );
            }
        }
    }
}

class App extends Render {
    constructor(root, state) {
        super()
        this._state = state;
        this._root = root;
    }
    
    get getData () {
        console.log(this._state)
        return this._state;
    }
    
    update (value) {
        console.log(this._state)
        this._state = value
    }
    
    updateNode (id, node) {
        if (id && isNaN(id)) throw new Error('Id must be a number!');
        if(!(typeof node === 'object')) throw new Error('Node must be an object');
        let trigger = false, oldState = this._state;

        function parseState(state) {
            
            for(let i = 0; i < state.length; i++) {
                if(state[i].type) {

                    if(state[i].props.id && state[i].props.id === id+'') {
                        trigger = true;
                        state[i] = node;
                        break
                    }

                    if(state[i].hasOwnProperty('children') && state[i].children.length > 0) {
                        parseState(state[i].children)
                        if (trigger) {
                            break
                        }
                    }
                }
            }
        }
        
        parseState(this._state.children)
        this._updateNode(this._root, this._state, oldState, 1);
        this.render();
    }

    renderInterface() {
        this._root.appendChild(this._createNode(navPanel));

        document.getElementById('js-get-data').addEventListener('click', () => {
            this.getData
        });

        document.getElementById('js-update-data').addEventListener('click', () => {
            this.update(store)
        });

        document.getElementById('js-update-node').addEventListener('click', () => {
            this.updateNode(221, oneNode);
        });
    }

    render () {
        this._root.appendChild(this._createNode(this._state));
    }
}

const app = new App(document.getElementById('root'), store) 
app.renderInterface();
app.render();







