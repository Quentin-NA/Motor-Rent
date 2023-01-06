let initialState;

if(sessionStorage.getItem('basket')){
    initialState=JSON.parse(sessionStorage.getItem('basket'));
}
else{
    initialState={ userId : null }
}


const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case "CONNEXION":
            return {
                ...state,
                userId: action.userId
            }
        case "DECONNEXION":
            return {
                ...state,
                userId: null
            }
        default: return state
    }
}

export default reducer;