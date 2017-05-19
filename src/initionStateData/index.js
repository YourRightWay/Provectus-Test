const initialState = {
    testData: [
        {
            id: 1,
            name: 'Node 1',
            isChecked: true,
            childs: [{
                id: 11,
                name: 'Node 1.1',
                isChecked: true,
            }],
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
            }, {
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
}

export default initialState
