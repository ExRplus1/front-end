import { styled } from "styled-components";
import { ConnectWallet, Text } from "../styles"
import { useMemo, useState } from "react";
import { Radial } from "../components/graphs/Radial";
import { HeatMap } from "../components/graphs/SurveyActivation";

const Actions = styled.div`
display: grid;
gap: 20px;
${ConnectWallet} {
  height: 50px;
}
`;

export const SurveysResponsesGraph = () => {
  const GraphMapping = useMemo(() => ({
    Radial: () => <Radial width={500} height={500} />,
    "Heat Map": () => <HeatMap width={500} height={500} />
  }), []);

  const [selectedGraph, setSelectedGraph] = useState(Object.keys(GraphMapping)[0]);

  const Graph = useMemo(() => GraphMapping[selectedGraph as keyof typeof GraphMapping], [GraphMapping, selectedGraph])


  return (
    <div style={{
      display: "grid",
      placeItems: "center",
      gridTemplateColumns: "400px 1.5fr"
    }}>
      <Actions>
        {Object.keys(GraphMapping).map((key) =>
          <ConnectWallet 
          key={key}
          type="white" onClick={() => {
            setSelectedGraph(key)
          }}>
            <Text>
              {key}
            </Text>
          </ConnectWallet>
        )}
      </Actions>
      <Graph />
    </div>
  )
}
