# Guide to Contributing
*   ### Project's Values
    *   Project value: O-zone's value is to create an efficient social media management platform. Users could create, publish and analyze contents they and others post on various social media accounts. 
*  ### Team Norms
    *   Members should all try their best to work cooperatively for the final workable product. 
    *   Members must join team stand-ups three times a week on Monday, Wednesday, and Saturday at 10 AM EST. (11 PM China time) mandatorily on [Zoom](https://nyu.zoom.us/j/99111537533). The team would clarify each member's tasks for the week on Monday stand-ups and update the Task Board accordingly; Team would also check progress on Wednesday stand-ups and all works assigned on Monday should be expected to be done on Friday.
    *   Definition of Done:
        *   Work should be only considered done when it satisfies agreed user stories and/or tasks. 
        *   Each new feature added should be only considered done after getting peer reviewed and passed tests before merging. 
*   ### the Git Workflow
    *   In the main, before proceeding to do any actual work, members need to first `git pull` from the remote repository to get the latest version of main branch of the project
    *   For each feature, a new branch needs to be created for better modulability through `git branch branch_name` if the branch is not yet created 
    *   After a new branch is created, checkout to the new branch.
    *   Before adding and committing new changes, `git pull origin master/main` again
    *   For each small part of progress completed, e.g. a big function implemented and passed local tests, a new commit should be issued for tracking the change history. 
    *   Commit messages should be meaningful and in format of “Change type: change details”, where the types are "Added", "Update", and "Fix", e.g. "Update: login page half-way done". 
    *   Members should only send pull requests for the changes they push to the remote repository, but always ask for someone else to check the validity of the changes, and merge the pull request only if the changes pass the test. 
    *   Full commands flow:
        *   at main: `git pull`
        *   Create a new branch if needed: `git branch new_branch_name`
        *   Checkout to the new branch: `git checkout new_branch_name`
        *   In the new branch, download any change first: `git pull origin master` 
        *   In the new branch, make changes and save changes. 
        *   For each changes: 
            *   stage the change `git add changed_file_name` 
            *   commit the change `git commit -m "message"`
            *   changes must be separated into separated `add` & `commit`
            *   never `add` & `commit` once for everything, because it will ruin the record
        *   Finally. push all to Github: `git push --set-upstream origin new_branch_name`
        *   Then in the GitHub website, find the branch and check if the branch has commit(s) behind or not. If the branch is not behind, make a pull request and ask for a review and merge. 
*   ### Rule of Contributing
    *   Any change must be committed and pushed to a branch first, and then the contributor must issue a pull request. 
    *   Any pull request must be validated and merged by one of other members, unless time is urgent and the change is purely textual/graphical without any modification on the actual codes. 
    *   Only changes that are merged into the main branch are considered as contributing. 
*   ### Disagreements or Conflicts Resolving
    *   If any major disagreement or conflict arises, a debate/discussion session will be held with the rest of the team members auditing. 
    *   If team still cannot reach an agreement, a vote will be held in team Slack channel for tracking purposes where the product manager in duty has 1.5x weighting. 
*   ### Instruction on Local Development Environment Setup
    *   This project will be developed in an UNIX-like operating system. 
    *   More environment setups to be updated in the future if needed. 
*   ### Instruction on Building and Testing 
    *   Complete function or module given assumed inputs and desired outputs. 
    *   Unit test on function or module upon completion if possible. 
    *   Run entire program if big change on structure or new major feature is completed. 
    *   More testing measures to be updated in the future if needed. 


