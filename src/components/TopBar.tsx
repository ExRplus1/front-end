import styled from 'styled-components'

export const Text = styled.h1`
font-family: 'Archivo';
font-style: normal;
font-weight: 500;
font-size: 18.8116px;
line-height: 28px;
/* identical to box height, or 150% */

display: flex;
align-items: center;

color: #DCDCDC;
`;

const ProgressBarInner = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
position: absolute;
  left: 0px;
  height: 100%;
  top: 0px;
  background: #000000;

  border-radius: 17.6359px;
`;

const ProgressBarOuter = styled.div`
position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: #C4C4C4;
  border-radius: 17.6359px;
`;

export const TopBar = ({ title, stepText, percentage }: {
  title: string,
  stepText: string,
  percentage: number
}) => {
  return <div>
    <div style={{
      display: "flex",
      justifyContent: "space-between"
    }}>
      <Text>
        {title}
      </Text>
      <Text>
        {stepText}
      </Text>
    </div>
    <div style={{
      width: "100%",
      height: 18,
      position: "relative",
      marginTop: 20,
      marginBottom:64,
    }}>
      {/* progressbar */}
      <ProgressBarOuter />
      <ProgressBarInner width={percentage * 100} />
    </div>

  </div>
}