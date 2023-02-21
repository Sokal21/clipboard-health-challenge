# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1#: Create new db model to store agents customs IDs

With the objective of letting each facilities asign their own custom identifier to each of our Agents we need to create a new DB model (that corresponds to a new table) that bounds facilities, agents and custom IDs. With this table we will be able to find each agent custom ID by facility.

steps:
- Create a new model following our ORM schemas
    - The schema should include 2 foreign keys: the facilities ID and the Agent ID
    - The schema should have a string column for the custom ID
    - Take into account that the we should have two uniqueness constraints. A facility should not have a custom ID twice, and an agent cannot have two diferent custom IDs. You have a uniqueness index over facility ID and Custom ID and another over the 3 columns.
    - I recommend to called the model AgentsCustomIdByFacilities, but feel free to propose alternatives.
- Generate the related migration using our ORM cli

stimated effort (fibnaacci scale): 8

### Ticket 2#: Refactor getShiftsByFacility to include customs IDs

Now that we have a model that stores the customs IDs for each agent we need to make that data available. Our current methods retrieves metadata abount the agent that was assigned to each shift, we need to append a new field called `custom_facility_id` with that information.

steps:
- In the query that build the shifts for each facilities join that result with the table that the model `AgentsCustomIdByFacilities` create using the facility id and the agent id of the shift.
- Make the unit test for this cases:
    - The agent does not have a custom id asigned for that facility so `custom_facility_id` should be null.
    - The agent does have a custom id signed for that facility so `custom_facility_id` should be the equal to that id.

stimated effort (fibnaacci scale): 8

### Ticket 3#: Refactor generateReport to use customs IDs

The information retrieve by `getShiftsByFacility` now includes the custom IDs for each agent. The objetive is to add that information to the PDF report. The product team was not especific about how to display this new information, my proposal is to add this new information and not replace the old one. Just add below the "ID" entry a "FACILITY ID" with that information.

steps:
- Add below the "ID" field a "FACILITY ID" with the content of `custom_facility_id` field in the agent metadata.
- Generate a PDF report and give it to the owner of this ticket so it can discuss the result with the product team.
- After aproval of the change regenerate snapshots test for the method results.

stimated effort (fibnaacci scale): 2

### Ticket 4#: Add an endpoint to the facilites controller for customs IDs

We need to provide to our clients the ability to fill the customs ID of the agents that worked on shifts in their facilities. We need to create a new endpoint for this function.

steps:
- Add to the facilities service a new method called `asignedCustomIdToAgent`, this function should create an entry in the `AgentsCustomIdByFacilities` model or update it if the agent in that facilty already has a custom id. Throw a custom error if the id is already asigned to an agent.
    - Make the unit test for this cases:
        - The agent already has a custom id asigned
        - The agent does not have a custom id asigned
        - That id is already used
        - Something fails when trying to perform the operation in the DB
- Create a new endpoint in the facilities controller with the path `/facility/:facility_id/agent/:agent_id/custom_id` and the method `POST`. The it should called the service method `asignedCustomIdToAgent` with the URL params and the body of the request. If the methods throws and error informing that the custom id is already used this endpoitn should return a statys code `409` and an error message describing the error.
    - Make the unit test for this cases:
        - The agent already has a custom id asigned
        - The custom id was asigned correctly
        - The methods returned and unhandled error
- Create a validation rule for the previous endpoint taht verify that the body is a JSON object with an string field called `custom_id`.

stimated effort (fibnaacci scale): 13
