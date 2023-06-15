import React from 'react'
import { TopBar } from '../components/TopBar'
import { TopContainer } from '../components/TopContainer'
import { Spacer } from './Landing'

export const EndSurvey = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 60,
            padding: "0px 82px",
            paddingTop: 150
        }}>
            <TopContainer
                TopBar={() => <TopBar
                    title={"Complte"}
                    stepText={"Step 4 of 4"} percentage={1} />}
                title={"Success you have completed <Name of Survey>"} description={"You can now claim your <topic><Level> NFT. Click on it to add it to your collection."}
                color="electricUltramarine"
                button={null} />

            <Spacer newSpace={100} />
        </div>

    )
}

