import navPanel from './templates/nav' 
import store from './templates/store' 
import oneNode from './templates/node' 
import updateState from './templates/update' 
import { cloneObject } from './utils'

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
            if (node.props !== null && node.props.id) {
                $el.className = `${node.props.class} ${node.props.class}-${node.props.id}`;
            } else {
                $el.className = node.props.class;
            }
        }

        if (node.type === 'label') {
            if(node.props !== null && node.props.htmlFor) {
                $el.setAttribute("for", node.props.htmlFor);
            }
        }

        if (node.type === 'input') {
            $el.type = node.props.type;
            $el.name = node.props.name;
            $el.checked = node.props.checked;
            
            $el.addEventListener('change', (e) => {
                node.props.checked = e.target.checked
                this.updateNode(e.target.id, node);
                localStorage.setItem('_data', JSON.stringify(this.getData));
            });
        }

        node.children.map(this._createNode).forEach($el.appendChild.bind($el));
        return $el;
    }

    _updateNode = ($parent, newNode, oldNode, index) => {
        console.log($parent.childNodes[index])

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
        let ls = JSON.parse(localStorage.getItem('_data'));

        if(ls && ls !== null) {
            this._state = ls;
        } else {
            this._state = state;
            //localStorage.setItem('_data', JSON.stringify(state));
        }
        
        this._root = root;
    }
    
    get getData () { 
        console.log(this._state)
        return this._state;
    }
    
    update (value) {
        console.log(this._state)
        this._updateNode(this._root, value, this._state, 1);
        //localStorage.setItem('_data', JSON.stringify(value));
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

        //localStorage.setItem('_data', JSON.stringify(parseState((cloneObject(this._state)))));
        this._updateNode(this._root, JSON.parse(localStorage.getItem('_data')), this._state, 1);
    }

    renderInterface() {
        this._root.appendChild(this._createNode(navPanel));

        document.getElementById('js-get-data').addEventListener('click', () => {
            this.getData
        });

        document.getElementById('js-update-data').addEventListener('click', () => {
            this.update(updateState)
        });

        document.getElementById('js-update-node').addEventListener('click', () => {
            this.updateNode(3, oneNode);
        });
    }

    render () {
        this._root.appendChild(this._createNode(this._state));
    }
}

const app = new App(document.getElementById('root'), store) 
app.renderInterface();
app.render();









