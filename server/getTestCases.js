const {testCases} = require ("./models/testCases");

async function getTestCases(id){
    try {
        const TestCases = await testCases.findOne({_id:id});
        return TestCases
      } catch (e) {
        console.log(e,"Error getting test cases");
        return "Unable to fetch cases";
      }
}

module.exports={getTestCases}