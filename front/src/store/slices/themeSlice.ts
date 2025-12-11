import { createSlice } from "@reduxjs/toolkit";


interface ThemeState {
    mode: "light" | "dark";
}

const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

const initialState: ThemeState = {
    mode: savedTheme || "dark",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.mode);
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem("theme", state.mode);
        }
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;