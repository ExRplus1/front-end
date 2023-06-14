import { upload } from "@spheron/browser-upload";
import survey from "../stubs/climate-survey.json";

const createFile = (obj: Object) => {
  const json = JSON.stringify(obj);
  const blob = new Blob([json], { type: "application/json" });
  const file = new File([blob], "survey.json", {
    type: "application/json",
  });

  return file;
};

export const handleSpheron = async () => {
  const SE_URL = `${process.env.REACT_APP_API_URL}/initiate-upload`;

  const name = "climate-change";
  const blobSurvey = createFile(survey);

    try {
        const responseMeta = await fetch(`${SE_URL}/${name}-survey`);
        const responseMetaJson = await responseMeta.json();
        const uploadMetaResult = await upload([blobSurvey], {
            token: responseMetaJson.uploadToken,
        });
        console.log(uploadMetaResult, `https://${uploadMetaResult.dynamicLinks[0]}/survey.json`);
    } catch (err) {
        console.log(err);
    } finally {
    }
};
