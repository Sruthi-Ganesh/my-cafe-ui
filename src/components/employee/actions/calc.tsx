import { CustomCellRendererProps } from "ag-grid-react";

export const DaysCalculatorComponent = (params: CustomCellRendererProps) => {
    let value: number = parseFloat(params.value);

    if (!value) {
        return;
    }

    let day: number = value | 0;
    
    let hourValue = (value - day) * 24;
    let hours = hourValue | 0;

    let minuteValue = (hourValue - hours) * 60;
    let minutes = minuteValue | 0;

    let text = '';

    if (day >= 1) {
        text += day + " days, ";
    } if (hours >= 1) {
        text += hours + " hours, ";
    } 
    text += minutes + " minutes"

    return <div>{text}</div>
}
