export const useFetchSurvey = () => {
    const fetchedSurvey = require('../stubs/climate-survey.json');
    console.log(fetchedSurvey);
    return { data: fetchedSurvey };
}