let store = [
    {
        id: 1,
        name: 'Node 1',
        isChecked: false,
        childs: [{
            id: 11,
            name: 'Node 1.1',
            isChecked: true,
        }]
    },
    {
        id: 2,
        name: 'Node 2',
        isChecked: false,
        childs: [{
            id: 21,
            name: 'Node 2.1',
            isChecked: true,
            childs: [{
                id: 211,
                name: 'Node 2.1.1',
                isChecked: true,
            }]
        },{
            id: 22,
            name: 'Node 2.2',
            isChecked: true,
            childs: [{
                id: 221,
                name: 'Node 2.2.1',
                isChecked: true,
            }]
        }]
    }
]

let oneNode = {
    id: 11123,
    name: 'Node 1.1.2.2',
    isChecked: true,
};

/** @jsx createElem */

function createElem(type, props, ...children) {
    return { type, props, children };
}

const navPanel = (
    <div class="nav-panel">
        <button id="js-get-data">Get data</button>
        <button id="js-update-data">Update data</button>
        <button id="js-update-node">Update node</button>
    </div>
);


// const store = (
//     <form class="form-panel">
//         <div class="form-group">
//             <label htmlFor="">Node 1</label>
//             <input type="checkbox" id="1" name='Node 1' checked={false} />
//            
//             <div class="form-group">
//                 <label htmlFor="">Node 1.1</label>
//                 <input type="checkbox" id="1.1" name='Node 1.1' checked={true} />
//             </div>
//         </div>
//
//         <div class="form-group">
//             <label htmlFor="">Node 2</label>
//             <input type="checkbox" id="2" name='Node 2' checked={false} />
//
//             <div class="form-group">
//                 <label htmlFor="">Node 2.1</label>
//                 <input type="checkbox" id="2.1" name='Node 2.1' checked={true} />
//
//                 <div class="form-group">
//                     <input type="checkbox" id="2.1.1" name='Node 2.1.1' checked={false} />
//                 </div>
//
//                 <div class="form-group">
//                     <input type="checkbox" id="2.1.2" name='Node 2.1.2' checked={true} />
//                 </div>
//             </div>
//
//             <div class="form-group">
//                 <input type="checkbox" id="2.2" name='Node 2.2' checked={true} />
//
//                 <div class="form-group">
//                     <input type="checkbox" id="2.2.1" name='Node 2.2.1' checked={false} />
//                 </div>
//
//                 <div class="form-group">
//                     <input type="checkbox" id="2.2.2" name='Node 2.2.2' checked={true} />
//                 </div>
//             </div>
//         </div>
//     </form>
// );


function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    if(node.props.id) {
        $el.id = node.props.id;
    }
    
    // if(node.type === 'input') {
    //     $el.type = node.props.type;
    //     $el.name = node.props.name;
    //     $el.checked = node.props.checked;
    //
    //     console.log($el)
    //    
    //     $el.addEventListener('change', (e) => {
    //         console.log(e.target.id)
    //     });
    // }
    
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

// function changed(node1, node2) {
//     return typeof node1 !== typeof node2 ||
//         typeof node1 === 'string' && node1 !== node2 ||
//         node1.type !== node2.type
// }

// function updateElement($parent, newNode, oldNode, index = 0) {
//
//     console.log(oldNode)
//    
//     if (!oldNode) {
//         $parent.appendChild(
//             createElement(newNode)
//         );
//     } else if (!newNode) {
//         $parent.removeChild(
//             $parent.childNodes[index]
//         );
//     } else if (changed(newNode, oldNode)) {
//         $parent.replaceChild(
//             createElement(newNode),
//             $parent.childNodes[index]
//         );
//     } else if (newNode.type) {
//         const newLength = newNode.children.length;
//         const oldLength = oldNode.children.length;
//         for (let i = 0; i < newLength || i < oldLength; i++) {
//             updateElement(
//                 $parent.childNodes[index],
//                 newNode.children[i],
//                 oldNode.children[i],
//                 i
//             );
//         }
//     }
// }

class App {
    constructor(root, state) {
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
        
        let trigger = false;

        function parseState(state) {
            for(let i = 0; i < state.length; i++) {
                if(state[i].id === id) {
                    trigger = true;
                    state[i] = node;
                    break
                } else {
                    if(state[i].hasOwnProperty('childs') && state[i].childs.length > 0) {
                        parseState(state[i].childs)
                        if(trigger) {
                            break 
                        }
                    }
                }
            }
        }
        
        parseState(this._state)
    }

    renderInterface() {
        const $root = document.getElementById('root');
        $root.appendChild(createElement(navPanel));

        const getData = document.getElementById('js-get-data');
        const update = document.getElementById('js-update-data');
        const updateNode = document.getElementById('js-update-node');

        getData.addEventListener('click', () => {
            app.getData
        });

        update.addEventListener('click', () => {
            app.update(store)
        });

        updateNode.addEventListener('click', () => {
            app.updateNode(221, oneNode);
        });
    }

    render () {
        function renderState(state) {
            for(let i = 0; i < state.length; i++) {
                const $el = document.createElement('div');
                
                const $root = document.getElementById('root');
                $root.appendChild($el);
            }
        }

        renderState(this._state)
    }
}

const app = new App(document.getElementById('root'), store) 
app.renderInterface();
app.render();






