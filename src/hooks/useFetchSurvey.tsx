export const useFetchSurvey = () => {
    const fetchedSurvey = require('../stubs/climate-survey.json');
    return { data: fetchedSurvey };
}