import { styled } from 'styled-components'
import { TopContainer } from '../components/TopContainer'
import { CreateSurvey } from './CreateSurvey'
import { useNavigate } from 'react-router-dom'
import { Text } from "../styles"
import { colors } from '../constants/colors';
import { useEffect, useState } from 'react'


const StyledForm = styled.form`
    input {
        display: none;
    }
    label {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px 24px;
        svg {
            color: ${colors.white_border};;
        }

        height: 100%;
        /* White */

        border-radius: 16px;
        &:hover {
            background-color: ${colors.white_border};
            ${Text} {
            color: ${colors.blackMetal};
            }
            svg {
            color: ${colors.blackMetal};;
            }
        }


        background-color: ${colors.blackMetal};
        border: 1px solid ${colors.blackMetal};
        ${Text} {
            color: ${colors.white};
        }
    }
`;

export const UploadJson = () => {
    const navigator = useNavigate();
    const [files, setFiles] = useState<ArrayBuffer | string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = ee => {
            if (!ee?.target?.result) return;
            console.log("e.target.result", ee.target.result);
            try {
                setFiles(JSON.parse(ee.target.result as string));
            } catch (e) {
                alert("Invalid JSON file");
            }   
        };
    };
    useEffect(() => {
        console.log(files);
    }, [files]);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 120,
            padding: "0px 82px",
            paddingTop: 150
        }}>
            <TopContainer
                title={"Upload Json + Preview"}
                description={"You need to upload your questions in a JSON format"}
                color="yellowGreen"
                textColor="northSeaBlue"
                descriptionColor="sheetBlue"
                ButtonComponent={() => {
                    return <>
                        <StyledForm>
                            <input
                                type="file"
                                accept="application/JSON"
                                id="inputFile"
                                name="filename"
                                onChange={handleChange}
                            />
                            <label htmlFor="inputFile">
                                <Text>Upload JSON</Text>
                            </label>
                        </StyledForm>
                    </>

                }} />

        </div>
    )
}
