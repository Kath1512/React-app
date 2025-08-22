export const initialState = {
    selectedId: 0,
    0: {
        message: 'hello Taylor'
    },
    1: {
        message: 'hello Alice'
    },
    2: {
        message: 'hello Bob'
    }
};

export function messengerReducer(state, action) {
    switch (action.type) {
        case 'changed_selection': {
            return {
                ...state,
                selectedId: action.contactId,
            };
        }
        case 'edited_message': {
            return {
                ...state,
                [state.selectedId]: {
                    message: action.message
                }
            };
        }
        case 'sent_message': {
            return {
                ...state,
                [state.selectedId]: {
                    message: ''
                }
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
