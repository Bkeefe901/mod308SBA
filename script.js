// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// Final return is an array objects. Each object represents one student(learner id).
// // each object contains:
//              id: number
//              avg: number ( sum of points earned on assignments due)/(sum of total possible points on  assignments due AssignmentGroup[assignments[i]][points_possible])
//              1 (assignment_id): number (score/points_possible)
//              2 (assignment_id): number (score/points_possible)

// function that checks if courseInfo[id] == assignmentGroup[course_id] and throws error if not
function courseIdCheck(CourseInfo, AssignmentGroup){
    try{
        if(CourseInfo['id'] != AssignmentGroup['course_id']){
            throw new Error(`Assignment Group does not match the course ID`);
        }
    } catch(error){
        console.error("Caught an error: ", error.message);
    }

}
courseIdCheck(CourseInfo, AssignmentGroup);


// function that returns array of unique different student ids. 

function studentList(LearnerSubmissions){
    let studentArray = [];
    LearnerSubmissions.forEach(submission => {
        const id = submission['learner_id'];
        if(!studentArray.includes(id)){
            studentArray.push(id)
        }
    });
    return studentArray;

}
let students = studentList(LearnerSubmissions);
console.log(students);

// function that returns the assignments array from AssignmentGroup save to variable assignmentArray

function assignmentList(AssignmentGroup){
    return AssignmentGroup.assignments
}

const assignmentArray = assignmentList(AssignmentGroup);
console.log(assignmentArray)



// function that checks AssignmentGroup[assignments[due_at]] for each assignment and returns array of assignment[id]
//     whose due_at date was before today. save to variable 'relevantAssignments'

function previousAssignments(assignmentArray){
    let relevantAssignments = [];
    assignmentArray.forEach(as => {
        const dueDate = new Date(as.due_at)
        const today = new Date();
        const relevantID = as.id
        if(dueDate < today){
            relevantAssignments.push(relevantID)
        }
    })

    return relevantAssignments

}
 
let assignments = previousAssignments(assignmentArray);
console.log(assignments);

// function that returns total points possible for each assignment id returned from above function. 
//     Save to variable 'totalAssignmentPoints'

function totalScoreValue(assignments, assignmentArray){
    let total = 0;
    assignments.forEach(num => {
        for(let i = 0; i < assignmentArray.length; i++){
            let assignmentX = assignmentArray[i]
            if(num == assignmentX.id){
               total += assignmentX.points_possible
                break;
            }
        }
    });
    return total;

}

let totalScore = totalScoreValue(assignments, assignmentArray);
console.log(totalScore);





/* function that loops through LearnerSubmissions and returns a revisedLearnerSubmission that removes objects assignment_id doesnt match any found in variable 'assignments' */

function updatedLearnerSubmissions(LearnerSubmissions, assignments){
    let revisedLearnerSubmission = [];
    for(let i = 0; i < LearnerSubmissions.length; i++){
        let submission = LearnerSubmissions[i];
        let a = 0;
        while(a < assignments.length){
            if(assignments[a] == submission.assignment_id){
                revisedLearnerSubmission.push(submission);
                break;

            }
            a++;
        }
        
    }
    return revisedLearnerSubmission;
}



let revisedLearnerSubmission = updatedLearnerSubmissions(LearnerSubmissions, assignments);
console.log(revisedLearnerSubmission);

/* function that goes through our newly created revisedLearnerSubmission and checks each object. Checks submitted_at and compares to due at from object in assignmentArray when assignment_id matches id. if submitted_at is greater it will reduce their score by 10% */


/////////* function that checks submitted_at for each due assignment is before due date. if not return learner id and assignment id.*/



// function that returns array with sum of scores for each student from the function that returns student ids, for each
//      assignment id from previously due assignments. Save to variable studentScoreSums.
//      (This function should check the function for late assignments with student and assignment id and take off
//      10% from that assignment score before totaling there scores.)

//      


function getLearnerData(course, ag, submissions) { // loop that returns the object array of students (const result)
    const result = [];
    let personObject = {};
    for(let i = 0; i < submissions; i++)
    

    
 





  return result;
}

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);





// Expected Answer:

//  const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];