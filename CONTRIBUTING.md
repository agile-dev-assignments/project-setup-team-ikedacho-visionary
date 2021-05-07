# Guide to Contributing

## Instruction on Building and Testing Locally

- Follow instructions in [README.md in back-end directory](https://github.com/agile-dev-assignments/project-setup-team-ikedacho-visionary/blob/121bd042fc56a877568f33acd2928b3f521d41a5/back-end/README.md) to build and test our project locally.
### Instruction on Local Development Environment Setup

You need to add the .env file that we send to you in #team-ikedacho-visionary channel in Slack to `back-end` directory to run our project. 

## Instruction on Testing the Feature that Connecting Instagram/Twitter/Twitter Account to O-Zone Account
#### 1. To Successfully Connect Your Instagram Account to O-Zone Account

O-Zone uses Instagram Basic Display API to fetch your post data from your Instagram account.

-   You must test this feature in our website hosting online of domain "ozonewebapp": [https://ozonewebapp.com/](https://ozonewebapp.com/). You cannot test it locally on your machine with the server running on localhost.

-   According to the policy of Instagram Basic Display API, before Instagram approves our [App Review request](https://developers.facebook.com/docs/app-review/introduction), only Instagram account that is added as Instagram Testers of our app can use Instagram API in our app.

![instruction](./instruction.png)

So please give us your Instagram username in slack, and we will add you to Instagram Testers.

After we add you to Instagram Testers, we will notify you and you can test our connecting to Instagram feature with the following steps:

1. Go to the Me page.
2. Click the `connect` to Instagram button.
3. Click the `Instagram login` button
4. Click 'Allow in Instagram authorization page to give permission to O-Zone so that O-Zone can access your Instagram post data. Then O-Zone will save your Instagram post data to the O-Zone database and will show them on your O-Zone profile page.

#### 2. To Successfully Connect Your Facebook Account to O-Zone Account

O-Zone uses Facebook Login and Facebook Graph API to fetch your post data from your Facebook account.

-   You can both test this feature in our website hosting online which is [https://ozonewebapp.com/](https://ozonewebapp.com/). Or you can test it locally on your machine with server running on localhost.

-   According to the policy of Facebook Login and Facebook Graph API, before Facebook approves our App Review request, only the Facebook account that is added as Administrators can use Facebook API in our app.

So please give us your Facebook username in slack, and we will add you to Facebook Administrators.

After you are added to Facebook Administrators, we will notify you and you can do test our connecting to Facebook feature.

#### 3. To Successfully Connect Your Twitter Account to O-Zone Account

O-Zone uses Twitter API to fetch your post data from your Twitter account.

-   You must test this feature in our website hosting online which is [https://ozonewebapp.com/](https://ozonewebapp.com/). You cannot test it locally on your machine with the server running on localhost.

-   According to the policy of Twitter API, no App Review is required so we can test this feature on our [website]((https://ozonewebapp.com/) now.

## Overview
*   ### Project's Values
    *   Project value: O-zone's value is to create an efficient social media management platform. Users could create, publish and analyze contents they and others post on various social media accounts. 
*  ### Team Norms
    *   Members should all try their best to work cooperatively for the final workable product. 
    *   Members must join team stand-ups three times a week on Monday, Wednesday, and Saturday at 10 AM EST. (10 PM China time) mandatorily on [Zoom](https://nyu.zoom.us/j/99111537533). The team would clarify each member's tasks for the week on Monday stand-ups and update the Task Board accordingly; Team would also check progress on Wednesday stand-ups and all works assigned on Monday should be expected to be done on Friday.
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
*   ##### Roles of team members:
        *   ###### Product Manager: 
            *   Before the sprint planning phase, PM finishes writing a list of user stories.
            *   In the sprint planning phase, PM explains every user story to developers.
            *   In the sprint planning phase, PM collaborates with the developers to determine the Acceptance Criteria of User Stories which represents the minimum requirements for User Stories to be considered done. 
            *   In the sprint planning phase, PM collaborates with the developers to do the Estimation of Effort of each User Story to determine how much work the User Story will be. Planning Poker is used to determine the workload of the User Story.
            *   In the sprint planning phase, based on the Estimation of Effort of each User Story, PM collaborates with the developers to divide each user story to tasks. Each task should be done by one developer in 2 days, before the next Scrum Meeting/Daily Standup. Each task is assigned to one developer. 
            *   In the stakeholder demo phase, the PM collects stakeholder's suggestions, and adds new user stories to the list.
        *   ###### Scrum Master:
            *   Ensure the team is following the scrum framework in the agile way.
            *   Remind members of what to do in the scrum meeting.
            *   Remind members of their role and their tasks.
        *   ###### Developers: 
            *   In the sprint planning phase, after PM explains the user story, developers collaborate with the PM to determine the Acceptance Criteria of User Stories which represents the minimum requirements for User Stories to be considered done. 
            *   In the sprint planning phase, developers collaborate with the PM to do the Estimation of Effort of each User Story to determine how much work the User Story will be. Planning Poker is used to determine the workload of the User Story.
            *   In the sprint planning phase, based on the Estimation of Effort of each User Story, developers collaborate with the PM to divide each user story to tasks. Each task should be done by one developer in 2 days, before every Scrum Meeting/Daily Standup.
            *   In the sprint planning phase, developers determine some spikes for the sprint, such as setting up the environment for the project to run and what to learn in order to finish the task.
            *   Developers complete the task or the spike assigned to them in 2 days before the next scrum meeting.