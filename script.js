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



// function that checks if courseInfo[id] == assignmentGroup[course_id] and throws error if not

function courseIdCheck(CourseInfo, AssignmentGroup) {
  try {
    if (CourseInfo['id'] != AssignmentGroup['course_id']) {
      throw new Error(`Assignment Group does not match the course ID`);
    }
  } catch (error) {
    console.error("Caught an error: ", error.message);
  }

}
courseIdCheck(CourseInfo, AssignmentGroup);


// function that returns array of unique different student ids. 

function studentList(LearnerSubmissions) {
  let studentArray = [];
  LearnerSubmissions.forEach(submission => {
    const id = submission['learner_id'];
    if (!studentArray.includes(id)) {
      studentArray.push(id)
    }
  });
  return studentArray;

}
let students = studentList(LearnerSubmissions);
console.log(students);




// function that returns the assignments array from AssignmentGroup save to variable assignmentArray

function assignmentList(AssignmentGroup) {
  return AssignmentGroup.assignments
}

// const assignmentArray = assignmentList(AssignmentGroup);
// console.log(assignmentArray)






// function that checks AssignmentGroup[assignments[due_at]] for each assignment and returns  an array of objects containing assignment[id], and date due only for the assignments whose due_at date was before today. save to variable 'relevantAssignments'

function previousAssignments(assignmentArray) {
  let relevantAssignments = [];

  assignmentArray.forEach(as => {
    let assignmentObject = {};
    const dueDate = new Date(as.due_at)
    const today = new Date();
    if (dueDate < today) {
      assignmentObject.id = as.id
      assignmentObject.due_at = as.due_at
      assignmentObject.points = as.points_possible
      relevantAssignments.push(assignmentObject);
    }
  })

  return relevantAssignments

}

// let assignments = previousAssignments(assignmentArray);
// console.log(`This is the relevent assignments: `, assignments);

// function that returns total points possible for each assignment id returned from above function. 
//     Save to variable 'totalAssignmentPoints'

function totalScoreValue(assignments, assignmentArray) {
  let total = 0;
  assignments.forEach(num => {
    for (let i = 0; i < assignmentArray.length; i++) {
      let assignmentX = assignmentArray[i]
      if (num.id == assignmentX.id) {
        total += assignmentX.points_possible
        break;
      }
    }
  });
  return total;

}

// let totalScore = totalScoreValue(assignments, assignmentArray);
// console.log(`This is the total possible score for all assignments: ${totalScore}`);





// function that loops through LearnerSubmissions and returns a revisedLearnerSubmission that removes objects assignment_id doesnt match any found in variable 'assignments' 

function updatedLearnerSubmissions(LearnerSubmissions, assignments) {
  let revisedLearnerSubmission = [];
  for (let i = 0; i < LearnerSubmissions.length; i++) {
    let submission = LearnerSubmissions[i];
    let a = 0;
    while (a < assignments.length) {
      let obj = assignments[a];
      if (obj.id == submission.assignment_id) {
        revisedLearnerSubmission.push(submission);
        break;

      }
      a++;
    }

  }
  return revisedLearnerSubmission;
}



// let revisedSubmissions = updatedLearnerSubmissions(LearnerSubmissions, assignments);
// console.log(revisedSubmissions);


// function that iterates through revisedSubmissions and checks the assignment_id against the objects id in releventAssignments if they match it compares the submitted_at date from revisedSubmissions[i].submissions.submitted_at to releventAssignments[i].due_at and if the submitted at date is after the due at date it subtract 10% of the releventAssignments[i].points from revisedSubmissions[i].submissions.score. It creates a new object that looks like the objects in the learnerSubmissions or revisedSubmissions but only shows learner_id, assignment_id, and score(with the corrected score for late projects) it then pushes that object to a new array called adjustedSubmissions.

function isItLate(revisedSubmissions, relevantAssignments){
  let adjustedSubmissions = [];
  for(let i = 0; i < revisedSubmissions.length; i++){
    relevantAssignments.forEach(as => {
      let revisedObject = {};
      if(revisedSubmissions[i].assignment_id == as.id){ 
        const dueDate = new Date(as.due_at);
        const subDate = new Date(revisedSubmissions[i].submission.submitted_at);
        //console.log(`this is the dueDate: `, dueDate); // test
        //console.log(`this is the subDate: `, subDate); // test
        revisedObject.learner_id = revisedSubmissions[i].learner_id;
        revisedObject.assignment_id = revisedSubmissions[i].assignment_id
        if(dueDate < subDate){
          revisedObject.score = revisedSubmissions[i].submission.score - (as.points * 0.1);
          adjustedSubmissions.push(revisedObject);
        } else{
          revisedObject.score = revisedSubmissions[i].submission.score 
          adjustedSubmissions.push(revisedObject);
        }

      }
    }); 
  }
  return adjustedSubmissions;
}

// console.log(`This is the adjusted Learner Submissions`);
// console.log(isItLate(revisedSubmissions, assignments));
// let adjustedSubmissionsArray = isItLate(revisedSubmissions, assignments);





// function that iterates through studentList (saved to student variable) and then compares it to each object in revisedLearnerSubmission. If the id matches, it adds their  score for that assignment (their points, divided by the score for that assignment for 'assignments') and adds them together for their total points. It returns an object array with student_Id, assignment1: score, assignment2: score, and pointSum.






function studentGrades(students, adjustedSubmissionsArray, assignments) {
  let gradesArray = [];
  students.forEach(student => {
    let pointSum = 0;
    let studentObject = {};
    studentObject.id = student
    for(let i = 0; i < adjustedSubmissionsArray.length; i++){
      if(student == adjustedSubmissionsArray[i].learner_id){
        assignments.forEach(as => {
          if(as.id == adjustedSubmissionsArray[i].assignment_id){
            let x = adjustedSubmissionsArray[i].assignment_id
            studentObject[x] = parseFloat((adjustedSubmissionsArray[i].score / as.points).toFixed(3));            
            pointSum += adjustedSubmissionsArray[i].score;

          }

        })
        
      }
      if(i == adjustedSubmissionsArray.length - 1){
        studentObject.pointSum = pointSum;
      }

    }
    gradesArray.push(studentObject);
  })
  return gradesArray;

}

// let studentGradesArray = studentGrades(students, adjustedSubmissionsArray, assignments);
// console.log(studentGradesArray);







// The main function will use course, ag and submissions as parameters(we will plug in CourseInfo, AssignmentGroup and LearnerSumbissions for the result variable and console log that). Inside it will use the helper functions I created, each relying on one or more of the previous. It will have one forEach loop that will take the array from the studentGrades() function and it will divide the piontSum by the totalSore value from the totalScoreValue() function and it will create an avg key to save it too, then it will delete the pointSum and push the object to 'result' array.





function getLearnerData(course, ag, submissions) { 
  courseIdCheck(course, ag);
  studentList(submissions);
  const assignmentArray = assignmentList(ag);
  const assignments = previousAssignments(assignmentArray);
  const totalScore = totalScoreValue(assignments, assignmentArray);
  const revisedSubmissions = updatedLearnerSubmissions(submissions, assignments);
  const adjustedSubmissionsArray = isItLate(revisedSubmissions, assignments);
  let studentGradesArray = studentGrades(students, adjustedSubmissionsArray, assignments);
  let result = [];

  studentGradesArray.forEach(student => {
      student.avg = student.pointSum / totalScore;
      delete student.pointSum;
      result.push(student);

  })




  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);






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