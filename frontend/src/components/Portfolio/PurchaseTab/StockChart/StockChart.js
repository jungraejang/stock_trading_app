import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    flex: "display",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f8bbd0",
    marginTop: "10px"
  },
  greenFont: {
    color: theme.palette.green[700]
  },
  redFont: {
    color: theme.palette.red[700]
  }
}));

export default function StockChart(props) {
  const classes = useStyles();
  const [historicData, setHistoricData] = useState(null);

  let { modalTicker } = props;

  const generateDataObj = historicData => {
    const data = {
      labels: [],
      datasets: [
        {
          label: "",
          fill: false,
          lineTension: 0.1,
          // backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "#e91e63",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#e91e63",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#e91e63",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    };
    console.log("generate historicData", historicData.data);
    if (historicData) {
      for (let item of historicData.data) {
        data.datasets[0].label = `${modalTicker.toUpperCase()} Monthly Price Chart`;
        data.labels.push(item.label);
        data.datasets[0].data.push(item.close);
      }
    }
    return data;
  };

  useEffect(() => {
    const getCurrentPrice = async modalTicker => {
      try {
        let historicData = await axios.get(
          `/market/getHistoricData/${modalTicker}`
        );
        setHistoricData(historicData);
      } catch {}
    };
    getCurrentPrice(modalTicker);
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      {historicData ? <Line data={generateDataObj(historicData)} /> : null}
    </div>
  );
}
