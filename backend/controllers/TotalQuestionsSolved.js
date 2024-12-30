const axios = require('axios');

// Controller to fetch total unique solved problems from Codeforces
async function getSolvedProblems(req, res) {
  const handle = req.params.handle;  // Retrieve user handle from the URL parameters

  try {
    let solvedProblemIds = new Set();
    let contestIndex = 1;  
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=${contestIndex}&count=100`);

      if (response.data.status === 'OK') {
        const submissions = response.data.result;
        
        if (submissions.length === 0) {
          hasNextPage = false;
          break;
        }

        // Loop through the submissions and add problem IDs to the Set (ignoring repeats)
        submissions.forEach(submission => {
          if (submission.verdict === 'OK') {
            solvedProblemIds.add(submission.problem.contestId + submission.problem.index); // Unique problem ID
          }
        });

        // Increase the contestIndex to fetch the next set of submissions
        contestIndex += 100;
      } else {
        throw new Error('Error fetching data from Codeforces API');
      }
    }

    // Return the count of unique solved problems
    res.json({ solvedProblemsCount: solvedProblemIds.size });
  } catch (error) {
    console.error('Error fetching solved problems:', error);
    res.status(500).json({ error: 'Error fetching solved problems' });
  }
}

module.exports = {
  getSolvedProblems
};
