const {Submission} = require('../models/submissions');
const {problemModel} = require('../models/problems');

const getAnalytics = async (req, res) => {
    const { email } = req.params;
    console.log(email);
    try {
        const submissions = await Submission.find({ 
            User_email: email,
            Verdict: 'AC'
        });
        
        if (!submissions.length) {
            return res.status(200).json({ message: 'No submissions found', analytics: {} });
        }

        const problemIds = submissions.map(submission => submission.Problem_id);

        const problems = await problemModel.find({ _id: { $in: problemIds } });
        const totalEasyProblems = await problemModel.find({
            problemDifficulty: 'Easy'
        });
        const totalMediumProblems = await problemModel.find({
            problemDifficulty: 'Medium'
        });
        const totalHardProblems = await problemModel.find({
            problemDifficulty: 'Hard'
        });

        const analytics = {
            totalQuestions: (totalEasyProblems.length + totalMediumProblems.length + totalHardProblems.length),
            solvedQuestions: submissions.length,
            easy: { total: totalEasyProblems.length, solved: 0 },
            medium: { total: totalMediumProblems.length, solved: 0 },
            hard: { total: totalHardProblems.length, solved: 0 }
        };

        submissions.forEach(submission => {
            const problem = problems.find(p => p._id.toString() === submission.Problem_id.toString());
            if (problem) {
                const difficulty = problem.problemDifficulty.toLowerCase();
                if (difficulty in analytics) {
                    analytics[difficulty].solved += 1;
                }
            }
        });

        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in getAnalytics controller: ", error.message);
    }
};

module.exports = { getAnalytics };