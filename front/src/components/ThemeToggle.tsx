import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { toggleTheme } from "../store/slices/themeSlice";
import Button from "./Button";


export default function ThemeToggle(){
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
            <Button onClick={() => dispatch(toggleTheme())}>
                Change theme to {mode === "light" ? "Dark" : "Light"}
            </Button>
    )
}