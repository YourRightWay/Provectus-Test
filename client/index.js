import navPanel from './templates/nav'

/** @jsx createElem */

function createElem( type, props, ...children) {
    return { type, props, children };
}

const oneNode = (
    <div id="1233123" class="form-group form-group--test">
        <label>Node was updated</label>
        <input type="checkbox" id="212312" name='Node 1.2.3.3' checked={false} />
    </div>
)


const store = (
    <form id="20" class="form-panel">
        <div class="form-group" id="1">
            <label htmlFor="">Node 1</label>
            <input type="checkbox" id="input1" name='Node 1' checked={false} />
           
            <div class="form-group" id="11">
                <label htmlFor="">Node 1.1</label>
                <input type="checkbox" id="input11" name='Node 1.1' checked={true} />

                <div class="form-group" id="111">
                    <label htmlFor="">Node 1.1</label>
                    <input type="checkbox" id="input111"  name='Node 1.1' checked={true} />

                    <div class="form-group" id="1111">
                        <label htmlFor="">Node 1.1.1</label>
                        <input type="checkbox" id="input1111"  name='Node 1.1.1' checked={true} />
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group" id="2">
            <label htmlFor="">Node 2</label>
            <input type="checkbox" id="input2" name='Node 2' checked={false} />
        </div>

        <div class="form-group" id="3">
            <label htmlFor="">Node 3</label>
            <input type="checkbox" id="input3" name='Node 3' checked={true} />

            <div class="form-group" id="31">
                <label htmlFor="">Node 3.1</label>
                <input type="checkbox" id="input31" name='Node 3.1' checked={false} />
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
        
        if (node.props !== null && node.props.id) {
            $el.id = node.props.id;
        }
        
        if(node.type === 'div') {
            $el.className = node.props.class;
        }

        if (node.type === 'input') {
            $el.type = node.props.type;
            $el.name = node.props.name;
            $el.checked = node.props.checked;
            
            $el.addEventListener('change', (e) => {
                node.props.checked = e.target.checked
                this.updateNode(e.target.id, node);
            });
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
        if(!(typeof node === 'object')) throw new Error('Node must be an object');
        let trigger = false;
        
        function parseState (state) {
            if(state.props !== null && state.props.id &&  state.props.id === id+'') {
                state = node;
            } else {
                for (var i = 0; i < state.children.length; i++) {
                    if (state.children[i].type) {
                        if (state.children[i].props !== null && state.children[i].props.id && state.children[i].props.id === id+'') {
                            trigger = true;
                            state.children[i] = node;
                            break
                        } else {
                            parseState(state.children[i])
                            if (trigger) {
                                break
                            }
                        }
                    }
                } 
            }
            
            return state
        }
        
        this._updateNode(this._root, parseState((JSON.parse(JSON.stringify(this._state)))), this._state, 1);
        parseState(this._state)
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
            this.updateNode(1111, oneNode);
        });
    }

    render () {
        this._root.appendChild(this._createNode(this._state));
    }
}

const app = new App(document.getElementById('root'), store) 
app.renderInterface();
app.render();









