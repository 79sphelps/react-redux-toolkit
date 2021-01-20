import { createSlice } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        tutorials: [],
        currentTutorial: null,
        searchTitle: '',
        currentIndex: -1,
        message: '',
        submitted: false,
    },
    reducers: {
        addTutorial: (state, action) => {
            state.tutorials.concat(action.payload);
        },
        updateTutorial: (state, action) => {
            const idx = state.tutorials.findIndex(t => t.id === action.payload.id);
            state.tutorials[idx] = action.payload.tutorial;
        },
        getTutorials: state => {
            return state.tutorials;
        },
        setTutorials: (state, action) => {
            state.tutorials = action.payload;
        },
        getTutorial: (state, action) => {
            return state.tutorials.filter(t => t.id = action.payload);
        },
        deleteTutorial: (state, action) => {
            state.tutorials = state.tutorials.filter(t => t.id !== action.payload.id);
        },
        getCurrentTutorial: state => { return state.currentTutorial },
        setCurrentTutorial: (state, action) => { state.currentTutorial = action.payload; },
        getSearchTitle: state => { return state.searchTitle },
        setSearchTitle: (state, action) => { state.searchTitle = action.payload },
        getCurrentIndex: state => { return state.currentIndex },
        setCurrentIndex: (state, action) => { state.currentIndex = action.payload },
        setMessage: (state, action) => { state.message = action.payload },
        getMessage: state => { return state.message },
        getSubmitted: state => { return state.submitted },
        setSubmitted: (state, action) => { state.submitted = action.payload },
    },
});

export const {
    addTutorial,
    updateTutorial,
    getTutorials,
    setTutorials,
    getTutorial,
    getCurrentTutorial,
    setCurrentTutorial,
    deleteTutorial,
    getSearchTitle,
    setSearchTitle,
    getCurrentIndex,
    setCurrentIndex,
    getMessage,
    setMessage,
    getSubmitted,
    setSubmitted,
} = storeSlice.actions;

export const selectTutorials = state => state.store.tutorials;
export const selectCurrentTutorial = state => state.store.currentTutorial;
export const selectSearchTitle = state => state.store.searchTitle;
export const selectCurrentIndex = state => state.store.currentIndex;
export const selectMessage = state => state.store.message;
export const selectSubmitted = state => state.store.submitted;

export default storeSlice.reducer;
