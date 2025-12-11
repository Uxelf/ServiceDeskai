import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect } from "react";



export default function ThemeProvider(){
    const theme = useSelector((state: RootState) => state.theme.mode);

    useEffect(() => {
        const html = document.documentElement;

        if (theme == "dark"){
            html.classList.add("dark");
        }
        else{
            html.classList.remove("dark");
        }
    }, [theme]);

    return null;
}