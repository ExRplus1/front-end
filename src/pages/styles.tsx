import { css, styled } from "styled-components";

export const OptionContainer = styled.div<{ $selected: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 39px 8px 17px;
    gap: 15px;
    border: 2px solid ${({ $selected }) => $selected === "true" ? "#828282" : "#8282823f"};
  
    width: fit-content;
    border-radius: 16px;
    cursor: pointer;

     
    ${({ $selected }) => $selected === "true" ? (
        css`
            background-color: #D9D9D9;
            color: #070707;
            ${Button} {
                background-color: #D9D9D9;
            }
        `
    ) : null
    }

    &:hover{
        background-color:#8282823f;
    }
`;
export const Button = styled.span`
    width: 39px;
    height: 38px;

    background: #D9D9D9;
    border-radius: 4px;
    font-family: 'Archivo';
    font-style: normal;
    justify-content: center;
    font-weight: 400;
    font-size: 22.7647px;
    line-height: 54px;

    display: flex;
    align-items: center;

    color: #070707;
`;
export const OptionText = styled.span`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 22.7647px;
    line-height: 54px;
    color: #868484;
    text-align: center;
`;

export const DownArrow = styled.span`
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`;


export const UpArrow = styled.span`
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`;

export const ArrowButton = styled.div`
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;

    width: 52px;
    height: 52px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    &:hover{
        background-color:#8282823f;
    }
`;



export const Title = styled.h1`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 500;
    font-size: 18.8116px;
    line-height: 50px;
    color: #DCDCDC;
`;

export const QuestionTitle = styled.h1`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 35px;
    color: #FFFFFF;
`;
