# Module 308 SBA Read Me

## Description of the Function and Project
- My project uses several helper functions that basically split the work into manageable chunks. Each function uses the results from previous helper functions to get the desired output:
    - courseIdCheck() Checks if the courseInfo.id matches the assignmentGroup.course_id and throws an error if they don't match.
    - studentList() iterates through LearnerSubmissions and returns an array of the unique individual student ids. 
    - assignmentList() just returns the assignments array from the AssignmentGroup object
    - previousAssignments() checks AssignmentGroup.assignments.due_at for each assignment and returns an array of only the objects for the assignments whose due_at date was before today. Each contains  theid, and date due and the points possible.
    - totalScoreValue() returns the total score for all relevent assignments by adding the points from each object in the array returned by previousAssignments()
    