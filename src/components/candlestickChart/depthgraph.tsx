import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { TPairInfo, TTick } from "@/lib/types";
import { useUtilContext } from '@/hooks';
interface props {
    tickData: TTick[]
}

const MarketDepthChart = ({ tickData }: props) => {
    const [options, setOptions] = useState<any>()
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default MarketDepthChart;
