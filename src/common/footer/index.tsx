import { Button } from "@mui/material"
import "./styles.scss";

interface FooterProps {
    name: string;
    onClick: () => void;
}

export const Footer = (props: FooterProps) => {
    return (
        <Button variant='contained' className="contained" onClick={props.onClick}>{props.name}</Button>
    )
}