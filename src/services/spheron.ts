import { upload } from "@spheron/browser-upload";

const createFile = (obj: Object) => {
    // Convert object to JSON string
    const json = JSON.stringify(obj);

    // Create Blob from JSON string with MIME type of JSON
    const blob = new Blob([json], { type: "application/json" });

    // Create File from Blob with a filename
    const file = new File([blob], "metadata.json", {
        type: "application/json",
    });

    return file;
};

const SE_URL = `${process.env.REACT_APP_API_URL}/initiate-upload`;

export const handleSpheron = async () => {
    const name = "Leonard";

    const metadata = {
        name,
        description: "acest barbat chipes si atragator",
    }

    try {
        const responseMeta = await fetch(`${SE_URL}/${name}-meta`);
        const responseMetaJson = await responseMeta.json();
        const uploadMetaResult = await upload([createFile(metadata)], {
            token: responseMetaJson.uploadToken,
        });
        console.log(uploadMetaResult);
        console.log(`https://${uploadMetaResult.dynamicLinks[0]}/metadata.json`);
    } catch (err) {
        console.log(err);
    } finally {
    }
};