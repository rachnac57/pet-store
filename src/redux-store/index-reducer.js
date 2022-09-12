const initialState = {
    pets: {
        items: [
        ],
        totalCount: 0
    },
    chocolates: {
        items: [{
            name: 'Bonkers',
            tag: 'Jelly sweets',
            id: 1
        }],
        totalCount: 1
    }
}

export function dataStoreReducer(state = initialState, action = {}) {
    let newState = {};
    const {payload = {}} = action;
    const {key, data, totalCount} = payload;
    switch(action.type) {
        case 'getData':
            newState = {
                ...state,
                [key]: {items: [...state[key].items, ...data], totalCount, newData: {} },
            };
            break;
            case 'setData':
                newState = {
                    ...state,
                    // Keeping new record to show newly submitted data spontaneously in the table, without an additional GET call
                    [key]: {items: [...(state[key].items)], totalCount: state[key].totalCount + 1, newData: data}
            };
            break;
        default:
            newState = {...state};
    }
    return newState;
}