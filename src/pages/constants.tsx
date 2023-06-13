import styled from 'styled-components';

const Svg = styled.div`
    background-color: red;
    width: 209.76px;
    height: 300.61px;
`;
interface IExp {
    // SAD for this any :(
    Svg: any,
    title: string,
    description: string
}
export const explainers: Array<IExp> = [
    {
        Svg: Svg,
        title: "Transparency\n+Trust",
        description: "A decentralized platform guarantees secure and transparent data, fostering confidence in the survey process."
    },
    {
        Svg: Svg,
        title: "User\nIncentivization",
        description: "Creators data encrypted NFT’s as incentives, motivating participants to provide valuable feedback."
    },
    {
        Svg: Svg,
        title: "Data\nSecurity",
        description: "Using blockchain technology, the platform ensures the security and privacy of survey data, giving creators peace of mind."
    },
    {
        Svg: Svg,
        title: "Blockchain\nTraceability",
        description: "Ensures data integrity, accountability, compliance, and reproducibility, bolstering the trustworthiness and transparency of survey data."
    }
]