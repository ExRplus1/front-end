# Hooks that we need 

type Survey = {
 id: string,
 completed: boolean,
 description:string,
 name: string,
 authId: string,
 questions: Array<Question>,
 endDate: Date,
 startDate: Date,
 maxNumberOfVoters: number,
};

type Question = {
  id: number,// step count la a cata intrebare esti
  questionText: string,
  questionType: "optionScale" | "singleOption" | "statement" | "multipleOption", 
  options: Array<{id: number, text: string}> | null, // statement does not have an answer,
}


type Answers = {
  surveyId: string,
  questionId: number, // step la care sunt
  answers: Array<number> | null // null when it s a statement
}


this means that in blockchain we keep:

authorWalletId => survey id // Write this when we finish creating the survey
clientWalletId =>  hashOfTheAnswersArrayAndSurveyId // Write this when the client finishes responding to a specific survey
       // This is going to be the NFT id ^


1. hook upload survey -> 
    a) send info to ipfs / spheron
    b) calculate hash in the hedera network
    c) write into the contract -> survey id; ipfs link; admin/creator id
         I. if it is simple check if you can upload just CSVs/JSONs

2. hook to upload survey answer
   a) send answers to spheron
   b) calculate hash




NEXT steps: 
// CR on the surveys for now we can not update or delete
// Publish and save are the same stuff
TB  -> write the smart contract
Leo -> wite the hooks to upload the data 
    -> write one hook to get all the survey ids; than using that you get the info about the survey from and info; you get the survey ids from the contract; the survey info from spheron
    -> interaction with spehron shall be contained
 .  -> Create node script that will upload the csv to Spheron dictly




https://github.com/rekpero/fvm-nft-minter-demo/blob/main/frontend/src/components/card.js

