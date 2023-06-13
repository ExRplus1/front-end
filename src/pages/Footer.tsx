import React from 'react'
import styled, { css } from 'styled-components';
import { colors } from '../constants/colors';
import { ConnectWallet, Text } from '../styles';
const SignUp = styled.span`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 22px;
    display: flex;
    align-items: center;

    color: ${colors.doctor};
`

const menu = [
    {
        "about": ["Team", "Partners", "Journey", "Roadmap"]
    }, {
        "Contact": ["General Inquiry"]
    }
];
const BottomMenu = styled.div`
h1 {
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    /* or 130% */

    display: flex;
    align-items: center;
    letter-spacing: 2px;
    text-transform: uppercase;

    color: #F9F9F9;
    margin-bottom: 23px;

}

h2 {
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    /* or 130% */
    margin-bottom: 12px;

    display: flex;
    align-items: center;

    color: #B8B8B8;

}
    display: flex;
    gap: 90px;
    grid-template-columns: repeat(auto, 1fr) ;
`;
export const Footer = () => {
    return (
        <div style={{
            height: "500px",
            paddingLeft: 60
        }}>
            <div style={{
                display: "flex",
                gap: 20,
                height: 35
            }}>
                <SignUp>
                    Sign up for the newsletter
                </SignUp>
                <ConnectWallet type='white' style={{ padding: "0px 75px", opacity: 0.2 }}>
                    <Text>
                        Sign Up
                    </Text>
                </ConnectWallet>
            </div>
            <hr style={{ margin: 0, opacity: 0.2, marginTop: 30, marginBottom: 30, width: "50%" }} />
            <BottomMenu>
                {menu.map(item => {
                    if (!item) return null;
                    return <div>
                        <h1>
                            {Object.keys(item)[0]}
                        </h1>
                        {item[Object.keys(item)[0] as keyof typeof item]?.map(subMenu => <h2>
                            {subMenu}
                        </h2>
                        )}
                    </div>
                })}
            </BottomMenu>
        </div>
    )
}
