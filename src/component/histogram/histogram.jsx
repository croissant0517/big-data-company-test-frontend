import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import "./histogram.css";

ChartJS.register(
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: '110 年人口戶數及性別',
            font: {
                size: 20
            }
        },
        datalabels: {
            display: true,
            color: "black",
            font: {
              size: "16",
            },
        },
    },
    layout: {
        padding: {
            left: 25,
            right: 25,
        }
    },
};

const labels = ['共同生活戶', '獨立生活戶'];

const Histogram = ({ dropDownValue }) => {
    const [ householdData, setHouseholdData ] = useState({
        household_ordinary_m: 0,
        household_ordinary_f: 0,
        household_single_m: 0,
        household_single_f: 0,
    })
    // household_ordinary_m": "共同生活戶_男",
    // household_ordinary_f": "共同生活戶_女",

    // "household_single_m": "單獨生活戶_男",
    // "household_single_f": "單獨生活戶_女"

    useEffect(() => {
        if (dropDownValue) {
            const household_ordinary_m = dropDownValue.items.reduce(
                (accumulator, currentValue) => accumulator + Number(currentValue.household_ordinary_m), 0
            );
            const household_ordinary_f = dropDownValue.items.reduce(
                (accumulator, currentValue) => accumulator + Number(currentValue.household_ordinary_f), 0
            );
            const household_single_m = dropDownValue.items.reduce(
                (accumulator, currentValue) => accumulator + Number(currentValue.household_single_m), 0
            );
            const household_single_f = dropDownValue.items.reduce(
                (accumulator, currentValue) => accumulator + Number(currentValue.household_single_f), 0
            );
            setHouseholdData({
                household_ordinary_m,
                household_ordinary_f,
                household_single_m,
                household_single_f,
            })
        }
    }, [dropDownValue])

    const data = {
        labels,
        datasets: [
            {
                label: '男',
                data:   [ householdData.household_ordinary_m, householdData.household_single_m],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: '女',
                data: [ householdData.household_ordinary_f, householdData.household_single_f ],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className="histogram-container" >
            <Bar options={options} data={data} width={400} height={200} />
        </div>
    )
}

export default Histogram;