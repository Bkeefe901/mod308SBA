# Module 308 SBA Read Me

## Description of the Function and Project
- My project uses several helper functions that basically split the work into manageable chunks. Each function uses the results from previous helper functions to get the desired output:
    - courseIdCheck() Checks if the courseInfo.id matches the assignmentGroup.course_id and throws an error if they don't match.
    - studentList() iterates through LearnerSubmissions and returns an array of the unique individual student ids. 
    - assignmentList() just returns the assignments array from the AssignmentGroup object
    - previousAssignments() checks AssignmentGroup.assignments.due_at for each assignment and returns an array of only the objects for the assignments whose due_at date was before today. Each contains  theid, and date due and the points possible.
    - totalScoreValue() returns the total score for all relevent assignments by adding the points from each object in the array returned by previousAssignments().
    - updatedLearnerSubmissions() loops through LearnerSubmissions and returns a revisedLearnerSubmission that removes objects whose assignment_id doesnt match any found in variable 'assignments' 
    - isItLate() iterates through array returned from updatedLeanerSubmissions() (saved to variable 'revisedSubmissions') and checks the assignment_id against the object's id an object from the array returned by previousAssignments() (saved to variable 'assignments'). If they match it compares the submitted_at date from revisedSubmissions[i].submissions.submitted_at to assignments[i].due_at and if the submitted at date is after the due at date it subtract 10% of the assignments[i].points from revisedSubmissions[i].submissions.score. It creates a new object that looks like the objects in the learnerSubmissions or revisedSubmissions but only shows learner_id, assignment_id, and score(with the corrected score for late projects) it then pushes that object to a new array called adjustedSubmissions.
    - studentGrades() iterates through studentList (saved to student variable) and then compares it to each object in array returned from updatedLeanerSubmissions (saved to variable revisedSubmissions). If the id matches, it adds their  score for that assignment (their points, divided by the score for that assignment for 'assignments') and adds them together for their total points. It returns an object array with student_Id, assignment1: score, assignment2: score, and pointSum.
    - The Final function: getLearnerData() uses all the previous functions within it, taking in CourseInfo, AssignmetnGroup, and LearnerSubmissions as the arguments. As a final step it just loops through the array from the studentGrades() function and it will divide the piontSum by the totalSore value from the totalScoreValue() function and it will create an 'avg' key to save it too, then it will delete the pointSum and push the object to the 'result' array.


## Reflection
- What could you have done differently during the planning stages of your project to make the execution easier?
    - I think I could have broken down the problem a little better. I also realized It's important to work backwards from the final expected outcome and break it up into smaller easier tasks. I also would try to be as detailed as possible with the planning and psuedo-code.
- Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?
    - I think one of the hardest things to implement was including the individual scores for each assignment in the final object array just because depending on how many assignments there are you have to code it to have a variable number of key:value pairs and I learned how to name a variable key in a loop to add to one object but I had to change my plan a little with the order and function of my functions because I realized in writing in a function after creating the variable keys in another that I had no way to (or couldn't find the answer) to call those keys to read or manipulate the values.
- What would you add to, or change about your application if given more time?
    - Given more time I would probably try to simplify the code and maybe use less helper functions by combining tasks from some of the smaller ones into one.
- Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again:
    - I think the most important take away is that planning and the psuedo-code layout before it probably the most important part and makes coding and putting it together so much easier if done well.






