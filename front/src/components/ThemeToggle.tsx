import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { toggleTheme } from "../store/slices/themeSlice";


export default function ThemeToggle(){
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <button onClick={() => dispatch(toggleTheme())}>
            Cambiar a {mode === "light" ? "oscuro" : "claro"}
        </button>
    )
}